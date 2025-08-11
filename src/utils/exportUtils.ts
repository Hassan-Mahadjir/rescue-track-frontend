import ExcelJS from "exceljs";
import { Row } from "@tanstack/react-table";

/**
 * Exports selected rows to a file (CSV or XLSX) using ExcelJS.
 * @param rows - The rows selected in the table.
 * @param fileName - The name of the file to be downloaded (default: "selected_rows.csv").
 * @param fileType - The type of file to export (default: "csv").
 */
export const exportSelectedRows = <T>(
  rows: Row<T>[], // Use generic type T
  fileName: string = "selected_rows.csv",
  fileType: "csv" | "xlsx" = "csv"
) => {
  if (rows.length === 0) {
    alert("No rows selected!");
    return;
  }

  // Extract the data from the selected rows
  const data = rows.map((row) => row.original);

  if (fileType === "csv") {
    // For CSV, create a simple CSV string
    const headers = Object.keys(data[0] || {});
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = (row as Record<string, unknown>)[header];
            // Escape quotes and wrap in quotes if contains comma or newline
            const stringValue = String(value || "");
            if (
              stringValue.includes(",") ||
              stringValue.includes("\n") ||
              stringValue.includes('"')
            ) {
              return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
          })
          .join(",")
      ),
    ].join("\n");

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // For XLSX, use ExcelJS
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    if (data.length > 0) {
      // Add headers
      const headers = Object.keys(data[0] as object);
      worksheet.addRow(headers);

      // Add data rows
      data.forEach((row) => {
        const rowData = headers.map(
          (header) => (row as Record<string, unknown>)[header]
        );
        worksheet.addRow(rowData);
      });
    }

    // Generate and download the file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
};
