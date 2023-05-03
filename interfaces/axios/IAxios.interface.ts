interface IErrorRes {
  code: number;
  message: string;
}
interface IRegister {
  name: string;
  email: string;
  password: string;
}
interface ILogin {
  email: string;
  password: string;
}
interface IRefreshToken {
  refreshToken: string;
}
interface IResetPassword {
  token: string;
  password: string;
}

enum ERole {
  "agent" = "agent",
  "companyadmin" = "companyadmin",
  "admin" = "admin",
  "superadmin" = "superadmin",
  "initialsuperadmin" = "initialsuperadmin",
}
enum ERoleReadable {
  "agent" = "Agent",
  "companyadmin" = "Company Admin",
  "admin" = "Admin",
  "superadmin" = "Super Admin",
  "initialsuperadmin" = "Initial Super Admin",
}

interface IRoles {
  role: keyof typeof ERole;
}
export type {
  IRegister,
  ILogin,
  IRefreshToken,
  IResetPassword,
  IErrorRes,
  IRoles,
};

export { ERole, ERoleReadable };
