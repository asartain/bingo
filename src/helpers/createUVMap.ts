import { CanvasTexture } from "three";

export const createUVMapFromText = (text: string, size: number = 1024) => {
  if (text.length > 2) return;

  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not found");
  ctx.canvas.width = size;
  ctx.canvas.height = size;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, size, size);
  const fontSize = size / 4;
  ctx.font = `bold ${fontSize}px  Sans-serif`;
  ctx.fillStyle = "black";
  const textWidth = text.length === 2 ? fontSize : fontSize / 2;
  ctx.fillText(text, 0, size / 2 + fontSize / 2, textWidth);
  ctx.fillText(text, size / 2, size / 2 + fontSize / 2, textWidth);

  const texture = new CanvasTexture(canvas);
  canvas.remove();
  return texture;
};
