import useRole from "../../../hooks/useRole";
import AdminOverview from "../Admin/AdminOverview";
import UserOverview from "../Customer/UserOverview";

const SwitchRole = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <div>Loading...</div>;
  }

  return <div>{role === "admin" ? <AdminOverview /> : <UserOverview />}</div>;
};

export default SwitchRole;
