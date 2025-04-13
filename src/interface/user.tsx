import { UserInfo } from "src/types";
import { Approle } from "src/types/roleType";

export interface userObj {}

export interface user {
  data: UserInfo | undefined;
  isLoggedIn: boolean;
  role: Approle | undefined;
}

export interface IChairman {
  fullName: string;
  email: string;
  phoneNumber: string;
  marketId: string;
  password: string;
  localGovernmentId: string;
}

export interface iChairmanEdit {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  localGovernmentId: string;
  profileImageUrl: string;
}

export interface UserRole {
  name: string;
  description: string;
  permissions: string[];
}
