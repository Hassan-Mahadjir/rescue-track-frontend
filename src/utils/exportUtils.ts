import * as XLSX from "xlsx";
import { Row } from "@tanstack/react-table";

/**
 * Exports selected rows to a file (CSV or XLSX) using SheetJS.
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

  // Create a worksheet from the data
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate file and trigger download
  XLSX.writeFile(workbook, fileName, { bookType: fileType });
};
