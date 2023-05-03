import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  EUserLockUnlock,
  IAdminRowItemUserLockAndUnLock,
} from "../../interfaces/user/IUser.interface";
import { setShowFullPage } from "../../redux/features/loading_full_page/LoadingFullPage-Slice";
import { useAppDispatch } from "../../redux/hook";
import { ApiService } from "../../services/ApiService";
import { Colors } from "../../utils/colors";
import { helperThisUserIsMe } from "../../utils/helperMe";
import {
  ConvertUserLockUnlockNumberToString,
  ConvertUserLockUnlockStringToNumber,
} from "../../utils/other/ConvertTypeLockUnlockUser";
import IconButtonCustomOne from "../buttons/IconButtonCustomOne";
import ModalCustomComponent from "../customs/ModalCustom";
import { LockOpenIcon, LockPersonIcon } from "../mui";

const AdminRowItemUserLockAndUnLockComponent = ({
  valueLockUnLock,
  valueIdUser,
  valueEmailUser,
}: IAdminRowItemUserLockAndUnLock) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showOrOffModal, setShowOrOffModal] = useState<boolean>(false);
  const [valueUnlockLock, setValueUnlockLock] = useState<boolean>(
    ConvertUserLockUnlockNumberToString(valueLockUnLock as number) ==
      EUserLockUnlock.unlock
  );
  const [valueTextUnlockLock, setValueTextUnlockLock] =
    useState<EUserLockUnlock>(
      (ConvertUserLockUnlockNumberToString(
        valueLockUnLock as number
      ) as EUserLockUnlock) == EUserLockUnlock.lock
        ? EUserLockUnlock.unlock
        : EUserLockUnlock.lock
    );
  const handleUnlockAndLockUser = async () => {
    dispatch(setShowFullPage({ active: true }));
    try {
      await (
        await ApiService()
          .users()
          .updateUnlockAndLockUsers(valueIdUser, {
            locked:
              valueTextUnlockLock == EUserLockUnlock.lock
                ? ConvertUserLockUnlockStringToNumber({
                    select: EUserLockUnlock.lock,
                  })
                : ConvertUserLockUnlockStringToNumber({
                    select: EUserLockUnlock.unlock,
                  }),
          })
      ).data;
      valueTextUnlockLock == EUserLockUnlock.lock &&
        helperThisUserIsMe().checkLockedMe(valueEmailUser);
    } catch (error) {
      return error;
    }
    dispatch(setShowFullPage({ active: false }));
    setShowOrOffModal(false);
    router.push("/dashboard/users", undefined, { shallow: true });
  };

  return (
    <div>
      <IconButtonCustomOne
        onClick={() => setShowOrOffModal(true)}
        aria-label="user lock and unlock"
      >
        {valueUnlockLock ? (
          <LockOpenIcon sx={{ color: Colors.nsFunGreen1 }} />
        ) : (
          <LockPersonIcon sx={{ color: Colors.nsCinnabar1 }} />
        )}
      </IconButtonCustomOne>
      <ModalCustomComponent
        bgColorBtnAccept={valueUnlockLock ? "nsRoman1" : "nsFunGreen1"}
        onClickCancel={setShowOrOffModal}
        handleOpenModalValue={showOrOffModal}
        titleModal={`You are about to ${valueTextUnlockLock} an account`}
        descriptionModal={`User will be ${valueTextUnlockLock} and will have ${
          valueUnlockLock ? "no" : ""
        } access to anything`}
        nameBtnAccept={valueTextUnlockLock}
        nameBtnCancel="Cancel"
        onClickAccept={() => handleUnlockAndLockUser()}
      />
    </div>
  );
};

export default AdminRowItemUserLockAndUnLockComponent;
