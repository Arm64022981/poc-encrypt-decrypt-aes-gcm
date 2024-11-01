'use server';
// src\action\services\co-pay-back-office
import { CopayUser, CopayPointDailyReport } from '@/repository/copay-backoffice/entity';
import { Transactions,Account_Management, createUser as createUserAction, updateUser as updateUserAction, deleteUser as deleteUserAction } from '@/repository/copay-backoffice/action';
import { UserRequestModel, CreateUserRequestModel, UpdateUserRequestModel } from '../../dto/request/account-managementReq';


function toPlainObject<T>(instance: T): T {
  return JSON.parse(JSON.stringify(instance));
}

export async function getAllUsers(params: UserRequestModel = {}): Promise<CopayUser[]> {
  try {
    const users = await Account_Management(params);
    return users.map(user => toPlainObject(user));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function createUser(params: CreateUserRequestModel): Promise<CopayUser> {
  try {
    const newUser = await createUserAction(params);
    return toPlainObject(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserRequestModel): Promise<CopayUser> {
  try {
    const updatedUser = await updateUserAction(params);
    return toPlainObject(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function deleteUser(userId: number): Promise<void> {
  try {
    await deleteUserAction(userId);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function getAllTransactions(): Promise<CopayPointDailyReport[]> { 
  try {
    const transactions = await Transactions();
    return transactions.map(transaction => toPlainObject(transaction));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}