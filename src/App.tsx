import { useEffect, useState } from 'react';
import { User } from './types/usertypes';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { getUsers, createUser, updateUser, deleteUser } from './services/userApi';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { Button, Container, Dialog, DialogTitle, IconButton, useMediaQuery, useTheme, AppBar, Toolbar, Typography, } from '@mui/material';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    setOpenDialog(false);
    fetchUsers();
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleOpen = () => {
    setEditingUser(null);
    setOpenDialog(true);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            User Management
          </Typography>

          <Button variant="contained" sx={{ backgroundColor: '#052e56', color: '#ffffff', }} color="inherit" startIcon={<AddIcon />} onClick={handleOpen} >
            Add User
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ padding: '2rem', overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
        <UserList users={users} onEdit={(user) => { setEditingUser(user); setOpenDialog(true); }} onDelete={handleDelete} />
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullScreen={fullScreen} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ position: 'relative' }}>
            {editingUser ? 'Edit User' : 'Add New User'}
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setOpenDialog(false)}
              sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <UserForm onSubmit={handleSubmit} defaultValues={editingUser} />
        </Dialog>
      </Container>
    </div>
  );
}

export default App;