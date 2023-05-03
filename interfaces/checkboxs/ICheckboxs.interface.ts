import { Colors } from "../../utils/colors";
import { CheckboxProps } from "../../components/mui/index";
interface CheckboxColorCustom {
  colorSvgCustom?: keyof typeof Colors;
}
interface mixCheckboxPropsCustomProps
  extends CheckboxProps,
    CheckboxColorCustom {}
export type { mixCheckboxPropsCustomProps };
