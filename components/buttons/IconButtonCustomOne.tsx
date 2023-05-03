import { mixIconButtonPropsCustomProps } from "../../interfaces/buttons/IButtons.interface";
import { borderRadiusSize } from "../../utils/border_radius_size";
import { Colors } from "../../utils/colors";
import { heightSize } from "../../utils/heightsize";
import { BoxShadows } from "../../utils/shadowsanddropshadows";
import { IconButton, styled } from "../mui/index";

const IconButtonStyled = styled(IconButton)<mixIconButtonPropsCustomProps>(
  ({ ...props }) => ({
    color: Colors[props.colorIconCustom as keyof typeof Colors],
    boxShadow: BoxShadows[props.boxShadowCustom as keyof typeof BoxShadows],
    backgroundColor: Colors[props.bgColorCustom as keyof typeof Colors],
    height: heightSize[props.sizeHeight as keyof typeof heightSize],
    borderRadius:
      borderRadiusSize[props.sizeBorderRadius as keyof typeof borderRadiusSize],
    "&:hover": {
      backgroundColor: Colors[props.hoverBgColorCustom as keyof typeof Colors],
    },
  })
);
const IconButtonCustomOne = ({
  children,
  ...props
}: mixIconButtonPropsCustomProps) => {
  return <IconButtonStyled {...props}>{children}</IconButtonStyled>;
};

export default IconButtonCustomOne;
