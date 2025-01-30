import React from "react";

export const useClickOutsideDetection = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
    
    React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            callback();
        }
      };
  
      const handleClickOutside = (event: MouseEvent) => {
        if (
          ref.current &&
        !ref.current.contains(event.target as Node)
        ) {
            callback();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [ref, callback]);
};  