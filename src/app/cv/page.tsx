import type { Metadata } from "next";

import CvBuilder from "./CvBuilder";

export const metadata: Metadata = {
  title: "Crear CV",
  description: "CV Harvard ATS con descarga en PDF",
};

export default function CvPage() {
  return <CvBuilder />;
}
