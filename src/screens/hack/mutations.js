import { useQueryClient, useMutation } from "react-query";
import * as TasksApi from "../../api/tasks.api";

const QUERY_KEY = 'tasks';

// -- Mutations
export const useDeleteTask = () => {
  const client = useQueryClient();
  const { mutateAsync: mutateDeleteTask } = useMutation((id) => TasksApi.deleteTask(id), {
    // Optimistic Update Cache
    onMutate: (id) => {
      client.cancelQueries(QUERY_KEY);
      const cache = client.getQueryData(QUERY_KEY);
      const newCache = cache.filter(task => task.id !== id);

      console.log('[optimistic update] after delete => ', newCache);
      client.setQueryData(QUERY_KEY, newCache);

      // rollback fn
      return () => {
        client.setQueryData(cache);
      }
    },
    onError: (err, variables, rollback) => {
      console.log('Error deleting task => ', err);
      rollback();
    },
    onSettled: async () => {
      await client.invalidateQueries(QUERY_KEY); 
    }
  });

  return mutateDeleteTask;
};

export const useReorderTasks = () => {
  const client = useQueryClient();
  const { mutateAsync: mutateReorderTasks } = useMutation((ids) => TasksApi.reorderTasks(ids), {
    onMutate: (ids) => {
      client.cancelQueries(QUERY_KEY);
      const cache = client.getQueryData(QUERY_KEY);
      const newCache = ids.map((id, pos) => ({
        ...cache.find((task) => task.id === id ),
        zorder: pos 
      }));

      console.log('[optimistic update] after reorder => ', newCache);
      client.setQueryData(QUERY_KEY, newCache);

      // rollback fn
      return () => {
        client.setQueryData(QUERY_KEY, cache);
      }
    },
    onError: (err, variables, rollback) => {
      console.log('Error deleting task => ', err);
      rollback();
    },
    onSettled: async () => {
      await client.invalidateQueries(QUERY_KEY); 
    }
  });

  return mutateReorderTasks;
};

export const useAddTask = () => {
  const client = useQueryClient();
  const { mutateAsync: mutateAddTask } = useMutation((taskName) => TasksApi.addTask(taskName), {
    onMutate: (taskName) => {
      client.cancelQueries(QUERY_KEY);
      const cache = client.getQueryData(QUERY_KEY);
      const newCache = [
        ...cache,
        {
          id: `temp-id-${new Date().getTime()}`,
          name: taskName,
        }
      ];
      console.log('[optimistic update] after adding task => ', newCache);
      client.setQueryData(QUERY_KEY, newCache);

      // rollback fn
      return () => {
        client.setQueryData(QUERY_KEY, cache);
      }
    },
    onError: (err, variables, rollback) => {
      console.log('Error adding task => ', err);
      rollback();
    },
    onSettled: async () => {
      await client.invalidateQueries(QUERY_KEY); 
    }
  });

  return mutateAddTask;
}