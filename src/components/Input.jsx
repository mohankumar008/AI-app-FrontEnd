import React from "react";

const Input = ({ label, type = "text", name, onChange, rightSlot, ...rest }) => {
  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-violet focus:ring-2 focus:ring-violet/20 shadow-sm">
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 block text-sm font-medium text-mist/90"
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
          className="w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder-mist/40 outline-none transition-all duration-200 focus:border-violet focus:ring-2 focus:ring-violet/40"
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
