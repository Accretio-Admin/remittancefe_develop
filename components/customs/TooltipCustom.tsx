import React from "react";
import { TooltipProps, Tooltip } from "../mui/index";
const TooltipCustomComponent = ({ ...props }: TooltipProps) => {
  return <Tooltip arrow {...props}>{props.children}</Tooltip>;
};

export default TooltipCustomComponent;
