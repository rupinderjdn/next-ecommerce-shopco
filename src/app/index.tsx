import { Product } from "@/types/product.types";
import relatedProductDataJson from "@/database/relatedproductData.json";
import reviewsDataJson from "@/database/reviews.json";
import allProductsDataJson from "@/database/allProducts.json";
import { readExcelAndTransform } from "@/lib/excelReader";
import { Review } from "@/types/review.types";


// Transform URLs to correct format
const  transformUrl = (url: string) => {
    if (!url) return url;
    const fileIdMatch = url.match(/id=([^&]+)|\/d\/([^/?&]+)/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1] || fileIdMatch[2];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return url;
  };
  
  const transformedAllProducts = allProductsDataJson.map(product => ({
    ...product,
    srcUrl: transformUrl(product.srcUrl),
    gallery: product.gallery?.map(url => transformUrl(url))
  }));
  

export const relatedProductData: Product[] = relatedProductDataJson;
export const reviewsData: Review[] = reviewsDataJson;
export const allProductsData: Product[] = transformedAllProducts;
export const newArrivalsData: Product[] = allProductsData.filter(
    (product) => product.badge?.includes("newArrivals")
  );
export const topSellingData: Product[] = allProductsData.filter(
    (product) => product.badge?.includes("topSelling")
  );
export const onSaleData: Product[] = allProductsData.filter(
    (product) => product.badge?.includes("onSale")
  );