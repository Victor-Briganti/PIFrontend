import * as React from "react";
import * as MUI from "@mui/material";

interface CircularLoadingProps {
  loading: boolean;
}

export default function CircularLoading({ loading }: CircularLoadingProps) {
  return (
    <React.Fragment>
      {loading && (
        <MUI.CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </React.Fragment>
  );
}
