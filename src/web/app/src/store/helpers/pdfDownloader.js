import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PDF_CHART_MARGIN_LEFT, PDF_CHART_MARGIN_TOP, PDF_CHART_WIDTH } from "@/common/const";

var doc, pdfName, marginTop;

export function download(numberOfElements, documentName, callback) {
  doc = new jsPDF("p", "mm", "a4");
  pdfName = documentName;
  marginTop = PDF_CHART_MARGIN_TOP;
  recursiveGetChart(numberOfElements, 0, callback);
}

function recursiveGetChart(total, current, callback) {
  html2canvas(document.getElementById("presentation-section-" + current)).then(element => {
    // two charts pre page
    // reset top margin every time new page.
    if (current > 0 && current % 2 == 0) {
      doc.addPage();
      marginTop = PDF_CHART_MARGIN_TOP;
    }
    var imageData = element.toDataURL("image/png");
    var marginLeft = PDF_CHART_MARGIN_LEFT;
    var chartHeight = element.height * PDF_CHART_WIDTH / element.width;
    doc.addImage(imageData, "PNG", marginLeft, marginTop, PDF_CHART_WIDTH, chartHeight);
    marginTop += chartHeight + marginTop;
    if (current == total - 1) {
      doc.save(pdfName + ".pdf");
      callback();
      return;
    }
    recursiveGetChart(total, current + 1, callback);
  });
}