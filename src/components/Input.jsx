import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  onChange,
  rightSlot,
  ...rest
}) => {
  return (
    <div className="mb-5">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-semibold"
          style={{ color: "#6C63FF" }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          onChange={onChange}
          className="w-full rounded-2xl px-4 py-3.5 text-sm outline-none transition-all duration-200"
          style={{
            backgroundColor: "#EEF0F5",
            boxShadow: "inset 4px 4px 8px #c8cad4, inset -4px -4px 8px #ffffff",
            color: "#4A4E6A",
            border: "none",
          }}
          onFocus={(e) => {
            e.target.style.boxShadow =
              "inset 5px 5px 10px #c0c2cc, inset -5px -5px 10px #ffffff, 0 0 0 2px rgba(108,99,255,0.25)";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow =
              "inset 4px 4px 8px #c8cad4, inset -4px -4px 8px #ffffff";
          }}
          {...rest}
        />
        {rightSlot && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {rightSlot}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
