import "../styles.css";

export const metadata = {
  title: "Hawinet Coffee Export — Ethiopia, by origin",
  description: "Traceable single-origin Ethiopian coffee, sourced with care and prepared for global roasters and importers.",
  icons: { icon: "/assets/hawinet-logo.png" },
};

export const viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
