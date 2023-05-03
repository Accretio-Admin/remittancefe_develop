import {
  EModulePush,
  ILogs,
} from "../interfaces/logs/ILogs.interface";
import { IUser } from "../interfaces/user/IUser.interface";
import { ApiService } from "./ApiService";
import { LocalStorageAuthService, LocalStorageUserLogger } from "./LocalStorageService";
import moment from "moment-timezone";

interface ILoggerService {
  before: any;
  after: any;
  nameModuleSelect: keyof typeof EModulePush;
}
const loggerService = async ({
  before,
  after,
  nameModuleSelect,
}: ILoggerService) => {
  let { changes } = (
    await ApiService()
      .logs()
      .getLogById(LocalStorageUserLogger().getLogger()?.id as string)
  ).data as ILogs;
  changes.push(handleConvertModulePush({ after, before, nameModuleSelect }));
  (
    await ApiService()
      .logs()
      .updateLog(LocalStorageUserLogger().getLogger()?.id as string, {
        changes,
      })
  ).data as ILogs;
};
const handleConvertModulePush = ({
  before,
  after,
  nameModuleSelect,
}: ILoggerService) => {
  const timeManila = moment.tz(Date.now(), "Asia/Manila");
  let stateCreator = {
    user:(LocalStorageAuthService().getUser() as IUser).user,
    after: {
      ...after,
      date: timeManila.format(),
    },
    before: {
      ...before,
      date: timeManila.format(),
    },
  };
  return {
    cTransaction: () => {
      stateCreator.after = after;
      stateCreator.before = before;
      return {
        cTransaction: stateCreator,
      };
    },
    cApiRateLimiter: () => {
      stateCreator.after = after;
      stateCreator.before = before;
      return {
        cApiRateLimiter: stateCreator,
      };
    },
    cRatesFeesManagement:()=>{
      stateCreator.after = after;
      stateCreator.before = before;
      return {
        cRatesFeesManagement: stateCreator,
      };
    }
  }[nameModuleSelect]();
};
const handleAutoDetectItemInterfaceAndSetModule = (data: Array<any>) => {
  if (data.length < 1) {
    return {
        data: [],
        typeModuleComponent: null,
      }
  }
  return destructuringModuleArray(data);
};
const destructuringModuleArray = (data: Array<any>) => {
  return data.map((item) => {
    const findModule = [Object.keys(item)[0]][0] as keyof typeof EModulePush;
    
    return {
      data: item[findModule],
      typeModuleComponent: findModule,
    };
  });
};
export { loggerService, handleAutoDetectItemInterfaceAndSetModule };
