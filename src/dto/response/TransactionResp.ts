export interface TransactionData {
  copayTsId: string;
  cardNo: string;
  refTransactionId: string;
  transactionType: string;
  transactionDate: string; // แก้จาก Date เป็น string
  points: number;
  amount: number;
  revertRefTransactionId: string;
  revertStatus: string;
}


export interface TransactionResponseModel {
  status_code: number;
  status_message: string;
  data: TransactionData[]; 
}