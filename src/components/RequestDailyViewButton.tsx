import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { Button } from '@mui/material';

interface Props {
  value: any;
  onClick(): void;
}

export function RequestDailyViewButton({ value, onClick }: Props) {
  return (
    <Button color="info" startIcon={<OpenInNewOutlinedIcon />} onClick={onClick}>
      {new Intl.DateTimeFormat('de-DE', {
        month: '2-digit',
        weekday: 'short',
        day: '2-digit',
        year: '2-digit',
      }).format(new Date(value))}
    </Button>
  );
}
