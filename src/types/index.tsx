export type ApiResponse = {
  data: apiData;
  status: boolean;
  message: string;
  isSuccessful: boolean;
  error: {
    message: string;
    statusCode: number;
    type: string;
    stackTrace: string | null;
    errors: unknown | null;
  };
};
export interface apiData {
  message: string;
  data: AuthData;
  isSuccessful: boolean;
  status: boolean;
}
export type UserInfo = {
  userId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber?: string;
  lastLoginAt: string;
  profileImageUrl: string;
  additionalDetails: Record<string, unknown>;
};

export type AuthData = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresAt: string;
  userInfo: UserInfo;
};

export type IWaivedAddTeamMate = {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
};
