import React, { useState } from "react";
import ItemBoxCustomComponent from "../customs/ItemBoxCustom";
import { KeyboardArrowRightIcon, KeyboardArrowDownIcon } from "../mui/index";
import { IAccordionCustom, IAccordionItemCustom } from "../../interfaces/customs/ICustoms.interface";

const AccordionItemCustom = ({
  heading,
  content,
}: IAccordionItemCustom) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <li className="accordion-item my-5">
      <div className="accordion-toggle flex items-center ">
        <span
          className="mr-5 cursor-pointer"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </span>
        {heading}
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </li>
  );
};

const AccordionCustom = ({
  children,
  showOrHidden = true,
}: IAccordionCustom) => {
  return showOrHidden ? (
    <ItemBoxCustomComponent>
      <ul className="m-0 p-0 list-none">{children}</ul>
    </ItemBoxCustomComponent>
  ) : (
    <></>
  );
};

export { AccordionItemCustom, AccordionCustom };
