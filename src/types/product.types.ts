export type Discount = {
  amount: number;
  percentage: number;
};

export type Badge = "newArrivals" | "topSelling" | "relatedProducts";
export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  category?: string;
  subCategory?: string; //TODO this subcategory can be used for sale new arrivals and top selling
  brand?: string;
  badge?: Badge;
  orientation?: string;
};
