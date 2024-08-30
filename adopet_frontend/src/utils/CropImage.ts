interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Flip {
  horizontal: boolean;
  vertical: boolean;
}

interface Size {
  width: number;
  height: number;
}

// Cria um HTMLImageElement a partir da URL.
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

export function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

export function rotateSize(
  width: number,
  height: number,
  rotation: number
): Size {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  rotation: number = 0,
  flip: Flip = { horizontal: false, vertical: false }
): Promise<Blob | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // Calcula o limite da box conforme a imagem rotacionada
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // Coloca o tamanho do canvas conforme o limite da box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // Traduz o canvas para uma localização central para permitir a edição
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // Desenha a imagem rotactionada
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    return null;
  }

  // Configura o tamanho da imagem cortada
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Desenha a imagem cortada no novo canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  console.log("PixelCrop", pixelCrop);

  // Retorna a imagem como um Blob
  return new Promise<Blob | null>((resolve, reject) => {
    croppedCanvas.toBlob((file) => {
      if (file) {
        resolve(file);
      } else {
        reject(new Error("Não foi possível criar o blob"));
      }
    }, "image/jpeg");
  });
}
