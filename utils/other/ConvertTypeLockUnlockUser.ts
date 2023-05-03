import {
  EUserLockUnlock,
  TUserSelectLockUnlock,
} from "../../interfaces/user/IUser.interface";

export const ConvertUserLockUnlockNumberToString = (value: number): string => {
  if (value === 0) {
    return EUserLockUnlock.lock;
  } else {
    return EUserLockUnlock.unlock;
  }
};
export const ConvertUserLockUnlockStringToNumber = ({
  select,
}: TUserSelectLockUnlock): number => {
  if (select === EUserLockUnlock.lock) {
    return 0;
  } else {
    return -3;
  }
};
