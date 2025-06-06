import type { Area } from 'react-easy-crop';

export const getCroppedImg = (imageSrc: string, croppedAreaPixels: Area): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return reject("No se pudo obtener contexto 2D");

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob((blob) => {
        if (!blob) return reject("Error al generar el blob");
        resolve(blob);
      }, "image/png");
    };
    image.onerror = () => reject("Error al cargar la imagen");
  });
};
