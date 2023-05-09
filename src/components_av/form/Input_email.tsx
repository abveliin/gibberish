// import React from "react";

// interface I_input_email {
//   name: string;
//   label: string;
//   placeholder: string;
//   value: string;
//   on_change: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   //error_message: string;
// }
// function Input_email({
//   name,
//   label,
//   placeholder,
//   value,
//   on_change,
//   ...props
// }: I_input_email) {
//   return (
//     <div className="mb-2">
//       <label className="block font-bold text-gray-900" htmlFor={name}>
//         {label}
//       </label>
//       <input
//         autoComplete="off"
//         type="text"
//         id={name}
//         name={name}
//         placeholder={placeholder}
//         value={value}
//         onChange={on_change}
//         className="w-full p-2 mx-auto text-gray-900 border-2 border-gray-500 border-opacity-50 rounded outline-none focus:border-blue-500"
//         //pattern="[A-Za-z]"
//         //required
//       />
//       {/* <span className="px-2 text-red-700 bg-red-100 invalid:block">
//         {error_message}
//       </span> */}
//     </div>
//   );
// }

// export { Input_email };

import React from "react";

interface I_input_email {
  name: string;
  label: string;
  placeholder: string;
  value: string | number;
  on_change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  error_message: string | undefined;
}
function Input_email({
  name,
  label,
  placeholder,
  value,
  on_change,
  error,
  error_message = "",
  ...props
}: I_input_email) {
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
        type="email"
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

export { Input_email };
