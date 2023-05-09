import Image from "next/image";
import { Inter } from "next/font/google";
import { Input_text } from "@/components_av/form/Input_text";
import { useState } from "react";
import { useRouter } from "next/router";
import { prisma } from "../../lib/prisma";
import { BsFillPersonFill } from "react-icons/bs";
import { FiAtSign } from "react-icons/fi";
import { GiSpanner } from "react-icons/gi";
import {
  MdOutlineEmail,
  MdOutlineCall,
  MdHome,
  MdTransitEnterexit,
} from "react-icons/md";
// import {Input}

import { form_validation } from "@/validations/form_validation";
import { Input_email } from "@/components_av/form/Input_email";
import { Input_tel } from "@/components_av/form/Input_tel";

const inter = Inter({ subsets: ["latin"] });

interface I_home {
  clients: {
    id: string;
    name: string;
    username: string;
    jobTitle: string;
    email: string;
    tel: string;
    adress: string;
  }[];
}

export default function Home({ clients }: I_home) {
  const empty_form = {
    id: "",
    name: "",
    username: "",
    jobTitle: "",
    tel: "",
    email: "",
    adress: "",
    entered_in: "web",
  };

  interface I_form_data {
    // realisation_id: string;
    id: string;
    name: string;
    username: string;
    jobTitle: string;
    email: string;
    tel: string;
    adress: string;
  }
  const [form, set_form] = useState<I_form_data>(empty_form);
  const [feedback, set_feedback] = useState("");

  const [errors, set_errors] = useState<{
    name?: string;
    username?: string;
    jobTitle?: string;
    email?: string;
    tel?: string;
    adress?: string;
  }>({});

  const router = useRouter();
  const base_api_url = "/api/gibberish";

  const refresh_data = () => {
    router.replace(router.asPath);
  };

  const submit_fn = async (event: any) => {
    event.preventDefault();
    const errors = form_validation(form);
    set_errors(errors);

    const errors_values = Object.values(errors);

    const is_no_error = errors_values.every(
      (error_value) => error_value.length === 0
    );
    if (!is_no_error) return;
    try {
      console.log("console log in try catch", form);
      let api_to_submit_to;
      let method;
      if (form.id) {
        api_to_submit_to = `${base_api_url}/${form.id}`;
        method = "PUT";
      } else {
        api_to_submit_to = base_api_url;
        method = "POST";
      }
      await fetch(`${api_to_submit_to}`, {
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
        method: method,
      })
        .then(() => {
          set_form(empty_form);
          if (form.id) set_feedback("client updated successfully");

          console.log(
            "console log in the submit fn of form in then function",
            form
          );

          refresh_data();

          // refresh_data();
          console.log("then we create");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }

    console.log("something to display");
  };

  const delete_fn = async (client_id: string) => {
    console.log("delete clicked");

    try {
      // `/api/${api_redirection}/${data.id}`

      await fetch(`/api/gibberish/${client_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          refresh_data(); // for updating the retreiving list after a submit
          set_feedback("client deleted successfully");
          console.log("delete");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
  const update_button_clicked_fn = async (client: any) => {
    set_form(client);
  };

  const on_change = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    set_form((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log("clients--------------- ♻ ----------------", clients);

  return (
    // <main
    //   className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    // >
    <div className="flex min-h-screen ">
      <div className="">
        {feedback ? (
          <span
            onClick={() => set_feedback("")}
            className="absolute px-4 text-red-700 bg-red-100"
          >
            {feedback}
          </span>
        ) : (
          ""
        )}{" "}
      </div>
      <div className="flex justify-center w-1/2">
        {/* flex justify-center flex-1 mx-auto */}
        <div className="fixed">
          <form
            method="post"
            onSubmit={submit_fn}
            className="fixed w-auto py-6 mx-0 my-8 sm:mx-auto md:mx-8 md:px-6"
          >
            <Input_text
              name="name"
              label="Name"
              placeholder="Enter the name"
              value={form.name}
              on_change={on_change}
              error={!!errors.name}
              error_message={errors.name}
            />
            <Input_text
              name="username"
              label="username"
              placeholder="Enter the username"
              value={form.username}
              on_change={on_change}
              error={!!errors.username}
              error_message={errors.username}
            />
            <Input_text
              name="jobTitle"
              label="jobTitle"
              placeholder="Enter the jobTitle"
              value={form.jobTitle}
              on_change={on_change}
              error={!!errors.jobTitle}
              error_message={errors.jobTitle}
            />

            <Input_email
              name="email"
              label="email"
              placeholder="Enter the email"
              value={form.email}
              on_change={on_change}
              error={!!errors.email}
              error_message={errors.email}
            />

            <Input_tel
              name="tel"
              label="tel"
              placeholder="Enter the tel"
              value={form.tel}
              on_change={on_change}
              error={!!errors.tel}
              error_message={errors.tel}
            />
            <Input_text
              name="adress"
              label="adress"
              placeholder="Enter the adress"
              value={form.adress}
              on_change={on_change}
              error={!!errors.adress}
              error_message={errors.adress}
            />

            <button
              type="submit"
              className="p-1 mt-8 text-white bg-blue-500 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div>
        <h1 className="text-xl text-gray-800">List of our clients</h1>

        {clients.map((client: any) => (
          <div key={client.id}>
            <h1>------------######## -----------------</h1>
            <div className="flex justify-end">
              <button
                onClick={() => update_button_clicked_fn(client)}
                className="px-3 text-blue-500 bg-blue-200 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => delete_fn(client.id)}
                className="px-3 ml-4 text-red-500 bg-red-200 rounded-lg"
              >
                Delete
              </button>
            </div>
            <h1 className="flex text-grey-900 baseline">
              <BsFillPersonFill className="pb-0 mr-2 text-lg" />
              <span className="items-baseline">{client.name}</span>
            </h1>
            <h1 className="flex text-grey-900 baseline">
              <FiAtSign className="pb-0 mr-2 text-lg" />
              <span className="items-baseline">{client.username}</span>
            </h1>
            <h1 className="flex text-grey-900 baseline">
              <GiSpanner className="pb-0 mr-2 text-lg" />
              <span className="items-baseline">{client.jobTitle}</span>
            </h1>
            <h1 className="flex text-grey-900 baseline">
              <MdOutlineEmail className="pb-0 mr-2 text-lg" />
              <span className="items-baseline">{client.email}</span>
            </h1>
            <h1 className="flex text-grey-900 baseline">
              <MdOutlineCall className="pb-0 mr-2 text-lg" />
              <span className="items-baseline">{client.tel}</span>
            </h1>
            <h1 className="flex text-grey-900 baseline">
              <MdHome className="pb-0 mr-2 text-lg" />
              <span className="items-baseline">{client.adress}</span>
            </h1>
            <h1 className="flex text-grey-900 baseline">
              <MdTransitEnterexit className="pb-0 mr-2 text-lg" />
              <span className="items-baseline px-2 bg-red-400">
                {client.entered_in}
              </span>
            </h1>
          </div>
        ))}
        <h1>-------- end of my clients list --------</h1>
      </div>
    </div>
    // </div>
    // </main>
  );
}

export const getServerSideProps = async () => {
  const clients = await prisma.client.findMany({
    orderBy: { created_at: "desc" },
  });

  return {
    props: {
      // posts,
      // categories,
      clients: JSON.parse(JSON.stringify(clients)), // many to many relation ships things
    },
  };
};
