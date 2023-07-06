import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button } from '@mui/material';

interface Props {
  onAdd: () => void;
}

export function AddButton({ onAdd }: Props) {
  return (
    <Button color="primary" variant="contained" disableElevation onClick={onAdd}>
      <AddOutlinedIcon />
    </Button>
  );
}
