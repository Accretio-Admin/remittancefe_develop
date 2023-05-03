import React from "react";
import ForgotPasswordComponent from "../../components/auth/ForgotPassword";
import IconButtonCustomOne from "../../components/buttons/IconButtonCustomOne";
import LinksCustom from "../../components/customs/LinksCustom";
import { CloseIcon } from "../../components/mui";

const ForgotPasswordPage = () => {
  return (
    <div className="bg-nsWhite1 h-screen flex flex-col items-center justify-start ">
      <ForgotPasswordComponent />
      <div className="border bg-nsSin1 rounded-nsXl  absolute right-20 top-10">
        <IconButtonCustomOne
          colorIconCustom="nsWhite1"
          aria-label="Back to page "
        >
          <LinksCustom href="/auth/login" nameLink={<CloseIcon />} />
        </IconButtonCustomOne>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
