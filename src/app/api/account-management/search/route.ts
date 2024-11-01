import { NextResponse } from 'next/server';
import { Account_Management } from '@/repository/copay-backoffice/action';
import { UserRequestModel } from '@/dto/request/account-managementReq';
import { UserResponseModel, CopayUser } from '@/dto/response/account-managementResp';
import logger from '@/utils/logger';

export async function POST(req: Request) {
  try {
    logger.info('Fetching Account_Management data');

    const requestBody = await req.json();
    const requestParams: UserRequestModel = {
      username: requestBody.username || '',
      firstName: requestBody.firstName || '',
      lastName: requestBody.lastName || '',
      role: requestBody.role || '',
    };

    const AccountManagement = await Account_Management(requestParams);

    // ใช้ประเภท CopayUser โดยตรงสำหรับ data
    const response: UserResponseModel = {
      status_code: 200,
      status_message: 'Data fetched successfully',
      data: AccountManagement.map((user): CopayUser => ({
        copayUsId: user.copayUsId,
        userName: user.userName,
        activeFlag: user.activeFlag,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        lastLogin: user.lastLogin ? user.lastLogin.toISOString() : undefined, // เปลี่ยนจาก null เป็น undefined
        createdDate: user.createdDate.toISOString(),
        updatedDate: user.updatedDate ? user.updatedDate.toISOString() : undefined, // เปลี่ยนจาก null เป็น undefined
        createdBy: user.createdBy,
        updatedBy: user.updatedBy,
      })),
    };

    logger.info('Successfully fetched Account_Management data');
    return NextResponse.json(response);
  } catch (error) {
    logger.error(`Failed to fetch Account_Management: ${error instanceof Error ? error.message : 'Unknown error'}`);

    const errorResponse: UserResponseModel = {
      status_code: 500,
      status_message: 'Failed to fetch Account_Management data',
      data: [],
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
