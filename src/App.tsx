import { useEffect, useState } from 'react';
import { User } from './types/usertypes';
import { getUsers, createUser, updateUser, deleteUser } from './services/userApi';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (data: User) => {
    if (editingUser) {
      await updateUser(editingUser.id!, data);
      setEditingUser(null);
    } else {
      await createUser(data);
    }
    fetchUsers();
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>User Management</h1>
      <UserForm onSubmit={handleSubmit} defaultValues={editingUser} />
      <UserList users={users} onEdit={setEditingUser} onDelete={handleDelete} />
    </div>
  );
}

export default App;
