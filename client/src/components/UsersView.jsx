import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const UsersView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data from API
    fetch('/api/user/getUsers')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <>
    {users.length &&
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Profile Picture</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user._id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <img src={user.profilePicture} alt={user.username} className='h-[50px] w-[50px] rounded-full object-cover' />
              </TableCell>
              <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(user.updatedAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
}
    </>
  );
};

export default UsersView;
