import { Poppins, DM_Sans, Archivo, Tajawal } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const DMSANS = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-DMSANS",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-Archivo",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const tajwal = Tajawal({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-Tijwall",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});
