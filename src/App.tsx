import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { User } from './types/usertypes';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { getUsers, createUser, updateUser, deleteUser } from './services/userApi';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import AdminSettingForm from './components/AdminSettingForm';
import Sidebar from './components/Sidebar';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Container
} from '@mui/material';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* <Router> */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              User Management
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#052e56', color: '#ffffff' }}
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingUser(null);
                setOpenDialog(true);
              }}
            >
              Add User
            </Button>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        <Container maxWidth="lg" style={{ padding: '2rem', overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
          <Routes>
            <Route
              path="/"
              element={
                <UserList
                  users={users}
                  onEdit={(user) => {
                    setEditingUser(user);
                    setOpenDialog(true);
                  }}
                  onDelete={handleDelete}
                />
              }
            />
            <Route path="/settings" element={<AdminSettingForm />} />
          </Routes>

          {/* User Form Dialog */}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullScreen={fullScreen} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ position: 'relative' }}>
              {editingUser ? 'Edit User' : 'Add New User'}
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setOpenDialog(false)}
                sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <UserForm onSubmit={handleSubmit} defaultValues={editingUser} />
          </Dialog>
        </Container>
      {/* </Router> */}
    </div>
  );
}

export default App;
