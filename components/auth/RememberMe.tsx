import React, { useEffect, useState } from "react";
import { LocalStorageAuthRememberMeService } from "../../services/LocalStorageService";
import CheckboxCustomOne from "../checkboxes/CheckboxCustomOne";

const RememberMeComponent = () => {
  const [valueCheckBox, setValueCheckBox] = useState<boolean | undefined>();
  useEffect(() => {
    setValueCheckBox(LocalStorageAuthRememberMeService().getRememberMe());
  }, []);
  const onHandleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.checked;
    setValueCheckBox(value);
    LocalStorageAuthRememberMeService().setRememberMe(value);
  };
  return (
    <div className="flex">
      <p className="text-sm  text-nsBlack1">Remember Me</p>
      <CheckboxCustomOne
        colorSvgCustom="nsWhite1"
        size="small"
        checked={valueCheckBox ? true : false}
        onChange={onHandleCheckbox}
        inputProps={{ "aria-label": "Checkbox Remember me" }}
      />
    </div>
  );
};

export default RememberMeComponent;
