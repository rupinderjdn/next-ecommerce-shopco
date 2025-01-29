// src/lib/excelReader.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";
import { Product } from "../types/product.types";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const compareArrays = (a: any[], b: any[]) => {
  return a.toString() === b.toString();
};

// ... existing code ...

// Function to read Excel file and transform data to Product type
export const readExcelAndTransform = (filePath: string): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    fs.readFile(filePath, (err: any, data: any) => {
      if (err) {
        return reject(err);
      }
      const workbook = XLSX.read(data, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      const products: Product[] = jsonData.map((row, index) => {
        // Get cell references for all variants
        const variantColumns = ["Variant 1", "Variant 2", "Variant 3", "Variant 4"];
        const variantUrls = variantColumns.map(variantCol => {
          const cellRef = XLSX.utils.encode_cell({ 
            r: index + 1, // Add 1 to skip header row
            c: Object.keys(row).indexOf(variantCol) // Get column index
          });
          
          // Get the hyperlink from the cell if it exists
          const cell = worksheet[cellRef];
          return cell?.l?.Target || row[variantCol];
        });

        return {
          id: index + 1,
          title: row["Garment Name/ Code"],
          srcUrl: variantUrls[0], // Variant 1
          gallery: variantUrls.slice(1).filter(Boolean), // Variants 2-4
          price: parseFloat(row["Price"]),
          discount: {
            amount: 0,
            percentage: 0
          },
          category: row["Garment"],
          orientation: row["Orientation"],
          rating: 0
        };
      });

      // New code to write products to allProducts.json
      fs.writeFileSync('src/database/allProducts.json', JSON.stringify(products, null, 2));

      resolve(products);
    });
  });
};