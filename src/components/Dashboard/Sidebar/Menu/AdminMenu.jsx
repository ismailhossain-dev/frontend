import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { FaUserCircle } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUserCog}
        label="Dashboard Overview"
        address="/dashboard/dashboard-overview"
      />
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem icon={FaUserCog} label="Manage books" address="manage-books" />

      <MenuItem icon={FaUserCircle} label="Category" address="admin-category" />
    </>
  );
};

export default AdminMenu;
