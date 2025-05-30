export type sentimientos = "euforia" | "calma" | "brillo" | "impulso";
export type colores = "rojo" | "azul" | "amarillo" | "naranja";

export const SENTIMIENTOS_COLOR: Record<sentimientos, colores> = {
  euforia: "rojo",
  calma: "azul",
  brillo: "amarillo",
  impulso: "naranja",
};

export const COLOR_SENTIMIENTO: Record<colores, sentimientos> = {
  rojo: "euforia",
  azul: "calma",
  amarillo: "brillo",
  naranja: "impulso",
};
