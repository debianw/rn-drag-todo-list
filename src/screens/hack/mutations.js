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
    onError: (err) => {
      console.log('Error deleting task => ', err);
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
    onError: (err) => {
      console.log('Error adding task => ', err);
    },
    onSettled: async () => {
      console.log('on settled add task');
      await client.invalidateQueries(QUERY_KEY); 
    }
  });

  return mutateAddTask;
}