import { ILogs, IUpdateLogs } from "../interfaces/logs/ILogs.interface";
import moment from "moment-timezone";
export const LocalStorageUserLogger = () => {
  const setLogger = (data: ILogs) => {
    localStorage.setItem("logger", JSON.stringify(data));
  };
  const getLogger = () => {
    let notLoggerPars = localStorage.getItem("logger");
    if (typeof notLoggerPars === "string") {
      return JSON.parse(notLoggerPars) as ILogs;
    }
  };
  const removeLogger = () => localStorage.removeItem("logger");
  const updateLogger = (data: IUpdateLogs) => {
    setLogger({ ...(getLogger() as ILogs), ...data });
    return getLogger();
  };
  const getCalculateExitUserLog = (): IUpdateLogs => {
    const endManila = moment.tz(Date.now(), "Asia/Manila");
    const startNew = new Date(
      LocalStorageUserLogger().getLogger()?.enterTime as string
    );
    const duration = endManila.diff(startNew);
    return {
      duration: duration,
      exitDate: new Date().toISOString(),
      exitTime: new Date().toISOString(),
    };
  };
  return {
    setLogger,
    getLogger,
    removeLogger,
    getCalculateExitUserLog,
    updateLogger,
  };
};
