import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  useEffect(() => {
    axios(url, {
      data: {
        ...options,
      },
    }).then((res) => setResponse(res));
  }, [url, options]);

  return response;
};

export const useUsers = () => {
  const response = useSWR(`${process.env.REACT_APP_BASE_URL}/user/list`);

  return response;
};

export const useUser = (id) => {
  const { data } = useSWR(
    id && `https://jsonplaceholder.typicode.com/users/${id}`
  );

  return data;
};

export const loginUser = async ({ username, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
    method: "POST",
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ username, password }),
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer",
  });

  return response.json();
};

export const registerUser = async ({ file, ...args }) => {
  const formData = new FormData();
  Object.entries(args).forEach(([name, value]) => {
    formData.append(name, value);
  });
  // formData.append("username", args.username);
  // formData.append("password", args.password);
  // formData.append("first_name", args.first_name);
  // formData.append("last_name", args.last_name);
  // formData.append("email", args.email);
  // formData.append("role_id", "6372067bf536a826f387c959");
  // formData.append("type_id", "637204e8fe9899496361d153");
  formData.append("attachment", file);
  // formData.append("fileName", file.name);

  // const response = await fetch("http://localhost:4000/register", {
  //   method: "POST",
  //   // headers: {
  //   //   Accept: "application/json",
  //   //   "Content-Type": "multipart/form-data",
  //   // },
  //   body: formData,
  // });

  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/register`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response;
};

export const useTypes = () => {
  const response = useSWR(`${process.env.REACT_APP_BASE_URL}/types`);
  return response;
};
