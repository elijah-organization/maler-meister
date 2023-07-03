import { Card, CardContent, CardHeader } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDataGrid } from "../../components/aa-shared/app-data-grid/AppDataGrid";
import AppTypo from "../../components/aa-shared/AppTypo";
import CreateConstruction from "./CreateConstruction";
import { useLoadActiveConstructions } from "../../hooks/useLoadActiveConstructions";
import { AppState } from "../../store";

export default function Constructions() {
  useLoadActiveConstructions();

  const activeConstructions = useSelector<AppState, Construction[]>(
    (s) => s.construction.activeConstructions || []
  );

  return (
    <>
      <Card>
        <CardHeader title={<AppTypo>Aktive Baustellen</AppTypo>}></CardHeader>
        <CardContent>
          <AppDataGrid
            onUpdate={(next) => {
              console.log(next); //TODO:
            }}
            disablePagination
            data={activeConstructions}
            columns={[
              {
                field: "id",
                headerName: "ID",
                renderCell({ id }) {
                  return <Link to={`edit/${id}`}>{id}</Link>;
                },
              },
              {
                flex: 1,
                field: "name",
                headerName: "Name",
              },
            ]}
          />
        </CardContent>
      </Card>
      <CreateConstruction />
    </>
  );
}
