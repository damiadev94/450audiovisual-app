import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bunker 450",
  description: "Plataforma educativa de 450 Audiovisual",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
