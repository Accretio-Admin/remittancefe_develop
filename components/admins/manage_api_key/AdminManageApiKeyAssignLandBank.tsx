import React, { useEffect, useState } from "react";
import { FormControlLabel } from "../../mui";
import SwitchToggleCustom from "../../customs/SwitchToggleCustom";
import { useRouter } from "next/router";
import { ApiService } from "../../../services/ApiService";
const AdminManageApiKeyAssignLandBankComponent = () => {
  const router = useRouter();
  const [idAssignLandBank, setIdAssignLandBank] = useState<string>();
  const [assignLandBankValue, setAssignLandBankValue] = useState<boolean>();
  const [idQuery, setIdQuery] = useState<string>("");
  const [emailQuery, setEmailQuery] = useState("");

  useEffect(() => {
    (async () => {
      if (!router.isReady && !router.query.id) return;
      try {
        let { results } = await (
          await ApiService().landBank().getAllCredentials()
        ).data;
        let idAssign = results[0].id;
        setIdAssignLandBank(idAssign);
        setIdQuery(router.query.id as string);
        setEmailQuery(router.query.email as string);
        await (
          await ApiService()
            .landBank()
            .checkCredentialForUserById(
              idAssign as string,
              router.query.id as string
            )
        ).data;
        setAssignLandBankValue(true);
      } catch (error) {
        setAssignLandBankValue(false);
        return error;
      }
    })();
  }, [router.isReady]);
  const handleOnChangeToggleAssignLandBank = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setAssignLandBankValue(checked);
    try {
      if (checked) {
        await (
          await ApiService()
            .landBank()
            .addSingleCredentialForUserById(idAssignLandBank as string, {
              assignee: emailQuery,
            })
        ).data;
      } else {
        await (
          await ApiService()
            .landBank()
            .removeSingleCredentialForUserById(idAssignLandBank as string, {
              userId: idQuery,
            })
        ).data;
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="bg-nsWhite1  border border-solid border-nsGray1 rounded-nsBase my-5 flex items-center justify-start">
      <p className="m-0 p-4">Agent Accessibility</p>
      <div className="mx-12">
        <FormControlLabel
          control={
            <SwitchToggleCustom
              onChange={handleOnChangeToggleAssignLandBank}
              value={assignLandBankValue}
              checked={assignLandBankValue}
            />
          }
          label=""
          />
      </div>
    </div>
  );
};

export default AdminManageApiKeyAssignLandBankComponent;
