import * as MUI from "@mui/material";
import * as React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  handlePageChange,
}: PaginationProps) {
  return (
    <React.Fragment>
      {totalPages && (
        <MUI.Box display="flex" justifyContent="center" alignItems="center">
          <MUI.Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </MUI.Box>
      )}
    </React.Fragment>
  );
}
