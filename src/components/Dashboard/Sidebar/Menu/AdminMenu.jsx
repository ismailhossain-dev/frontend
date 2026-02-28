import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { FaUserCircle } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdAdminPanelSettings}
        label="Dashboard Overview"
        address="/dashboard/dashboard-overview"
      />
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem icon={IoBookSharp} label="Manage books" address="manage-books" />

      <MenuItem icon={FaUserCircle} label="Category" address="admin-category" />
    </>
  );
};

export default AdminMenu;
