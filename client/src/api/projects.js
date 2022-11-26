// import axios from "axios";
import useSWR, { mutate } from "swr";
import axios from "axios";

export const useProjects = () => {
  const response = useSWR(`${process.env.REACT_APP_BASE_URL}/capstone/list`);

  return response;
};

export const useProject = (id) => {
  const response = useSWR(
    `${process.env.REACT_APP_BASE_URL}/capstone/list/${id}`
  );

  return response;
};

const updateRating = async (body) => {
  const { user, project_id, rating, token } = body;
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/capstone/update/rating`,
    {
      id: project_id,
      user: user,
      rating,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const optimisticUpdateProjects = (projects, body = {}) => {
  const options = {
    optimisticData: { capstones: projects },
    rollbackOnError: true,
    // revalidate: true,
    // populateCache: true
  };
  mutate(
    `${process.env.REACT_APP_BASE_URL}/capstone/list`,
    async () => {
      updateRating(body);

      return { capstones: projects };
    },
    options
  );
};

export const optimisticUpdateProject = (project, body) => {
  mutate(
    `${process.env.REACT_APP_BASE_URL}/capstone/list/${project._id}`,
    async () => {
      updateRating(body);
      return { capstone: project };
    },
    {
      optimisticData: { capstone: project },
      rollbackOnError: true,
    }
  );
};
