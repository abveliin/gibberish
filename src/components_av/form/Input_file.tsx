import React, { useState } from "react";

import { MdAddAPhoto } from "react-icons/md";

interface I_input_file {
  file_ref: any;
  label: string;
  is_form_sended: boolean;
  on_change: (e: React.ChangeEvent<HTMLInputElement>) => void;

  error: boolean;
  error_message: string | undefined;
}
function Input_file({
  file_ref,
  label,
  is_form_sended,
  // on_change,
  error,
  error_message = "",
  ...props
}: I_input_file) {
  console.log("file_ref.current", file_ref.current);
  console.log("file_ref.current.files", file_ref.current?.files);
  console.log(
    "file_ref.current.files first element",
    file_ref.current?.files[0]
  );
  const [file_name, set_file_name] = useState("");
  let input_file_balise;

  if (typeof window !== "undefined") {
    input_file_balise = document.getElementById("input_file_balise");
  }

  const change_input = (event) => {
    event.preventDefault();
    input_file_balise.click();
  };

  const input_file_change = ({ target: { files } }) => {
    files[0] && set_file_name(files[0].name);
  };

  return (
    <div className="mb-4">
      <input
        ref={file_ref}
        type="file"
        name="file"
        id="input_file_balise"
        onChange={input_file_change}
        className="hidden"
        accept="image/*"
      />

      <button
        className="flex w-auto p-2 text-gray-800 transition duration-75 bg-blue-300 rounded-lg hover:scale-105 hover:ease-in-out baseline"
        onClick={change_input}
      >
        <MdAddAPhoto className="text-lg bg-red-400" />
        <span className="items-baseline block bg-red-200">&nbsp; {label}</span>
      </button>
      {is_form_sended === false && file_name && (
        <figcaption id="file_name">{file_name}</figcaption>
      )}

      {!file_name ? (
        <span className="text-sm italic text-red-500">{error_message}</span>
      ) : null}
    </div>
  );
}

export { Input_file };
