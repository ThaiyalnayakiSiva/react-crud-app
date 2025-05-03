import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { userFormSchema } from '../config/userFormSchema';
import { User } from '../types/usertypes';
import { TextField, Button, Paper, Typography, Stack } from '@mui/material';

interface Props {
  onSubmit: (data: User) => void;
  defaultValues?: User | null;
}

const UserForm: React.FC<Props> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({ mode: 'onBlur' });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', my: 4 }}>
      <Typography variant="h6" gutterBottom>
        {defaultValues ? 'Edit User' : 'Add New User'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
        {userFormSchema.map((field) => (
  <TextField
    key={field.name}
    label={field.label}
    type={field.type}
    fullWidth
    error={!!errors[field.name as keyof User]}
    helperText={
      errors[field.name as keyof User]?.message ||
      (errors[field.name as keyof User]?.type === 'required'
        ? `${field.label} is required`
        : '')
    }
    {...register(field.name as keyof User, {
      required: field.required,
      pattern: field.pattern || undefined, // Directly assign pattern or undefined
    })}
  />
))}

          <Button type="submit" variant="contained" color="primary">
            {defaultValues ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default UserForm;