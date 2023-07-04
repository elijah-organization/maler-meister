import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppState } from '../../store';

interface Props {
  title: string;
  to: string;
  requiredRoles: UserRole[];
}
export default function Tile({ title, to, requiredRoles, children }: React.PropsWithChildren<Props>) {
  const currentRole = useSelector<AppState, UserRole | undefined>((s) => s.login.user?.userRole);

  const hasRight = currentRole && requiredRoles.includes(currentRole);

  if (!hasRight) {
    return null;
  }
  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <Card elevation={3}>
        <CardHeader
          title={
            <Typography align="center" variant="h6">
              {title}
            </Typography>
          }
        />
        <CardContent>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={to}>
            <Box display={'flex'} flexDirection="column" alignItems={'center'} justifyContent="center">
              {children}
            </Box>
          </Link>
        </CardContent>
        <Card
      </Card>
    </Grid>
  );
}
