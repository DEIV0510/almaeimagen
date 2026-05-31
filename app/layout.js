import "./globals.css";
import { Cormorant_Garamond, Montserrat, Sacramento } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const sacramento = Sacramento({
  subsets: ["latin"],
  variable: "--font-sacramento",
  display: "swap",
  weight: ["400"],
});

export const metadata = {
  title: "Alma e Imagen · The Academy — by Leidy Sepúlveda",
  description:
    "Una experiencia de formación emocional, espiritual y de imagen personal para mujeres que desean sanar, reconciliarse con su historia y proyectar su mejor versión.",
  keywords: [
    "sanación emocional",
    "amor propio",
    "imagen personal",
    "transformación femenina",
    "Leidy Sepúlveda",
    "academia",
  ],
};

export const viewport = {
  themeColor: "#ED2A8C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${montserrat.variable} ${sacramento.variable}`}
    >
      <body className="font-sans">
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
