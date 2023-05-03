interface IAuthBoxItem {
  children: JSX.Element;
  itemHeads: Array<{ name: string; activeLine: boolean; href: string }>;
  classWrapperOne?: string;
  classWrapperTwo?: string;
}

export type { IAuthBoxItem };
