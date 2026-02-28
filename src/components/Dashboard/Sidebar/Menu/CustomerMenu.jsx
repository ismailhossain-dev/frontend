import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";
import { MdDashboard } from "react-icons/md";
const CustomerMenu = () => {
  return (
    <>
      <MenuItem icon={MdDashboard} label="Statics" address="user-overview" />
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />
    </>
  );
};

export default CustomerMenu;
