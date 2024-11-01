// src\action\models\response\account-management.ts
export interface CopayUser {
  copayUsId: number;
  userName: string;
  activeFlag: string;
  role: string;
  firstName: string;
  lastName: string;
  lastLogin?: string; // แปลง Date เป็น string ใน response
  createdDate: string;
  updatedDate?: string;
  createdBy: string;
  updatedBy?: string;
}

export interface UserResponseModel {
  status_code: number;
  status_message: string;
  data: CopayUser[];
}
