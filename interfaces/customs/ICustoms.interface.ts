import { MuiIcons, SvgIconProps } from "../../components/mui";
import { Colors } from "../../utils/colors";

interface ILinkCustom {
  href: string;
  prefetch?: boolean;
  nameLink: string | JSX.Element;
}
interface IModalCustom {
  onClickCancel: (value: boolean) => void;
  onClickAccept: (value: boolean) => void;
  handleOpenModalValue: boolean;
  nameBtnCancel: string;
  nameBtnAccept: string;
  titleModal: string;
  descriptionModal: string;
  bgColorBtnCancel?: keyof typeof Colors;
  bgColorBtnAccept?: keyof typeof Colors;
  classTitle?: string;
  classDescription?: string;
}
enum ESorting {
  asc = "asc",
  desc = "desc",
}
interface ITitleDescriptionCustomComponent {
  title: string;
  description: string;
}
interface IItemBoxCustomComponent {
  children: JSX.Element;
  bgColorParentFirst?: keyof typeof Colors;
}
interface IItemBoxTitleAnDescriptionAndLabelCustomComponent
  extends ITitleDescriptionCustomComponent,
    IItemBoxCustomComponent {
  nameLabel: string;
}
interface IDashboardHeadContent {
  title: string;
  description: string;
  nameRoute: string;
}
interface IAccordionItemCustom {
  heading: JSX.Element;
  content: JSX.Element;
}
interface IAccordionCustom {
  children: JSX.Element;
  showOrHidden?: boolean;
}
interface IConvertStringSortTableApi {
  field: string;
  sort: keyof typeof ESorting;
  name: string;
}
interface IIconDynamicMuiCustom {
  iconName: keyof typeof MuiIcons;
  svgIconPropsCustom?: SvgIconProps;
}
export type {
  ILinkCustom,
  IModalCustom,
  IConvertStringSortTableApi,
  IDashboardHeadContent,
  IItemBoxCustomComponent,
  ITitleDescriptionCustomComponent,
  IIconDynamicMuiCustom,
  IItemBoxTitleAnDescriptionAndLabelCustomComponent,
  IAccordionItemCustom,
  IAccordionCustom
};
export { ESorting };
