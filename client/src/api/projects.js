// import axios from "axios";
import useSWR, { mutate } from "swr";
import axios from "axios";
import Cookies from "js-cookie";

export const useProjects = () => {
  const response = useSWR(`${process.env.REACT_APP_BASE_URL}/capstone/list`);

  return response;
};

export const useAssignedProjects = (id) => {
  const response = useSWR(
    `${process.env.REACT_APP_BASE_URL}/capstone/assigned/${id}`
  );

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

export const updateChapter = ({ project, status, chapter }) => {
  const token = Cookies.get("token");
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/capstone/update/percentage`,
    { id: project, status, chapter },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const optimisticUpdateChapter = ({
  allProjects,
  project,
  status,
  chapter,
}) => {
  const newProject = {
    ...project,
    documents: project.documents.map((document) => {
      if (chapter === document.key) return { ...document, status };
      return document;
    }),
  };

  const newAllProjects = allProjects.map((project) => {
    if (project._id === newProject._id) return newProject;
    return project;
  });

  mutate(
    `${process.env.REACT_APP_BASE_URL}/capstone/list/${project._id}`,
    async () => {
      updateChapter({ project: project._id, status, chapter });
      return { capstone: newProject };
    },
    {
      optimisticData: { capstone: newProject },
      rollbackOnError: true,
    }
  );

  // const options = {
  //   optimisticData: { capstones: newAllProjects },
  //   rollbackOnError: true,
  //   // revalidate: true,
  //   // populateCache: true
  // };
  // mutate(
  //   `${process.env.REACT_APP_BASE_URL}/capstone/list`,
  //   async () => {
  //     updateChapter({ project: project._id, status, chapter });

  //     return { capstones: newAllProjects };
  //   },
  //   options
  // );
};
