import React, { ChangeEvent } from "react";
import { cn } from "../../../lib/utils";
import { IoIosClose } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string | number | undefined;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  onClear?: () => void;
  boundaryClass?: string;
  iconClass?: string;
  searchInputRef?: React.RefObject<HTMLInputElement>;
}

const TextInput = ({searchInputRef,value, onChange,boundaryClass, placeholder, className, onClear, iconClass, ...props}: TextInputProps) => {
  return (
    <div className={cn("", boundaryClass)}>
      {iconClass &&   <div className={cn("", iconClass)}>
        <FiSearch />
      </div>}
      <input
        ref={searchInputRef}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn("flex h-[4vh] w-full bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent  rounded-md file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:text-gray-500", className)}
        {...props}
      />
      {value !== undefined && value !== null && value !== 0 && value.toString().trim() !== "" && <IoIosClose className="text-3xl cursor-pointer text-gray-500 hover:text-gray-700" onClick={onClear} />}  
    </div>
  );
};

export default TextInput;
