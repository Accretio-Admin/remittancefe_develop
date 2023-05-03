import * as jwt from "jsonwebtoken";
import { LocalStorageAuthService } from "./LocalStorageService";
import { removeLocalStorageUserAndRedirect } from "./LogoutUserService";

export const JwtService = () => {
  const handleVerify = (token: string): boolean => {
    try {
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
      return true;
    } catch (error) {
      return false;
    }
  };
  const handleJwtExpireCheck = ()=>{
    jwt.verify(LocalStorageAuthService().getUser()?.tokens.access.token as string, process.env.NEXT_PUBLIC_JWT_SECRET as string, function(err, decoded) {
      if (err && err.message == "TokenExpiredError") {
        removeLocalStorageUserAndRedirect();
      }
    });
  }
  const handleValidJwt = () => {
    const refreshToken = (): boolean =>
      JwtService().handleVerify(
        LocalStorageAuthService().getUser()?.tokens.refresh.token as string
      );
    const accessToken = (): boolean =>
      JwtService().handleVerify(
        LocalStorageAuthService().getUser()?.tokens.access.token as string
      );
    return {
      refreshToken,
      accessToken,
    };
  };
  return {
    handleVerify,
    handleValidJwt,
    handleJwtExpireCheck
  };
};
