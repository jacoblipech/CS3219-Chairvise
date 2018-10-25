import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PDF_CHART_MARGIN_LEFT, PDF_CHART_MARGIN_TOP, PDF_CHART_WIDTH } from "@/common/const";

var doc, pdfName, pdfDescription, marginTop;

export function download(numberOfElements, presentationFormName, presentationDescription, callback) {
  doc = new jsPDF("p", "mm", "a4");
  pdfName = presentationFormName;
  pdfDescription = presentationDescription;
  marginTop = PDF_CHART_MARGIN_TOP;

  // add description first
  html2canvas(document.getElementById("presentation-description")).then(element => {
    var imageData = element.toDataURL("image/png");
    var marginLeft = PDF_CHART_MARGIN_LEFT;
    var descriptionHeight = element.height * PDF_CHART_WIDTH / element.width;
    doc.addImage(imageData, "PNG", marginLeft, 10, PDF_CHART_WIDTH, descriptionHeight, "", "FAST");

    // recursively add charts
    recursiveGetChart(numberOfElements, 0, callback);
  });

}

function recursiveGetChart(total, current, callback) {
  doc.setProperties({ title: pdfName, description: pdfDescription });
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
    doc.addImage(imageData, "PNG", marginLeft, marginTop, PDF_CHART_WIDTH, chartHeight, "", "FAST");
    marginTop += chartHeight + marginTop;

    // if all added, call callback function and return out
    if (current == total - 1) {
      doc.save(pdfName + ".pdf");
      callback();
      return;
    }
    recursiveGetChart(total, current + 1, callback);
  });
}