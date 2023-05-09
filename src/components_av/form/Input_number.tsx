import React from "react";

interface I_input_number {
  name: string;
  label: string;
  placeholder: string;
  value: string | number;
  on_change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  error_message: string | undefined;
}
function Input_number({
  name,
  label,
  placeholder,
  value,
  on_change,
  error,
  error_message = "",
  ...props
}: I_input_number) {
  const on_focus = () => {
    error_message;
  };
  return (
    <div className="mb-2">
      <label className="block font-bold text-gray-900" htmlFor={name}>
        {label}
      </label>
      <input
        autoComplete="off"
        type="number"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={on_change}
        onFocus={on_focus}
        className="w-full p-2 mx-auto text-gray-900 border-2 border-gray-500 border-opacity-50 rounded outline-none focus:border-blue-500"
      />
      {!value ? (
        <>
          <span className="text-sm italic text-red-500">{error_message}</span>
          <span className="text-sm italic text-red-500">{value}</span>
        </>
      ) : null}
    </div>
  );
}

export { Input_number };
