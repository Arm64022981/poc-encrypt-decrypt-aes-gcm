import { NextResponse } from 'next/server';
// import { TransactionReq } from '@/app/api/models/request/TransactionReq';
import { TransactionResponseModel, TransactionData } from '@/dto/response/TransactionResp';
import { Transactions } from '@/repository/copay-backoffice/action';
import logger from '@/utils/logger';

// export async function GET() {
//   try {
//     const transactions = await Transactions();
//     return NextResponse.json(transactions);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
//   }
// }
export async function GET() {
  try {
    // ดึงข้อมูลจาก body ของ request
    // const { search } = await request.json();

    // เรียกข้อมูล transactions
    logger.info('Fetching Account_Management data'); 
    const transactions = await Transactions();

    // กรองข้อมูลตาม search query ถ้ามี
    // const filteredTransactions = transactions.filter((transaction) =>
    //   JSON.stringify(transaction).toLowerCase().includes((search || '').toLowerCase())
    // );

    // แปลงข้อมูลจาก CopayPointDailyReport ให้ตรงกับ TransactionData
    const responseData: TransactionData[] = transactions.map(transaction => ({
      copayTsId: transaction.copayTsId || '',
      cardNo: transaction.cardNo || '',
      refTransactionId: transaction.refTransactionId || '',
      transactionType: transaction.transactionType || '',
      transactionDate: transaction.transactionDate instanceof Date
        ? transaction.transactionDate.toISOString().split('T')[0] // ใช้เฉพาะส่วนวันที่
        : '', // ใช้ค่าว่างหากไม่ใช่ Date
      points: transaction.points || 0,
      amount: transaction.amount || 0,
      revertRefTransactionId: transaction.revertRefTransactionId || '',
      revertStatus: transaction.revertStatus || '',
    }));
    // สร้าง response object ที่จะส่งกลับ
    const response: TransactionResponseModel = {
      status_code: 200,
      status_message: 'success',
      data: responseData
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching transactions:", error); // แสดงรายละเอียดข้อผิดพลาด
    const errorResponse: TransactionResponseModel = {
      status_code: 500,
      status_message: 'Failed to fetch transactions',
      data: [],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// export async function POST(request: Request) {
//   try {
//     // ดึงข้อมูลจาก body ของ request และแปลงให้ตรงตาม TransactionReq model
//     const body = await request.json() as TransactionReq;

//     // เรียกข้อมูล transactions จากระบบ
//     const transactions = await Transactions();

//     // กรองข้อมูล transactions ตามเงื่อนไขที่ระบุใน request
//     const filteredTransactions = transactions.filter((transaction) => {
//       const transactionDate = transaction.transactionDate ? new Date(transaction.transactionDate) : null;
//       const startDate = body.startDate ? new Date(body.startDate) : null;
//       const endDate = body.endDate ? new Date(body.endDate) : null;

//       return (
//         (!body.cardNo || transaction.cardNo?.toLowerCase().includes(body.cardNo.toLowerCase())) &&
//         (!body.refTransactionId || transaction.refTransactionId?.toLowerCase().includes(body.refTransactionId.toLowerCase())) &&
//         (!body.transactionType || transaction.transactionType?.toLowerCase() === body.transactionType.toLowerCase()) &&
//         (!startDate || (transactionDate && transactionDate >= startDate)) &&
//         (!endDate || (transactionDate && transactionDate <= endDate))
//       );
//     });

//     // ตรวจสอบว่าทุกรายการใน filteredTransactions มีค่า default ที่จำเป็นสำหรับ TransactionData
//     const responseData: TransactionData[] = filteredTransactions.map(transaction => ({
//       copayTsId: transaction.copayTsId || '',
//       cardNo: transaction.cardNo || '',
//       refTransactionId: transaction.refTransactionId || '',
//       transactionType: transaction.transactionType || '',
//       transactionDate: transaction.transactionDate ? transaction.transactionDate.toISOString() : '', // แปลงเป็น string
//       points: transaction.points || 0,
//       amount: transaction.amount || 0,
//       revertRefTransactionId: transaction.revertRefTransactionId || '',
//       revertStatus: transaction.revertStatus || '',
//     }));

//     // สร้าง response object ที่จะส่งกลับ
//     const response: TransactionResponseModel = {
//       status_code: 200,
//       status_message: 'success',
//       data: responseData
//     };

//     return NextResponse.json(response);
//   } catch (error) {
//     // จัดการข้อผิดพลาดและส่ง response ที่มี status code 500
//     const errorResponse: TransactionResponseModel = {
//       status_code: 500,
//       status_message: 'Failed to fetch transactions',
//       data: []
//     };
//     return NextResponse.json(errorResponse, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const transactions = await Transactions();
//     return NextResponse.json(transactions);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
//   }
// }
