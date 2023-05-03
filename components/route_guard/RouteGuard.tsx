import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  accessPatchAuthLoginRegisterDigitNumber,
  accessPatchDashboard,
} from "../../services/RouterGuardService";
import { IChildrenProps } from "../../interfaces/other/IOther.interface";

const RouteGuard = ({ children }: IChildrenProps) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authCheck = (url: string) => {
    const path = url.split("?")[0];
    let valueGuard = [
      accessPatchAuthLoginRegisterDigitNumber(path),
      accessPatchDashboard(path),
    ].find((value) => value.value == true);
    if (valueGuard?.value) {
      setAuthorized(false);
      router.push({
        pathname: valueGuard.nameRoute,
      });
    } else {
      setAuthorized(true);
    }
  };

  return authorized ? children : <></>;
};
export { RouteGuard };
