import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { mixInputPropsCustomProps } from "../../interfaces/inputs/IInput.interface";
import { borderRadiusSize } from "../../utils/border_radius_size";
import { Colors } from "../../utils/colors";
import { fontSize } from "../../utils/font_size";
import { BoxShadows } from "../../utils/shadowsanddropshadows";
import { styled, TextField } from "../mui";
import { MuiThemeInput } from "../mui/MuiTheme";

const TextFieldStyled = styled(TextField)<mixInputPropsCustomProps>(
  ({ ...props }) => ({
    margin: 0,
    "& .MuiOutlinedInput-root": {
      borderRadius:
        borderRadiusSize[
          props.borderRadiusCustom as keyof typeof borderRadiusSize
        ],
      color: Colors[props.colorInputCustom as keyof typeof Colors],
      backgroundColor: Colors[props.bgColorCustom as keyof typeof Colors],
      fontSize: fontSize[props.fontSizeCustom as keyof typeof fontSize],
      fontWeight: "500",
      "& fieldset": {
        borderColor:
          Colors[props.fieldsetBorderColorCustom as keyof typeof Colors],
      },
      "& ::placeholder": {
        color: Colors[props.placeholderColorCustom as keyof typeof Colors],
        opacity: 1,
      },
      "&.Mui-focused ::placeholder": {
        color:
          Colors[props.focusedPlaceholderColorCustom as keyof typeof Colors],
        opacity: 1,
      },
      "&.Mui-focused": {
        boxShadow:
          BoxShadows[props.muiFocusedShadowCustom as keyof typeof BoxShadows],
      },
    },
  })
);
const InputCustomOne = ({
  margin = "dense",
  ...props
}: mixInputPropsCustomProps) => {
  return (
    <ThemeProvider theme={MuiThemeInput}>
      <TextFieldStyled margin={margin} {...props} />
    </ThemeProvider>
  );
};

export default InputCustomOne;
