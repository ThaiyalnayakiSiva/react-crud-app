import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { getUserSchema, updateUserSchema } from '../services/userApi';

interface FieldSchema {
    name: string;
    label: string;
    type: string;
    required: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
}

const AdminSettingForm: React.FC = () => {
    const [fields, setFields] = useState<FieldSchema[]>([]); // Store current fields in schema
    const [newField, setNewField] = useState<FieldSchema>({
        name: '',
        label: '',
        type: 'text',
        required: false,
    });

    // Fetch existing form schema from the backend (JSON Server)

    const fetchUserSchema = async () => {
        const res = await getUserSchema();
        setFields(res.data);
    };

    useEffect(() => {
        fetchUserSchema();
    }, []);

    // Handle adding a new field
    const handleAddField = async () => {
        setFields([...fields, newField]); // Add new field to the schema
        // Save updated schema to backend (JSON Server)
        // await updateUserSchema([...fields, newField]); // Update the schema in the backend
       
        await updateUserSchema(newField); 
        // Reset form for new field
        setNewField({ name: '', label: '', type: 'text', required: false });
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewField({ ...newField, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const name = e.target.name as string;
        setNewField({ ...newField, [name]: e.target.value });
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Settings Page - Manage Form Schema</h2>

            <Stack spacing={2}>
                <TextField
                    label="Field Name"
                    name="name"
                    value={newField.name}
                    onChange={handleInputChange}
                    fullWidth
                />

                <TextField
                    label="Field Label"
                    name="label"
                    value={newField.label}
                    onChange={handleInputChange}
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel>Field Type</InputLabel>
                    <Select
                        name="type"
                        value={newField.type}
                        onChange={handleSelectChange}
                        label="Field Type"
                    >
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="tel">Phone Number</MenuItem>
                    </Select>
                </FormControl>

                <div>
                    <label>
                        Required:
                        <input
                            type="checkbox"
                            checked={newField.required}
                            onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                        />
                    </label>
                </div>

                <Button variant="contained" onClick={handleAddField}>
                    Add Field
                </Button>
            </Stack>

            <div style={{ marginTop: '2rem' }}>
                <h3>Current Form Fields</h3>
                <ul>
                    {fields.map((field, index) => (
                        <li key={index}>
                            {field.label} ({field.type}) {field.required && '(Required)'}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminSettingForm;
