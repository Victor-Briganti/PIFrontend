import * as MUI from "@mui/material";
import * as React from "react";

interface PageNumberProps {
  page: number;
  totalPages: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function PageNumber({
  page,
  totalPages,
  handlePageChange,
}: PageNumberProps) {
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
