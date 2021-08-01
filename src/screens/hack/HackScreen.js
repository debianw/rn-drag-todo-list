import * as React from "react";
import { Text, SafeAreaView, View, StyleSheet, Button, TextInput, Alert } from "react-native";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import * as TasksApi from "../../api/tasks.api";
import { DraxProvider, DraxList } from "react-native-drax";
import { useDeleteTask, useReorderTasks, useAddTask } from './mutations';

const queryClient = new QueryClient();

// --
const HackScreen = () => {
  const [taskName, setTaskName] = React.useState('');
  const { data: tasks, isLoading } = useQuery("tasks", TasksApi.getTasks);
  const mutateDeleteTask = useDeleteTask();
  const mutateReorderTasks = useReorderTasks();
  const mutateAddTask = useAddTask();
  const [cacheData, setCacheData] = React.useState([]);

  React.useMemo(() => {
    setCacheData(tasks);
  }, [tasks]);

  const onDelete = async (item) => {
    await mutateDeleteTask(item.id);
  };

  const onReorder = async (ids) => {
    await mutateReorderTasks(ids);
  }

  const onAdd = async () => {
    if (!taskName) return Alert.alert("Enter a task name");
    await mutateAddTask(taskName); 
    setTaskName("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading && (
        <View>
          <Text>Loading ...</Text>
        </View>
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TextInput placeholder="Enter task name here ..." onChangeText={setTaskName} value={taskName} />
        <Button title="Add" onPress={() => onAdd()} />
      </View>

      <View style={styles.container}>
        <DraxList
          style={{ flex: 1 }}
          data={cacheData}
          renderItemContent={({ item }) => (
            <View style={[styles.alphaItem]}>
              <Text style={styles.alphaText}>{item.name}</Text>
              <Button title="Delete" onPress={() => onDelete(item)} />
            </View>
          )}
          onItemReorder={({ fromIndex, toIndex }) => {
            console.log("from => ", fromIndex, " to => ", toIndex);
            const newData = cacheData.slice();
            newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
            onReorder(
              newData.map(item => item.id)
            )
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 40,
    backgroundColor: 'orange'
  },
  alphaItem: {
    flexDirection: 'row',
    backgroundColor: "#aaaaff",
    borderRadius: 8,
    margin: 4,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  alphaText: {
    fontSize: 28,
  },
});

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DraxProvider>{children}</DraxProvider>
    </QueryClientProvider>
  );
};

const App = () => {
  return (
    <Providers>
      <HackScreen />
    </Providers>
  );
};

export default App;
