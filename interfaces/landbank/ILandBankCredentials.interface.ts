interface ILandBankAddSingleAssignCredential {
  assignee: string;
}
interface ILandBankRemoveSingleAssignCredential {
  userId: string;
}
interface ILandBankCredentialAdd {
  username: string;
  password: string;
  communityCode: string;
}
interface ILandBankAssignmentUserId {
  deleted?: boolean;
  assignee?: ILandBankAssignee;
  credential?: ILandBankCredential;
  id?: string;
}

interface ILandBankAssignee {
  locked: number;
  deleted: boolean;
  role: string;
  isEmailVerified: boolean;
  name: string;
  email: string;
  id: string;
}

interface ILandBankCredential {
  username: string;
  communityCode: string;
  deleted: boolean;
  id: string;
}
export type {
  ILandBankAddSingleAssignCredential,
  ILandBankCredentialAdd,
  ILandBankAssignmentUserId,
  ILandBankRemoveSingleAssignCredential
};
