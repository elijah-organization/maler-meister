import AccessTimeIcon from '@mui/icons-material/AccessTimeOutlined';
import ArticleIcon from '@mui/icons-material/ArticleOutlined';
import HandymanIcon from '@mui/icons-material/HandymanOutlined';
import MoreTimeIcon from '@mui/icons-material/MoreTimeOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLongOutlined';
import TuneIcon from '@mui/icons-material/TuneOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFileOutlined';
import { Grid, Typography } from '@mui/material';

import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../store';
import Tile from './aa-shared/Tile';

export default function MainNavigation() {
  const currentUser = useSelector<AppState, User | null>((s) => s.login.user);

  return (
    <>
      <Typography color={'GrayText'} p={3} variant="h4" align="center">{`Hallo ${currentUser?.firstName}!`}</Typography>

      <ViewGrid>
        <Tile requiredRoles={['accountant', 'admin']} to="offers" title="Angebote">
          <ArticleIcon fontSize="large" color="primary" />
        </Tile>
        <Tile requiredRoles={['accountant', 'admin']} to="invoices" title="Rechnungen">
          <ReceiptLongIcon fontSize="large" color="primary" />
        </Tile>

        <Tile requiredRoles={['accountant', 'admin']} to="time" title="Alle Stunden">
          <AccessTimeIcon fontSize="large" color="primary" />
        </Tile>
        <Tile requiredRoles={['worker']} to="time-capture" title="Zeiterfassung">
          <MoreTimeIcon fontSize="large" color="primary" />
        </Tile>

        <Tile requiredRoles={['admin']} to="constructions" title="Baustellen">
          <HandymanIcon fontSize="large" color="primary" />
        </Tile>
        <Tile requiredRoles={['worker', 'admin', 'accountant']} to="upload" title="Upload">
          <UploadFileIcon fontSize="large" color="primary" />
        </Tile>

        <Tile requiredRoles={['admin']} to="options" title="Optionen">
          <TuneIcon fontSize="large" color="primary" />
        </Tile>
      </ViewGrid>
    </>
  );
}

function ViewGrid({ children }: React.PropsWithChildren) {
  return (
    <Grid container spacing={3} p={2}>
      {children}
    </Grid>
  );
}
