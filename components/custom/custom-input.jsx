import React from "react";
import { Input } from "@/components/ui/input";
const CustomInput = ({ label, className, ...rest }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <Input
        className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${className}`}
        {...rest}
      />
    </div>
  );
};

export default CustomInput;
