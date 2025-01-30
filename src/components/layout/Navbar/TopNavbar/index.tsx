"use client"
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import orientation from "@/database/orientation.json";
import { SelectInput, SelectInputProps } from "@/components/common/SelectInput/SelectInput";
import { Option } from "@/components/common/SelectInput/SelectInputModel";
import { allProductsData } from "@/app/index";
import { Product } from "@/types/product.types";
//TODO below should go to a config file
const data: NavMenu = [
  {
    id: 1,
    label: "Shop",
    type: "MenuList",
    children: orientation.map((item) => ({
      id: item.id,
      label: item.label,
      url: `/shop?orientation=${item.value}`,
      description: item.description,
    })),
  },
  {
    id: 2,
    type: "MenuItem",
    label: "On Sale",
    url: "/shop?badge=onSale",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "New Arrivals",
    url: "/shop?badge=newArrivals",
    children: [],
  },
  // {
  //   id: 4,
  //   type: "MenuItem",
  //   label: "Brands",
  //   url: "/shop#brands",
  //   children: [],
  // },
];


const TopNavbar = () => {
  const options: Option[] = allProductsData.map((product: Product) => ({
    optionLabel: product.title,
    label: product.title,
    value: product.id,
  }));

  const selectInputProps: SelectInputProps = React.useMemo(
    () => ({
      showSearchIcon: true,
      placeholder: "Search",
      options,
      className: "w-full",
      optionsClassName: "max-h-[50vh]",
      // value: "1",
      id: "select-company-at-home-page",
      onChange: () => {},
      // onSearch: () => {},
    }),
    [options]
  );
  
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mr-3 ",
            ])}
          >
            <Image
              priority
              src="/images/Primary_logo.png"
              height={200}
              width={200}
              alt="logo"
              className="w-[80px] h-auto  md:w-[120px] lg:w-[160px]"
            />
            {/* SHOP.CO */}
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {/* <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
          <InputGroup.Text>
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5"
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Search for products..."
            className="bg-transparent placeholder:text-black/40"
          />
        </InputGroup> */}
                    <div className="flex flex-1 shrink gap-2 border border-black/10 p-2 mr-2 rounded-full items-center self-stretch my-auto w-full basis-0  max-md:max-w-full">
              <SelectInput {...selectInputProps} />
            </div>
        <div className="flex items-center">
          <Link href="/search" className="block md:hidden mr-[14px] p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={100}
              width={100}
              alt="search"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
          <CartBtn />
          <Link href="/#signin" className="p-1">
            <Image
              priority
              src="/icons/user.svg"
              height={100}
              width={100}
              alt="user"
              className="max-w-[22px] max-h-[22px]"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
