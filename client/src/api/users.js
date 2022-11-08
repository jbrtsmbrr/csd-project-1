import useSWR from "swr";

export const useUsers = () => {
  const { data } = useSWR("https://jsonplaceholder.typicode.com/users");

  return data;
};

export const useUser = (id) => {
  const { data } = useSWR(
    id && `https://jsonplaceholder.typicode.com/users/${id}`
  );

  return data;
};
