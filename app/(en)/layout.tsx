import type { ReactNode } from "react";
import "@/lib/fonts";
import { buildMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata = buildMetadata("en");
export { viewport } from "@/lib/metadata";

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <noscript>
          <style>{".preloader{display:none}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
