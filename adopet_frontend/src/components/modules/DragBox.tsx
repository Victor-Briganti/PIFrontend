import * as React from "react";
import * as MUI from "@mui/material";
import UploadImageCard from "../elements/form_control/UploadImageCard";

interface DragBoxProps {
  dragOver: boolean;
  handleDragOver: React.DragEventHandler<HTMLDivElement>;
  handleDragLeave: React.DragEventHandler<HTMLDivElement>;
  handleDrop: React.DragEventHandler<HTMLDivElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function DragBox({
  dragOver,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleChange,
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
        <UploadImageCard handleChange={handleChange} />
      </MUI.Paper>
    </React.Fragment>
  );
}
