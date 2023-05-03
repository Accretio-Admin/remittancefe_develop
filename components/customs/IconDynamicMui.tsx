import { IIconDynamicMuiCustom } from "../../interfaces/customs/ICustoms.interface";
import { MuiIcons } from "../mui";

const IconDynamicMuiCustom = ({
  iconName,
  svgIconPropsCustom,
}: IIconDynamicMuiCustom) => {
  const IconName = MuiIcons[iconName];
  return <IconName {...svgIconPropsCustom} />;
};
export default IconDynamicMuiCustom;
