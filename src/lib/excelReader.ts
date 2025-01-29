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
export const readExcelAndTransform = (file: File): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      


      const products: Product[] = jsonData.map((row, index) => ({
        id: index + 1,
        title: row["Garment Name/ Code"],
        srcUrl: row["Variant 1"],
        gallery: [
          row["Variant 2"],
          row["Variant 3"], 
          row["Variant 4"]
        ].filter(Boolean),
        price: parseFloat(row["Price"]),
        discount: {
          amount: 0,
          percentage: 0
        },
        category: row["Garment"],
        orientation: row["Orientation"],
        rating: 0
      }));

      // New code to write products to allProducts.json
      const fs = require('fs');
      fs.writeFileSync('src/database/allProducts.json', JSON.stringify(products, null, 2));

      resolve(products);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};