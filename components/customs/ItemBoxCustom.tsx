import React from "react";
import { IItemBoxCustomComponent } from "../../interfaces/customs/ICustoms.interface";
import { Colors } from "../../utils/colors";

const ItemBoxCustomComponent = ({
  children,
  bgColorParentFirst = "nsWhite1",
}: IItemBoxCustomComponent) => {
  return (
    <div
      style={{ backgroundColor: Colors[bgColorParentFirst] }}
      className="p-4 my-5 rounded-nsBase w-full border border-solid border-nsSilver2"
    >
      {children}
    </div>
  );
};

export default ItemBoxCustomComponent;
