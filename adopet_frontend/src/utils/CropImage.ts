interface PixelCrop {
  x: number;
  y: number;
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

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop
): Promise<string | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  // Coloca o tamanho do canvas conforme os limites de borda
  canvas.width = image.width;
  canvas.height = image.height;

  // Seta a imagem no centro da tela
  ctx.scale(1, 1);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  // Desenha a imagem
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    return null;
  }

  // Configura o tamanho da imagem cortada
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Desenha a imagem cortada no nov canvas
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

  // Retorna a imagem como um Blob
  return new Promise<string | null>((resolve, reject) => {
    croppedCanvas.toBlob((file) => {
      if (file) {
        resolve(URL.createObjectURL(file));
      } else {
        reject(new Error("Não foi possível criar o blob"));
      }
    }, "image/jpeg");
  });
}
