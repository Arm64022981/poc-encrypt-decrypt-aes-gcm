// src\action\models\request
export interface UserRequestModel {
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  role2?: string;
}

export interface CreateUserRequestModel {
  userName: string;
  firstName: string;
  lastName: string;
  role: string;
  activeFlag: string;
  createdBy: string;
}

export interface UpdateUserRequestModel {
  copayUsId: number;
  userName?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  activeFlag?: string;
  updatedBy: string;
}
