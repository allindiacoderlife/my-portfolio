import "@/styles/global.css";
import { poppins } from "@/lib/fonts";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "chirag-saxena portfolio admin",
  description: "portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="lenis">
      <body className={poppins.className}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
