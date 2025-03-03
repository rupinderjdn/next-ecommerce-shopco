export type Discount = {
  amount: number;
  percentage: number;
};

export type StockInfo = {
  size: string;
  colors: string[];
  quantity: number;
};

// TODO need stock info size info and color info
// TODO don't knwo what is related products
export type Badge = "newArrivals" | "topSelling" | "relatedProducts" | "sale";

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parentId?: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  finalPrice: number;
  discount: Discount;
  rating: number;
  category: Category;
  subCategory?: string;
  brand?: string;
  badge?: Badge[];
  orientation?: string;
  description?: string;
};
