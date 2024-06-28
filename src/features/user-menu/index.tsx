import { Avatar } from '@mui/material';

import React from 'react';

import { useCurrentUser } from '../../hooks/useCurrentUser';

export default function UserMenu() {
  const user = useCurrentUser();
  return <Avatar sx={{ width: 24, height: 24 }}></Avatar>;
}
