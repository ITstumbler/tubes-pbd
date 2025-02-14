import { React, useEffect } from "react";
import { Outlet } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import './Loginpage.css';

export const generatePDF = async (elementToPrintId: string) => {
  const element = document.getElementById(elementToPrintId);
  if (!element) {
    throw new Error(`Element with id ${elementToPrintId} not found`);
  }
  const canvas = await html2canvas(element, { scale: 2 });
  const data = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [129, 70],
  });
  const imgProperties = pdf.getImageProperties(data);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

  pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("print.pdf");
};

function PDFTest() {
    // const location = useLocation();
    //console.log(location);

  useEffect(() => {
    
  });

    return(
        <>
        
        <Outlet />
        </>
    );
}

export default PDFTest;