import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    
    // A4 size: 210 x 297 mm
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // If height is larger than A4, we might need multiple pages or just scale to fit. 
    // Scaling to fit is easier for now
    let finalHeight = pdfHeight;
    const maxA4Height = 297;
    
    if (finalHeight > maxA4Height) {
      finalHeight = maxA4Height;
      const scaledWidth = (canvas.width * finalHeight) / canvas.height;
      pdf.addImage(imgData, 'PNG', (pdfWidth - scaledWidth) / 2, 0, scaledWidth, finalHeight);
    } else {
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, finalHeight);
    }

    pdf.save(`${filename.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  } catch (error) {
    console.error('Failed to export PDF', error);
  }
};
