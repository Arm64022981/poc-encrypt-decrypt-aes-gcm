'use server';
// src\action\services\co-pay-back-office
import {  CopayPointDailyReport } from '@/repository/copay-backoffice/entity';
import { Transactions,  } from '@/repository/copay-backoffice/action';
function toPlainObject<T>(instance: T): T {
    return JSON.parse(JSON.stringify(instance));
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