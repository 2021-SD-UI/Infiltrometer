
import React from "react";
import SinglePagePDFView from "./pdf-viewer"
import MiniDiskManual from './MiniDiskManual.pdf';
import FieldGuide from './FieldGuide.pdf'

export const MiniDiskManualView = () => {
  return (< SinglePagePDFView pdf={MiniDiskManual} />)
}
export const FieldGuideManualView = () => {
  return (<SinglePagePDFView pdf={FieldGuide} />)
}
