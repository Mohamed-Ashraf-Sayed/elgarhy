import type { ReactNode } from "react";
import "@/lib/fonts";
import { buildMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata = buildMetadata("ar");
export { viewport } from "@/lib/metadata";

export default function ArabicLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <noscript>
          <style>{".preloader{display:none}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
