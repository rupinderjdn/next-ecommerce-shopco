"use client"
import React from "react";
import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { FaRupeeSign } from "react-icons/fa";

type ProductListProps = {
  data: Product;
};

const ProductList = ({ data }: ProductListProps) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start p-4 gap-6">
        <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={data.srcUrl}
            width={96}
            height={96}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            alt={data.title}
            priority
          />
        </div>

        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{data.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{data.description || "No description available"}</p>
          
          <div className="flex items-center gap-2 mb-3">
            <Rating
              initialValue={data.rating}
              allowFraction
              SVGclassName="inline-block"
              emptyClassName="fill-gray-100"
              size={16}
              readonly
            />
            <span className="text-sm text-gray-500">
              {data.rating.toFixed(1)}
              <span className="text-gray-400">/5</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {data.discount.percentage > 0 || data.discount.amount > 0 ? (
                <>
                  <FaRupeeSign className="text-gray-900 text-sm" />
                  <span className="font-semibold text-gray-900">
                    {data.discount.percentage > 0
                      ? Math.round(data.price - (data.price * data.discount.percentage) / 100)
                      : data.price - data.discount.amount}
                  </span>
                  <span className="ml-2 text-sm text-gray-400 line-through flex items-center">
                    <FaRupeeSign className="text-xs" />
                    {data.price}
                  </span>
                  <span className="ml-2 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                    {data.discount.percentage > 0 
                      ? `-${data.discount.percentage}%`
                      : `-₹${data.discount.amount}`}
                  </span>
                </>
              ) : (
                <>
                  <FaRupeeSign className="text-gray-900 text-sm" />
                  <span className="font-semibold text-gray-900">{data.price}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link 
            href={`/admin/product/${data.id}/${data.title.split(" ").join("-")}`}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
          >
            View
          </Link>
          <Link 
            href={`/admin/editProduct/${data.id}`}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
          >
            Edit
          </Link>
          <button 
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
