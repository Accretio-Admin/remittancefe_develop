import { Colors } from "../../utils/colors";
import { ButtonProps, IconButtonProps } from "../../components/mui/index";
import { BoxShadows, DropShadows } from "../../utils/shadowsanddropshadows";
import { heightSize } from "../../utils/heightsize";
import { borderRadiusSize } from "../../utils/border_radius_size";
interface IButtonVOneProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
interface ButtonColorCustom {
  colorTextCustom?: keyof typeof Colors;
  bgColorCustom?: keyof typeof Colors;
  dropShadowCustom?: keyof typeof DropShadows;
  boxShadowCustom?: keyof typeof BoxShadows;
}
interface ButtonSize {
  sizeHeight?: keyof typeof heightSize;
  sizeBorderRadius?: keyof typeof borderRadiusSize;
  disabledOpacityValue?: string;
}
interface IconButtonColorCustom {
  colorIconCustom?: keyof typeof Colors;
  bgColorCustom?: keyof typeof Colors;
  hoverBgColorCustom?: keyof typeof Colors;
  boxShadowCustom?: keyof typeof BoxShadows;
}
interface mixButtonPropsCustomProps
  extends ButtonProps,
    ButtonColorCustom,
    ButtonSize {}
interface mixIconButtonPropsCustomProps
  extends IconButtonProps,
    IconButtonColorCustom,
    ButtonSize {}

export type {
  IButtonVOneProps,
  mixButtonPropsCustomProps,
  mixIconButtonPropsCustomProps,
};
