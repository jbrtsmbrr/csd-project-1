import React from "react";
import { useUsers } from "../../api/users";

const Layout = () => {
  const data = useUsers();
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Layout;
