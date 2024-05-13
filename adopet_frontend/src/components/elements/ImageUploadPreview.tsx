import * as React from "react";
import * as MUI from "@mui/material";
import HighlightOffRounded from "@mui/icons-material/HighlightOffRounded";

interface ImageUploadPreviewProps {
  imagePreviews: string[];
  handleRemoveImage: (index: number) => void;
}

export default function ImageUploadPreview({
  imagePreviews,
  handleRemoveImage,
}: ImageUploadPreviewProps) {
  return (
    <React.Fragment>
      {imagePreviews.length > 0 && (
        <MUI.Grid container justifyContent="center" style={{ marginTop: 16 }}>
          {imagePreviews.map((preview, index) => (
            <MUI.Grid item xs={12} sm={6} md={4} key={index}>
              <MUI.Box sx={{ position: "relative" }}>
                <MUI.IconButton
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onClick={() => handleRemoveImage(index)}
                >
                  <HighlightOffRounded />
                </MUI.IconButton>
                <MUI.Box
                  component="img"
                  src={preview}
                  alt={`Image Preview ${index}`}
                  sx={{ width: "50%", height: "auto", maxHeight: 200 }}
                />
              </MUI.Box>
            </MUI.Grid>
          ))}
        </MUI.Grid>
      )}
    </React.Fragment>
  );
}
