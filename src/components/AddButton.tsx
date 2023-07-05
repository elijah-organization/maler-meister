import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button } from '@mui/material';

interface Props {
  onAdd: () => void;
}

export function AddButton({ onAdd }: Props) {
  return (
    <Button size="large" variant="outlined" disableElevation onClick={onAdd}>
      <AddOutlinedIcon />
    </Button>
  );
}
