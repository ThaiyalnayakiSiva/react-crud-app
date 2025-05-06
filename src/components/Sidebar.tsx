import React from 'react';
import { Drawer, Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box width={250} role="presentation" onClick={onClose}>
        <List>
          <ListItem component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/settings">
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
