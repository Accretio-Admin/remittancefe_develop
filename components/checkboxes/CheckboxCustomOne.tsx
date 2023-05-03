import { mixCheckboxPropsCustomProps } from "../../interfaces/checkboxs/ICheckboxs.interface";
import { Colors } from "../../utils/colors";
import { Checkbox, styled } from "../mui/index";

const CheckboxStyled = styled(Checkbox)<mixCheckboxPropsCustomProps>(
  ({ ...props }) => ({
    "& .MuiSvgIcon-root": {
      color: Colors[props.colorSvgCustom as keyof typeof Colors],
    },
  })
);
const CheckboxCustomOne = ({ ...props }: mixCheckboxPropsCustomProps) => {
  return <CheckboxStyled {...props} />;
};

export default CheckboxCustomOne;
