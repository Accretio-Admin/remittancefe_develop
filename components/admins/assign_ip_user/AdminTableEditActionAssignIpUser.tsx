import React from "react";
import { IAdminEditInfoAssignIpUser } from "../../../interfaces/admins/IAdmins.interface";
import { setValueEditAssignIpUser } from "../../../redux/features/admin_assign_ip_user/AdminAssignIpUser-Slice";
import { useAppDispatch } from "../../../redux/hook";
import IconButtonCustomOne from "../../buttons/IconButtonCustomOne";
import { EditIcon } from "../../mui";

const AdminTableEditActionAssignIpUserComponent = (
  dataColumAssignIpUser: IAdminEditInfoAssignIpUser
) => {
  const dispatch = useAppDispatch();
  return (
    <IconButtonCustomOne
      onClick={() => dispatch(setValueEditAssignIpUser(dataColumAssignIpUser))}
      aria-label="edit assign ip user"
    >
      <EditIcon />
    </IconButtonCustomOne>
  );
};

export default AdminTableEditActionAssignIpUserComponent;
