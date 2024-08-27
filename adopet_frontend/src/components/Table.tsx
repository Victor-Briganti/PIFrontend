import * as MUI from "@mui/material";
import * as React from "react";
import AxiosDonor from "../api/AxiosDonor";

interface Column {
  id: "animal" | "nome" | "email" | "resposta";
  label: string;
  minWidth?: number;
  align?: string;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "animal", label: "Animal", minWidth: 170 },
  { id: "nome", label: "Nome", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "resposta",
    label: "Resposta",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  id: number;
  animal: string;
  nome: string;
  email: string;
  resposta: React.ReactNode;
}

function createData(
  id: number,
  animal: string,
  nome: string,
  email: string,
  handleReload: (event: unknown) => void,
  handleAccept: (adoptionId: number) => void,
  handleReject: (adoptionId: number) => void
): Data {
  const resposta = (
    <>
      <MUI.Button
        variant="contained"
        onClick={() => {
          handleAccept(id);
          handleReload(null);
        }}
        sx={{
          backgroundColor: "green",
          color: "#fff",
          mr: 1,
        }}
      >
        Aceitar
      </MUI.Button>
      <MUI.Button
        variant="contained"
        onClick={() => {
          handleReject(id);
          handleReload(null);
        }}
        sx={{ backgroundColor: "red", color: "#fff" }}
      >
        Recusar
      </MUI.Button>
    </>
  );
  return { id, animal, nome, email, resposta };
}

export default function TableRequisitions() {
  const rowsPerPage = 5;
  const axiosDonor = React.useMemo(() => new AxiosDonor(), []);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [pageTable, setPageTable] = React.useState(0);
  const [rows, setRows] = React.useState<Data[] | null>(null);
  const [counts, setCounts] = React.useState(0);
  const [reload, setReload] = React.useState(false);

  const handleReload = (event: unknown) => {
    setPage(page);
    setReload(!reload);
  };

  const handleAcceptRequest = (adoptionId: number) => {
    axiosDonor.acceptRequest(adoptionId);
  };

  const handleRejectRequest = (adoptionId: number) => {
    axiosDonor.rejectRequest(adoptionId);
  };

  React.useEffect(() => {
    setLoading(true);
    axiosDonor.getRequestDetailList(page).then((response) => {
      const newRows = response.results.map((adoption) => {
        return createData(
          adoption.id,
          adoption.animal.name,
          adoption.user.firstname + " " + adoption.user.lastname,
          adoption.user.email,
          handleReload,
          handleAcceptRequest,
          handleRejectRequest
        );
      });
      setCounts(response.count);
      setRows(newRows);
    });
    setLoading(false);
  }, [page, reload]);

  const handleChangePage = (event: unknown, newPage: number) => {
    if (newPage > pageTable) {
      const pageChange = page + 1;
      setPage(pageChange);
    } else {
      const pageChange = page - 1;
      setPage(pageChange);
    }
    setPageTable(newPage);
  };

  if (loading === true) {
    return <h1>Carregando</h1>;
  }

  return (
    <MUI.Paper sx={{ width: "100%", overflow: "hidden" }}>
      <MUI.TableContainer sx={{ maxHeight: 440 }}>
        <MUI.Table stickyHeader aria-label="sticky table">
          <MUI.TableHead>
            <MUI.TableRow>
              {columns.map((column) => (
                <MUI.TableCell
                  key={column.id}
                  align={"center"}
                  style={{ minWidth: column.minWidth }}
                  sx={{ backgroundColor: "#D1C4E9" }}
                >
                  {column.label}
                </MUI.TableCell>
              ))}
            </MUI.TableRow>
          </MUI.TableHead>

          <MUI.TableBody>
            {rows !== null &&
              rows.map((row) => {
                return (
                  <MUI.TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "grey.100" },
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <MUI.TableCell
                          key={column.id}
                          align={column.align ?? "center"}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </MUI.TableCell>
                      );
                    })}
                  </MUI.TableRow>
                );
              })}
          </MUI.TableBody>
        </MUI.Table>
      </MUI.TableContainer>

      <MUI.TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={counts}
        rowsPerPage={rowsPerPage}
        page={pageTable}
        onPageChange={handleChangePage}
      />
    </MUI.Paper>
  );
}
