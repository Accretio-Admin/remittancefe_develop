import React from "react";
import { IItemBoxTitleAnDescriptionAndLabelCustomComponent } from "../../interfaces/customs/ICustoms.interface";
import ItemBoxCustomComponent from "./ItemBoxCustom";
import TitleDescriptionCustomComponent from "./TitleDescriptionCustom";

const ItemBoxTitleAnDescriptionAndLabelCustomComponent = ({
  children,
  description,
  nameLabel,
  title,
  bgColorParentFirst,
}: IItemBoxTitleAnDescriptionAndLabelCustomComponent) => {
  return (
    <div className="py-5">
      <TitleDescriptionCustomComponent
        title={title}
        description={description}
      />
      <ItemBoxCustomComponent bgColorParentFirst={bgColorParentFirst}>
        <div>
          <p className="m-0 py-2 font-bold">{nameLabel}</p>
          {children}
        </div>
      </ItemBoxCustomComponent>
    </div>
  );
};

export default ItemBoxTitleAnDescriptionAndLabelCustomComponent;
