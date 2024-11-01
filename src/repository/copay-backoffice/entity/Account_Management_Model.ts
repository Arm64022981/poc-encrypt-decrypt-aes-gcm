import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "copay_user" }) // Match the table name in your database
export class CopayUser {
  @PrimaryGeneratedColumn({ name: "copay_us_id" }) // Column name should be lowercase and match exactly
  copayUsId!: number;

  @Column({ name: "user_name", type: "varchar", length: 255 })
  userName: string = '';

  @Column({ name: "active_flag", type: "varchar", length: 1 })
  activeFlag: string = '';

  @Column({ name: "role", type: "varchar", length: 10 })
  role: string = '';

  @Column({ name: "first_name", type: "varchar", length: 255 })
  firstName: string = '';

  @Column({ name: "last_name", type: "varchar", length: 255 })
  lastName: string = '';

  @Column({ name: "last_login", type: "timestamp", nullable: true })
  lastLogin?: Date;

  @Column({ name: "created_date", type: "timestamp", nullable: false })
  createdDate: Date = new Date();

  @Column({ name: "updated_date", type: "timestamp", nullable: true })
  updatedDate?: Date;

  @Column({ name: "created_by", type: "varchar", length: 255, nullable: false })
  createdBy: string = '';

  @Column({ name: "updated_by", type: "varchar", length: 255, nullable: true })
  updatedBy?: string;
}
