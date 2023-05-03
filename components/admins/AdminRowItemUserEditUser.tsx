import React from "react";
import IconButtonCustomOne from "../buttons/IconButtonCustomOne";
import LinksCustom from "../customs/LinksCustom";
import { EditIcon } from "../mui";

const AdminRowItemUserEditUserComponent = ({
  idUser,
  emailUser
}: {
  idUser: string;
  emailUser: string;
}) => {
  return (
    <IconButtonCustomOne aria-label="edit user">
      <LinksCustom
        href={`/dashboard/users/${idUser}?email=${emailUser}`}
        nameLink={<EditIcon />}
      />
    </IconButtonCustomOne>
  );
};

export default AdminRowItemUserEditUserComponent;
