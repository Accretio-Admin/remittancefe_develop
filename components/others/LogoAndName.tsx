import Image from "next/image";
import React from "react";
import { ILogoAndName } from "../../interfaces/other/IOther.interface";
import LinksCustom from "../customs/LinksCustom";

const LogoAndNameComponent = ({
  href = "",
  nameTagP = "REMITTANCE",
}: ILogoAndName) => {
  return (
    <LinksCustom
      nameLink={
        <div className="flex items-center justify-center cursor-pointer">
          <Image
            width={30}
            height={30}
            alt="logo-feedo"
            src="/logo-unified.png"
          />
          <p className="text-xl px-3 m-0">{nameTagP}</p>
        </div>
      }
      href={href}
    />
  );
};

export default LogoAndNameComponent;
