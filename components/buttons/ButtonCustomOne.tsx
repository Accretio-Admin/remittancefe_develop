import { mixButtonPropsCustomProps } from "../../interfaces/buttons/IButtons.interface";
import { borderRadiusSize } from "../../utils/border_radius_size";
import { Colors } from "../../utils/colors";
import { heightSize } from "../../utils/heightsize";
import { BoxShadows, DropShadows } from "../../utils/shadowsanddropshadows";
import { Button, styled } from "../mui/index";

const ButtonStyled = styled(Button)<mixButtonPropsCustomProps>(
  ({ ...props }) => ({
    color: Colors[props.colorTextCustom as keyof typeof Colors],
    backgroundColor: Colors[props.bgColorCustom as keyof typeof Colors],
    borderRadius:
      borderRadiusSize[props.sizeBorderRadius as keyof typeof borderRadiusSize],
    filter: DropShadows[props.dropShadowCustom as keyof typeof DropShadows],
    height: heightSize[props.sizeHeight as keyof typeof heightSize],
    boxShadow: BoxShadows[props.boxShadowCustom as keyof typeof BoxShadows],
    "&:hover": {
      backgroundColor: Colors[props.bgColorCustom as keyof typeof Colors],
    },
    "&:disabled": {
      color: Colors[props.colorTextCustom as keyof typeof Colors],
      backgroundColor: Colors[props.bgColorCustom as keyof typeof Colors],
      opacity: props.disabledOpacityValue,
    },
  })
);
const ButtonCustomOne = ({ children, ...props }: mixButtonPropsCustomProps) => {
  return <ButtonStyled disabledOpacityValue="0.2" {...props}>{children}</ButtonStyled>;
};

export default ButtonCustomOne;
