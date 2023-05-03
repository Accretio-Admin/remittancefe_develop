import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ResetPasswordComponent from "../../components/auth/ResetPassword";
import IconButtonCustomOne from "../../components/buttons/IconButtonCustomOne";
import LinksCustom from "../../components/customs/LinksCustom";
import { CloseIcon } from "../../components/mui";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [tokenQuery, setTokenQuery] = useState<string>("");
  useEffect(() => {
    if (!router.isReady && !router.query.token) return;
    setTokenQuery(router.query.token as string);
  }, [router.isReady, router.query.token]);
  return (
    <div className="bg-nsWhite1 h-screen flex flex-col items-center justify-start ">
      <ResetPasswordComponent
        token={tokenQuery}
      />
      <div className="border bg-nsSin1 rounded-nsXl absolute right-20 top-10">
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

export default ResetPasswordPage;
