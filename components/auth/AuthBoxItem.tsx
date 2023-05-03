import Image from "next/image";
import React from "react";
import { IAuthBoxItem } from "../../interfaces/auth/IAuth.interface";
import LinksCustom from "../customs/LinksCustom";

const AuthBoxItemComponent = ({
  children,
  itemHeads,
  classWrapperOne = "",
  classWrapperTwo = "",
}: IAuthBoxItem) => {
  return (
    <div
      className={`${classWrapperOne} bg-nsSin1  flex flex-col items-center rounded-b-[80px]`}
    >
      <div className={`${classWrapperTwo}`}>
        <div className="flex items-center flex-col">
          <div className="my-5">
            <Image
              width={100}
              height={90}
              alt="logo-unified"
              src="/logo-unified.png"
            />
          </div>
          <div className="w-full">
            <ul className="flex justify-around list-none p-0 m-0">
              {itemHeads.map((item, keyIndex) => {
                return (
                  <li key={keyIndex} className="text-nsBlack1 font-semibold text-lg">
                    <LinksCustom href={item.href} nameLink={item.name} />
                    {item.activeLine && (
                      <div className="bg-nsWedgeWood1 w-full h-1 rounded-nsLg my-3"></div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AuthBoxItemComponent;
