import React from "react";
import { LogoutUserService } from "../../services/LogoutUserService";
interface IUserAccessGuardComponentComponent {
  children: JSX.Element;
  showOrHidden: boolean;
  showChildrenHidden?: boolean;
  childrenHidden?: JSX.Element;
  nestedComponentBoolean?: boolean;
}

const UserAccessGuardComponentComponent = ({
  children,
  showOrHidden,
  childrenHidden,
  showChildrenHidden = false,
  nestedComponentBoolean = false,
}: IUserAccessGuardComponentComponent) => {
  if (![nestedComponentBoolean, !showOrHidden].includes(false)) {
    (async () => {
      await LogoutUserService();
    })();
  }
  const handleChildrenHidden = (): JSX.Element => {
    if (showChildrenHidden) {
      return childrenHidden as JSX.Element;
    } else {
      return <></>;
    }
  };
  return showOrHidden ? children : handleChildrenHidden();
};

export default UserAccessGuardComponentComponent;
