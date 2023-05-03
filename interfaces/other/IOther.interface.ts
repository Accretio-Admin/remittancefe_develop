

interface IChildrenProps {
  children: JSX.Element;
}

interface IEyeIconInputComponent {
  showOrHidden: boolean;
  onClick: () => void;
}


interface IListTabsRateLimits {
  label: string;
  number: number;
}
interface ILogoAndName {
  nameTagP: string;
  href: string;
}
export type {
  IChildrenProps,
  IEyeIconInputComponent,
  IListTabsRateLimits,
  ILogoAndName,
};
