import * as React from "react";
import * as MUI from "@mui/material";

interface DragBoxProps {
  children: React.ReactNode;
  dragOver: boolean;
  handleDragOver: React.DragEventHandler<HTMLDivElement>;
  handleDragLeave: React.DragEventHandler<HTMLDivElement>;
  handleDrop: React.DragEventHandler<HTMLDivElement>;
}

export default function DragBox({
  children,
  dragOver,
  handleDragOver,
  handleDragLeave,
  handleDrop,
}: DragBoxProps) {
  return (
    <React.Fragment>
      <MUI.Paper
        variant="outlined"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragOver ? "2px dashed #000" : "2px dashed #ccc",
          padding: 20,
          textAlign: "center",
          cursor: "pointer",
          background: dragOver ? "#f0f0f0" : "#fff",
          position: "relative",
        }}
      >
        {children}
      </MUI.Paper>
    </React.Fragment>
  );
}
