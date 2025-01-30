export type Discount = {
  amount: number;
  percentage: number;
};

// TODO don't knwo what is related products
export type Badge = "newArrivals" | "topSelling" | "relatedProducts" | "sale";
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
  badge?: string ; //TODO erro happening when doing Badge type need to handle in future
  // TODO badge should be an array of Badge type
  orientation?: string;
};
