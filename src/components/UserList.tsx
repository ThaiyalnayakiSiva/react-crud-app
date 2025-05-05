import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  TableContainer,
  useMediaQuery,
  Typography,
  Box,Card, CardContent, CardActions,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { User } from '../types/usertypes';
import { userFormSchema } from '../config/userFormSchema';

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<Props> = ({ users, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      {isMobile ? (
        users.map((user) => (
          <Card key={user.id} sx={{ mb: 2, borderRadius: 2 }}>
          <CardContent sx={{ padding: isMobile ? 2 : 3 }}>
            {userFormSchema.map((field) => (
              <Typography
                key={field.name}
                variant={isMobile ? 'body2' : 'body1'}
                sx={{ mb: 1 }}
              >
                <strong>{field.label}:</strong> {user[field.name as keyof User]}
              </Typography>
            ))}
          </CardContent>

          <CardActions sx={{ justifyContent: 'space-between', padding: isMobile ? 1 : 2 }}>
            <Box display="flex" gap={1}>
              <IconButton onClick={() => onEdit(user)} size={isMobile ? 'small' : 'medium'}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => user.id !== undefined && onDelete(user.id)} size={isMobile ? 'small' : 'medium'}>
                <Delete />
              </IconButton>
            </Box>
          </CardActions>
        </Card>
        ))
      ) : (
        <Table stickyHeader>
          <TableHead >
            <TableRow>
              {userFormSchema.map((field) => (
                <TableCell  style={{ color: '#616161' }} key={field.name}>{field.label}</TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                {userFormSchema.map((field) => (
                  <TableCell sx={{ fontWeight: 600 }} key={field.name}>
                    {user[field.name as keyof User]}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => onEdit(user)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => onDelete(user.id!)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default UserList;
