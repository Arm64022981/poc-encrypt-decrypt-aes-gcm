import { getDbConnection } from '../db_connection'; 
import { CopayPointDailyReport } from '../entity'; 

export const Transactions = async () => {
  try {
    const users = await getDbConnection(async (manager) => {
      return manager.find(CopayPointDailyReport);
    });

    return users; 
  } catch (error) {
    console.error('Error in Transactions function:', error);
    throw error; 
  }
};
