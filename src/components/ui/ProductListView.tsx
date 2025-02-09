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
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-start aspect-auto justify-center w-full gap-2">
        <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px]flex flex-row gap-2  lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden">
          <Image
            src={data.srcUrl}
            width={60}
            height={60}
            className="rounded-md object-contain hover:scale-110 transition-all duration-500"
            alt={data.title}
            priority
          />
        </div>
        <div className="flex flex-col gap-1 items-center">
          <strong className="text-black xl:text-xl">{data.title}</strong>
          <div className="text-gray-500 xl:text-sm">{data.description || "No description"}</div>
        </div>
        <div className="flex items-end mb-1 xl:mb-2">
          <Rating
            initialValue={data.rating}
            allowFraction
            SVGclassName="inline-block"
            emptyClassName="fill-gray-50"
            size={19}
            readonly
          />
          <span className="text-black text-xs xl:text-sm ml-[11px] xl:ml-[13px] pb-0.5 xl:pb-0">
            {data.rating.toFixed(1)}
            <span className="text-black/60">/5</span>
          </span>
        </div>
        <div className="flex items-center  space-x-[5px] xl:space-x-2.5">
          {data.discount.percentage > 0 ? (
            <span className="font-bold text-black text-xl xl:text-2xl">
              {`${Math.round(
                data.price - (data.price * data.discount.percentage) / 100
              )}`}
            </span>
          ) : data.discount.amount > 0 ? (
            <div className="flex items-center">
              <FaRupeeSign />
              <span className="font-bold text-black text-xl xl:text-2xl">
                {`${data.price - data.discount.amount}`}
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <FaRupeeSign />
              {data.price}
            </div>
          )}
          {data.discount.percentage > 0 && (
            <div className="flex items-center">
              <FaRupeeSign />
              <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
                {data.price}
              </span>
            </div>
          )}
          {data.discount.amount > 0 && (
            <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
              <FaRupeeSign />
              {data.price}
            </span>
          )}
          {data.discount.percentage > 0 ? (
            <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              {`-${data.discount.percentage}%`}
            </span>
          ) : (
            data.discount.amount > 0 && (
              <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-${data.discount.amount}`}
              </span>
            )
          )}
        </div>
        <div id="admin-product-list-view-button" className="flex items-center gap-2">
          <button 
            onClick={() => window.location.href = `/admin/product/${data.id}/${data.title.split(" ").join("-")}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            View
          </button>
          <button 
            onClick={() => window.location.href = `/admin/product/${data.id}/${data.title.split(" ").join("-")}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
          <button 
            onClick={() => window.location.href = `/admin/product/${data.id}/${data.title.split(" ").join("-")}`}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
