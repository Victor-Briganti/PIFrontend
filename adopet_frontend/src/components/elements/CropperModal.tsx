import * as React from "react";
import * as MUI from "@mui/material";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop";
import getCroppedImg from "../../utils/CropImage";

interface CropperModalProps {
  open: boolean;
  image: string;
  onClose: () => void;
  onCropCompleteCallback: (preview: string, fileBlob: Blob) => void;
}

export default function CropperModal({
  open,
  image,
  onClose,
  onCropCompleteCallback,
}: CropperModalProps) {
  const [crop, setCrop] = React.useState<Point>({ x: 0, y: 0 });
  const [rotation, setRotation] = React.useState(0);
  const [zoom, setZoom] = React.useState<number>(1);
  const [croppedImage, setCroppedImage] = React.useState<Blob | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(
    null
  );

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);

    // Chama o callback após cortar a imagem
    handleShowCroppedImage(croppedAreaPixels);
  };

  const handleShowCroppedImage = async (croppedAreaPixels: Area) => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          image,
          croppedAreaPixels,
          rotation
        );

        setCroppedImage(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCropAndSave = async () => {
    if (croppedImage) {
      onCropCompleteCallback(URL.createObjectURL(croppedImage), croppedImage);
    }
    onClose();
  };

  return (
    <MUI.Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <MUI.DialogTitle>Crop Image</MUI.DialogTitle>
      <MUI.DialogContent>
        <MUI.Box
          sx={{
            position: "relative",
            width: "100%",
            height: "400px",
          }}
        >
          <Cropper
            image={image}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </MUI.Box>

        <MUI.Box
          sx={{
            marginTop: "20px",
          }}
        >
          <MUI.Typography variant="overline">Zoom</MUI.Typography>
          <MUI.Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </MUI.Box>
      </MUI.DialogContent>
      <MUI.DialogActions>
        <MUI.Button onClick={onClose}>Cancel</MUI.Button>
        <MUI.Button
          onClick={handleCropAndSave}
          variant="outlined"
          color="primary"
        >
          Crop & Save
        </MUI.Button>
      </MUI.DialogActions>
    </MUI.Dialog>
  );
}
