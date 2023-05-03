import { IDashboardHeadContent } from "../interfaces/customs/ICustoms.interface";
import { IListTabsRateLimits } from "../interfaces/other/IOther.interface";
import { ISharedSelectProject } from "../interfaces/shared/IShared.interface";
import { IUserAccessLevelSideBarDrawer } from "../interfaces/user/IUserAccessLevel.interface";

const itemsDrawerStatic: IUserAccessLevelSideBarDrawer[] = [
  {
    name: "Users",
    iconName: "PersonOutlineOutlined",
    nameTooltip: "Users",
    secretName: "secret_users",
    nameModule: "users",
    routeName: "/users",
    accessName: "users",
    disabled: false,
    subMenu: [],
  },
  {
    name: "Transactions",
    iconName: "WysiwygOutlined",
    nameTooltip: "Transactions",
    secretName: "secret_transactions_home",
    nameModule: "transactions_home",
    routeName: "/transactions",
    accessName: "transactions",
    disabled: false,
    subMenu: [
      {
        name: "Cash Pickup",
        iconName: "LocalConvenienceStoreOutlined",
        nameTooltip: "Cash Pickup",
        secretName: "secret_transactions_cash_pickup_home",
        nameModule: "transactions_cash_pickup_home",
        routeName: "/transactions/cash-pickup",
        accessName: "transactions_cash-pickup",
        disabled: false,
        subMenu: [],
      },
      {
        name: "Remittance",
        iconName: "AccountBalanceOutlined",
        nameTooltip: "Remittance",
        secretName: "secret_transactions_remittance_home",
        nameModule: "transactions_remittance_home",
        routeName: "/transactions/remittance",
        accessName: "transactions_remittance",
        disabled: false,
        subMenu: [],
      },
    ],
  },
  {
    name: "Logs",
    iconName: "SettingsAccessibilityOutlined",
    nameTooltip: "Logs",
    secretName: "secret_logs",
    nameModule: "logs",
    routeName: "/logs",
    accessName: "logs",
    disabled: false,
    subMenu: [],
  },
  {
    name: "Sms Panel",
    iconName: "SmsOutlined",
    nameTooltip: "Sms Panel",
    secretName: "secret_sms_panel",
    nameModule: "sms_panel",
    routeName: "/sms-panel",
    accessName: "smspanel",
    disabled: true,
    subMenu: [],
  },
  {
    name: "Configs",
    iconName: "SettingsOutlined",
    nameTooltip: "Configs",
    secretName: "secret_configs",
    nameModule: "configs",
    routeName: "/configs",
    accessName: "configs",
    disabled: false,
    subMenu: [
      {
        name: "Transaction",
        iconName: "WysiwygOutlined",
        nameTooltip: "Transaction",
        secretName: "secret_configs_transaction_home",
        nameModule: "transaction_configs_home",
        routeName: "/configs/transaction",
        accessName: "configs_transaction",
        disabled: false,
        subMenu: [],
      },
      {
        name: "Api Rate Limiter",
        iconName: "AbcOutlined",
        nameTooltip: "Api Rate Limiter",
        secretName: "secret_configs_api_rate_limiter_home",
        nameModule: "api_rate_limiter_configs_home",
        routeName: "/configs/api-rate-limiter",
        accessName: "configs_api_rate_limiter",
        disabled: false,
        subMenu: [],
      },
      {
        name: "Region Limiter",
        iconName: "AcUnitRounded",
        nameTooltip: "Region limiter",
        secretName: "secret_configs_region_limiter_home",
        nameModule: "region_limiter_configs_home",
        routeName: "/configs/region-limiter",
        accessName: "configs_region_limiter",
        disabled: false,
        subMenu: [],
      },
      {
        name: "Rates Fees Management",
        iconName: "AccessTimeOutlined",
        nameTooltip: "Rates Fees Management",
        secretName: "secret_configs_rates_fees_management_home",
        nameModule: "rates_fees_management_configs_home",
        routeName: "/configs/rates-fees-management",
        accessName: "configs_rates_fees_management",
        disabled: false,
        subMenu: [],
      },
      {
        name: "Api Groups",
        iconName: "AddToQueueOutlined",
        nameTooltip: "Api Groups",
        secretName: "secret_configs_api_groups_home",
        nameModule: "api_groups_configs_home",
        routeName: "/configs/api-groups-management",
        accessName: "configs_api_groups",
        disabled: false,
        subMenu: [],
      },
    ],
  },
];
const listTabsRateLimits: IListTabsRateLimits[] = [
  {
    label: "Regions",
    number: 0,
  },
];
const listProjectFake: ISharedSelectProject[] = [
  {
    nameProject: "Remittance",
    nameSecret: "remittance",
    active: true,
  },
  {
    nameProject: "Bayed Center",
    nameSecret: "bayed_center",
    active: false,
  },
];
const routesAndTitleDescriptionNav: IDashboardHeadContent[] = [
  {
    nameRoute: "/dashboard",
    title: "Dashboard",
    description: "",
  },
  {
    nameRoute: "/dashboard/users",
    title: "User Management",
    description: "Fake test for text to description",
  },
  {
    nameRoute: "/dashboard/logs",
    title: "Logs",
    description: "Logs Management",
  },
  {
    nameRoute: "/dashboard/rate-limiter",
    title: "Rate Limiter",
    description: "Rate Limiter & Location Management",
  },
  {
    nameRoute: "/dashboard/transactions",
    title: "Transactions",
    description: "Transactions",
  },
  {
    nameRoute: "/dashboard/create/add-admin",
    title: "Add New User",
    description: "",
  },
  {
    nameRoute: "/dashboard/users/[id]",
    title: "Edit User",
    description: "Dashboard Edit User",
  },
  {
    nameRoute: "/dashboard/configs",
    title: "Config",
    description: "Config",
  },
  {
    nameRoute: "/dashboard/configs/transaction",
    title: "Transaction Config",
    description: "This config will affect all users from the moment it updated onwards.",
  },
  {
    nameRoute: "/dashboard/transactions/cash-pickup",
    title: "Transactions cash pickup",
    description: "Transactions cash pickup",
  },
  {
    nameRoute: "/dashboard/transactions/remittance",
    title: "Transactions remittance",
    description: "Transactions remittance",
  },
  {
    nameRoute: "/dashboard/configs/api-rate-limiter",
    title: "Api Rate Limiter Config",
    description: "Per call limitation affecting all users once updated",
  },
  {
    nameRoute: "/dashboard/configs/region-limiter",
    title: "Region Limiter Config",
    description: "Limit user's region for signup. Affecting all users once updated  ",
  },
  {
    nameRoute: "/dashboard/configs/rates-fees-management",
    title: "Rates Fees Management Config",
    description: "Company Admin commission rate",
  },
  {
    nameRoute: "/dashboard/configs/api-groups-management",
    title: "Api Groups Management",
    description: "Group of assignable API endpoints to each Agent",
  },
  
];

export {
  itemsDrawerStatic,
  listTabsRateLimits,
  listProjectFake,
  routesAndTitleDescriptionNav,
};
