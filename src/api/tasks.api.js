const api = 'http://localhost:3004';

export const getTasks = async () => {
  const response = await fetch(`${api}/tasks`);
  const data = await response.json();

  return data;
};

export const deleteTask = async (id) => {
  const response = await fetch(`${api}/task/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();

  return data;
};

export const reorderTasks = async (ids) => {
  const body = { ids };
  const response = await fetch(`${api}/tasks/reorder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  return data;
}

export const addTask = async (name) => {
  const response = await fetch(`${api}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name }),
  });
  const data = await response.json();

  return data; 
};