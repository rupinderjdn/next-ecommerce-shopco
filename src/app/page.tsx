import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

import relatedProductDataJson from "@/database/relatedproductData.json";
import reviewsDataJson from "@/database/reviews.json";
import allProductsDataJson from "@/database/allProducts.json";
import { readExcelAndTransform } from "@/lib/excelReader";

// Transform URLs to correct format
const transformUrl = (url: string) => {
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
  (product) => product.badge === "newArrivals"
);
export const topSellingData: Product[] = allProductsData.filter(
  (product) => product.badge === "topSelling"
);

export default async function Home() {
  // const allProductsLinks = await readExcelAndTransform("products.xlsx");
  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
