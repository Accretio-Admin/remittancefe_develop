interface ITabPanelRateLimiterProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface IRateLimiterRegionItem {
  countryCode: string;
  id: string;
  flag: string;
  onClickForRemoveRegion?: () => void;
}
interface IRateLimiterAddRegion {
  countryCode: string;
  flag: string;
}
type IRateLimiterRegionSelectValue = {
  label: string;
  value: string;
  icon: string;
};
interface IRegionRestCountries {
  alpha2Code: string;
  flags: Flags;
  independent: boolean;
}
interface Flags {
  svg: string;
  png: string;
}
interface IRateLimierRegionsList {
  results: IRateLimierResult[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

interface IRateLimierResult {
  countryCode: string;
  deleted: boolean;
  flag: string;
  id: string;
}

export type {
  ITabPanelRateLimiterProps,
  IRateLimiterRegionItem,
  IRegionRestCountries,
  IRateLimiterAddRegion,
  IRateLimierRegionsList,
  IRateLimierResult,
  IRateLimiterRegionSelectValue
};
