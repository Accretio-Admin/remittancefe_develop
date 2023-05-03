import React from "react";
import { Colors } from "../../utils/colors";
import IconButtonCustomOne from "../buttons/IconButtonCustomOne";
import { LinkIcon, LinkOffIcon } from "../mui";
import { useRouter } from "next/router";

const AdminRowItemUserAssignedLandBankComponent = ({
  valueBoolean,
  emailUser,
  idUser,
}: {
  valueBoolean: boolean;
  emailUser: string;
  idUser: string;
}) => {
  const router = useRouter();
  return (
    <div>
      <IconButtonCustomOne aria-label="user assigned">
        {valueBoolean ? (
          <LinkIcon
            onClick={() =>
              router.push({
                pathname: `/dashboard/users/${idUser}`,
                query: { assignScroll: true, email: emailUser },
              })
            }
            sx={{ color: Colors.nsFunGreen1 }}
          />
        ) : (
          <LinkOffIcon
            onClick={() =>
              router.push({
                pathname: `/dashboard/users/${idUser}`,
                query: { assignScroll: true, email: emailUser },
              })
            }
            sx={{ color: Colors.nsCinnabar1 }}
          />
        )}
      </IconButtonCustomOne>
    </div>
  );
};

export default AdminRowItemUserAssignedLandBankComponent;
