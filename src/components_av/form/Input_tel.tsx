import React from "react";

interface I_input_tel {
  name: string;
  label: string;
  //   type?: string;
  placeholder: string;
  value: string | number;
  on_change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  error_message: string | undefined;
}
function Input_tel({
  name,
  label,
  placeholder,
  value,
  on_change,
  error,
  error_message = "",
  ...props
}: I_input_tel) {
  const on_focus = () => {
    error_message;
  };

  return (
    <div className="flex flex-col mt-4">
      <label className="block font-bold text-green-500" htmlFor={name}>
        {label}
      </label>
      <input
        autoComplete="off"
        type="tel"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={on_change}
        onFocus={on_focus}
        className="w-full m-4"
        //pattern="[A-Za-z]"
        //required w-full p-3 mx-auto text-gray-900 bg-yellow-600 border-2 border-gray-500 border-opacity-50 rounded outline-none focus:border-red-500
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

export { Input_tel };
