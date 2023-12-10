import { Chip, ChipProps } from '@mui/material';

export function WorkerChip(props: ChipProps) {
  return (
    <Chip
      {...props}
      sx={{
        minWidth: '180px',
        justifyContent: 'space-between',
        ...props.sx,
      }}
    ></Chip>
  );
}
