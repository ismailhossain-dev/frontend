import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { FaUserCircle } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Books" address="manage-users" />
      <MenuItem icon={FaUserCircle} label="Libarian Request" address="labirian-request" />
    </>
  );
};

export default AdminMenu;
