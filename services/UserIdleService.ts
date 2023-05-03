import { useIdleTimer } from 'react-idle-timer'
import { LogoutUserService } from "./LogoutUserService";
export const UserIdleService = () => {
  const onIdle = async () => {
   await LogoutUserService()
  }
  useIdleTimer({
    onIdle,
    onActive:()=>{},
    onAction:()=>{},
    timeout: 600000,
    throttle: 500
  })
};
