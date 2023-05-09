interface I_form {
  id?: string;
  name: string;
  username: string;
  jobTitle: string;
  email: string;
  tel: string;
  adress: string;
}
export const form_validation = ({
  //   id,
  name,
  username,
  jobTitle,
  email,
  tel,
  adress,
}: //   photo_url,
I_form) => {
  const errors: {
    // id?: string;
    name?: string;
    username?: string;
    jobTitle?: string;
    email?: string;
    tel?: string;
    adress?: string;
    // lasting_of_execution?: string;
    // photo_url?: string;
  } = {
    name: "",
    username: "",
    jobTitle: "",
    email: "",
    tel: "",
    adress: "",
    // lasting_of_execution: "",

    // photo_url: "",
  };

  if (!name || name.trim() === "") {
    errors.name = "title is required";
  }
  if (!username || username.trim() === "") {
    errors.username = "Ce champ est obligatoire";
  }
  if (!jobTitle || jobTitle.trim() === "") {
    errors.jobTitle = "This field is required";
  }
  if (!email || email.trim() === "") {
    errors.email = "Ce champ est obligatoire";
  }
  // if (!tel || tel.trim() === "") {
  //   errors.tel = "Ce champ est obligatoire";
  // }
  if (!adress || adress.trim() === "") {
    errors.adress = "Ce champ est obligatoire";
  }
  // if (!lasting_of_execution || lasting_of_execution.trim() === "") {
  //   errors.lasting_of_execution = "Ce champ est obligatoire";
  // }

  // if (!photo_url || photo_url.trim() === "") {
  //   errors.photo_url = "a photo is required";
  // }
  return errors;
};
