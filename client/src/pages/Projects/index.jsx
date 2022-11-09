import React from "react";
import useSWR from "swr";
import { useAuthContext } from "../../context/Auth";

const Projects = () => {
  const { user } = useAuthContext();
  const { data } = useSWR(
    `https://jsonplaceholder.typicode.com/user/${user.id}/posts`
  );
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Projects;
