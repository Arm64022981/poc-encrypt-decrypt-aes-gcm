// import { DataSource } from 'typeorm';
// import { CopayUser } from './models'; // นำเข้าโมเดลที่ต้องการ
// import {
//   DATABASE_USERNAME,
//   DATABASE_PASSWORD,
//   DATABASE_HOST,
//   DATABASE_SCHEMA,
//   DATABASE_PORT,   // เพิ่มการนำเข้า DATABASE_PORT
//   DATABASE_TYPE    // เพิ่มการนำเข้า DATABASE_TYPE
// } from '../../settings/configs';

// // ถอดรหัสรหัสผ่านที่ถูกเข้ารหัส
// const decodedPassword = decodeURIComponent(DATABASE_PASSWORD);

// export const AppDataSource = new DataSource({
//   type: DATABASE_TYPE as 'mssql' | 'postgres', // ใช้ DATABASE_TYPE จาก .env
//   host: DATABASE_HOST,
//   port: DATABASE_PORT ? parseInt(DATABASE_PORT, 10) : 1433, // ใช้ DATABASE_PORT หากมี หรือค่าเริ่มต้นเป็น 1433 สำหรับ mssql
//   username: DATABASE_USERNAME,
//   password: decodedPassword,
//   database: DATABASE_SCHEMA,
//   synchronize: false, 
//   entities: [CopayUser],
//   logging: true,
//   extra: {
//     options: {
//       enableArithAbort: true,
//       trustServerCertificate: true,
//     },
//   },
//   pool: {
//     max: 10, 
//     min: 0,
//     acquireTimeoutMillis: 30000,
//     idleTimeoutMillis: 30000,
//   },
// });

// // การเชื่อมต่อกับฐานข้อมูล
// AppDataSource.initialize()
//   .then(() => {
//     console.log('Database connected');
//   })
//   .catch((error) => console.log('Database connection error:', error));
import { DataSource } from 'typeorm';
import { CopayUser, CopayPointDailyReport } from './entity'; // นำเข้าโมเดลที่ต้องการ
import {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_TYPE,
  DATABASE_NAME, 
} from '../../settings/configs';

// ถอดรหัสรหัสผ่านที่ถูกเข้ารหัส
const decodedPassword = decodeURIComponent(DATABASE_PASSWORD);

export const AppDataSource = new DataSource({
  type: DATABASE_TYPE as 'postgres', 
  host: DATABASE_HOST,
  port: DATABASE_PORT ? parseInt(DATABASE_PORT, 10) : 5432, 
  username: DATABASE_USERNAME,
  password: decodedPassword,
  database: DATABASE_NAME,
  synchronize: false, 
  entities: [CopayUser ,CopayPointDailyReport],
  logging: true,
  extra: {
    ssl: false, // ถ้า PostgreSQL Server ต้องการ SSL ให้เปลี่ยนเป็น true
  },
});

// การเชื่อมต่อกับฐานข้อมูล
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => console.log('Database connection error:', error));
