import CheckIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  SxProps,
  Theme,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';

import React, { PropsWithChildren } from 'react';

import { useIsSmall } from '../hooks/useIsSmall';
import ApplicationToolbar from './ApplicationToolbar';

interface Props {
  open: boolean;
  onClose(): void;
  title?: string;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
  onDelete?: () => void;
}

export function AppDialog(props: Readonly<PropsWithChildren<Props>>) {
  const isSmall = useIsSmall();
  const onDelete = props.onDelete
    ? () => {
        if (confirm('Möchtest du es wirklich löschen?')) {
          props.onDelete?.();
          props.onClose();
        }
      }
    : undefined;

  return isSmall ? (
    <MobileDialog {...props} onDelete={onDelete} />
  ) : (
    <DesktopDialog {...props} onDelete={onDelete} />
  );
}

const dialogContentSX: SxProps<Theme> = { paddingTop: (theme) => `${theme.spacing(2)}!important` };

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MobileDialog({
  children,
  open,
  title,
  confirmDisabled,
  onClose,
  onConfirm,
  onDelete,
}: PropsWithChildren<Props>) {
  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <ApplicationToolbar position="relative">
        <IconButton edge="start" onClick={onClose} aria-label="close">
          <CloseOutlinedIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          {title}
        </Typography>
        {onDelete && (
          <IconButton color="error" onClick={onDelete}>
            <DeleteForeverOutlinedIcon />
          </IconButton>
        )}
        {onConfirm && (
          <IconButton disabled={confirmDisabled} onClick={onConfirm}>
            <CheckIcon />
          </IconButton>
        )}
      </ApplicationToolbar>
      <DialogContent sx={dialogContentSX}>{children}</DialogContent>
    </Dialog>
  );
}

function DesktopDialog({
  children,
  open,
  title,
  confirmDisabled,
  onClose,
  onConfirm,
  onDelete,
}: PropsWithChildren<Props>) {
  return (
    <Dialog maxWidth={'md'} fullWidth={true} open={open} onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" flexGrow={1}>
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={dialogContentSX}>{children}</DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        {onDelete && (
          <Button color="error" onClick={onDelete}>
            Löschen
          </Button>
        )}
        {onConfirm && (
          <Button
            disabled={confirmDisabled}
            variant="contained"
            disableElevation
            onClick={onConfirm}
          >
            OK
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
