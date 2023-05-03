import React from "react";
import { useAppSelector } from "../../redux/hook";
import { Backdrop } from "../mui/index";
import styled from "../../styles/loadingCustomFullPage.module.scss";
const LoadingFullPageBackDrop = () => {
  const { active, colorBackDrop } = useAppSelector(
    (state) => state.loading_full_page
  );
  return (
    <Backdrop
      sx={{
        color: colorBackDrop,
        zIndex: (theme) => theme.zIndex.drawer + 9999,
      }}
      open={active}
    >
      <svg
        className={styled["spinner"]}
        width="65px"
        height="65px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styled["path"]}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
    </Backdrop>
  );
};

export default LoadingFullPageBackDrop;
