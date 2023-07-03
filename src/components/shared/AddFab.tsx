import { Box, Fab, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  onClick(): void;
}
export default function AddFab({ onClick }: Props) {
  const theme = useTheme();

  return (
    <Box position={"fixed"} bottom={theme.spacing(3)} right={theme.spacing(3)}>
      <Fab onClick={onClick} size="large" color="primary">
        <AddIcon />
      </Fab>
    </Box>
  );
}
