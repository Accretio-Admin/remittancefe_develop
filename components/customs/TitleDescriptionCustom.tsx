import React from "react";
import { ITitleDescriptionCustomComponent } from "../../interfaces/customs/ICustoms.interface";

const TitleDescriptionCustomComponent = ({
  title,
  description,
}: ITitleDescriptionCustomComponent) => {
  return (
    <>
      <p className="font-semibold m-0">{title}</p>
      <p className="text-nsGray1 m-0">{description}</p>
    </>
  );
};

export default TitleDescriptionCustomComponent;
