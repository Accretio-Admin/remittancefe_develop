import { IStyleInputVOne } from "../styled/IStyled.interface";
import { TextFieldProps } from "../../components/mui/index";
import { Colors } from "../../utils/colors";
import { fontSize } from "../../utils/font_size";
import { BoxShadows } from "../../utils/shadowsanddropshadows";
import { borderRadiusSize } from "../../utils/border_radius_size";
interface IInputVOneProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    IStyleInputVOne {}
interface InputColorCustom {
  colorInputCustom: keyof typeof Colors;
  bgColorCustom: keyof typeof Colors;
  fieldsetBorderColorCustom: keyof typeof Colors;
  placeholderColorCustom: keyof typeof Colors;
  focusedPlaceholderColorCustom: keyof typeof Colors;
  muiFocusedShadowCustom: keyof typeof BoxShadows;
}
interface InputSizeCustom {
  fontSizeCustom: keyof typeof fontSize;
  borderRadiusCustom: keyof typeof borderRadiusSize;
}

type mixInputPropsCustomProps = TextFieldProps &
  InputColorCustom &
  InputSizeCustom;
// TextFieldProps
interface IWrapperInput {
  children: JSX.Element;
  wrapperOne?: string;
}
export type { IInputVOneProps, mixInputPropsCustomProps, IWrapperInput };
