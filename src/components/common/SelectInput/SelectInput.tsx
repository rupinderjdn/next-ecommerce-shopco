import * as React from "react"
import { cn } from "../../../lib/utils";
import { Option } from "./SelectInputModel";
import { CiSearch } from "react-icons/ci";
import { IoIosSearch, IoMdClose, IoMdSearch } from "react-icons/io";
import { useClickOutsideDetection } from "../../../lib/hooks/useClickOutsideDetection";

export interface SelectInputProps  {
  options: Option[];
  value?: string | number | null | undefined;
  onChange?: (value: string | number |  null | undefined) => void;
  placeholder?: string;
  className?: string;
  optionsClassName?: string;
  showSearchIcon?: boolean;
  id: string;
  onSearch?: (value: string) => void;
  wrapperClassName?: string;
}

// TODO react-virtualized can be used to optimize the performance
export const SelectInput = React.forwardRef<HTMLInputElement, SelectInputProps>(
  ({ className, wrapperClassName, optionsClassName, options, value, onChange, placeholder, showSearchIcon = true, onSearch, id, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    
    const filteredOptions = React.useMemo(() => {
      if (onSearch) {
        // * searching will be handled by the parent
        return options;
      }
      return options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [options, searchTerm, onSearch]);

    const selectedOption = React.useMemo(() => {
      return options.find(option => option.value === value);
    }, [options, value]);

    useClickOutsideDetection(containerRef, () => setIsOpen(false));

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setIsOpen(true);
      onSearch?.(event.target.value);
    };

    const handleOptionClick = (option: Option) => {
      onChange?.(option.value);
      setSearchTerm(option.label);
      setIsOpen(false);
    };

    const handleClear = () => {
      setSearchTerm("");
      onChange?.(null);
      setIsOpen(false);
    };

    const handleSearchClick = () => {
      inputRef.current?.focus(); 
    };

    React.useEffect(() => {
      if (selectedOption) {
        setSearchTerm(selectedOption.label);
      }
    }, [selectedOption]);

    return (
      <div ref={containerRef} className={cn(`relative  ${wrapperClassName}`)}>
        <div className="flex items-center gap-2">
          {showSearchIcon && (
            <IoIosSearch 
              className="w-6 h-6 cursor-pointer font-extrabold" 
              onClick={handleSearchClick}
            />
          )}
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className={cn(
              "flex h-[4vh] w-full bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm shadow-none placeholder:text-gray-300",
              className
            )}
            {...props}
          />
          {searchTerm && (
            <IoMdClose 
              className="w-4 h-4 cursor-pointer hover:text-gray-700" 
              onClick={handleClear}
            />
          )}
        </div>
        
        {isOpen && filteredOptions.length > 0 && (
          <div id={id}  className={cn(`absolute z-50 w-full mt-4 h-[20vh] bg-white border rounded-md ${filteredOptions.length > 0 ? "shadow-lg" : "shadow-none"} overflow-auto ${optionsClassName}`)} >
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`px-2 py-1.5 my-0.5  ${option.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50  cursor-pointer"}`}
                onClick={() => option.disabled ? null : handleOptionClick(option)}
              >
                {option.optionLabel}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";
