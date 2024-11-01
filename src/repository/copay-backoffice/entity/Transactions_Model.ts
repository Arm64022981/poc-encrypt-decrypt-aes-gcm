import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "copay_point_daily_report" }) 
export class CopayPointDailyReport {
  
  @PrimaryColumn({ name: "copay_ts_id", type: "varchar", length: 60 }) 
  copayTsId!: string;

  @Column({ name: "card_no", type: "varchar", length: 16, nullable: true })
  cardNo?: string;

  @Column({ name: "ref_transaction_id", type: "varchar", length: 50, nullable: true })
  refTransactionId?: string;

  @Column({ name: "transaction_type", type: "varchar", length: 10, nullable: true })
  transactionType?: string;

  @Column({ name: "transaction_date", type: "date", nullable: true })
  transactionDate?: Date;

  @Column({ name: "points", type: "int", nullable: true })
  points?: number;

  @Column({ name: "amount", type: "int", nullable: true })
  amount?: number;

  @Column({ name: "revert_ref_transaction_id", type: "varchar", length: 50, nullable: true })
  revertRefTransactionId?: string;

  @Column({ name: "revert_status", type: "varchar", length: 1, nullable: true })
  revertStatus?: string;
}
// mysql
// @Entity({ name: "COPAY_POINT_DAILY_REPORT" }) // ระบุชื่อตารางให้ตรงกับฐานข้อมูล
// export class CopayPointDailyReport {
  
//   @PrimaryColumn({ name: "COPAY_TS_ID", type: "varchar", length: 60 }) // ระบุชื่อคอลัมน์ให้ตรงกับฐานข้อมูล
//   copayTsId!: string;

//   @Column({ name: "CARD_NO", type: "varchar", length: 16, nullable: true })
//   cardNo?: string;

//   @Column({ name: "REF_TRANSACTION_ID", type: "varchar", length: 50, nullable: true })
//   refTransactionId?: string;

//   @Column({ name: "TRANSACTION_TYPE", type: "varchar", length: 10, nullable: true })
//   transactionType?: string;

//   @Column({ name: "TRANSACTION_DATE", type: "date", nullable: true })
//   transactionDate?: Date;

//   @Column({ name: "POINTS", type: "int", nullable: true })
//   points?: number;

//   @Column({ name: "AMOUNT", type: "int", nullable: true })
//   amount?: number;

//   @Column({ name: "REVERT_REF_TRANSACTION_ID", type: "varchar", length: 50, nullable: true })
//   revertRefTransactionId?: string;

//   @Column({ name: "REVERT_STATUS", type: "varchar", length: 1, nullable: true })
//   revertStatus?: string;
// }

