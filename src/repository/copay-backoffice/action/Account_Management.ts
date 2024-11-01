import { getDbConnection } from '../db_connection';
import { CopayUser } from '../entity';
import { Like } from 'typeorm';


interface CreateUserParams {
  userName: string;
  firstName: string;
  lastName: string;
  role: string;
  activeFlag: string;
  createdBy: string;
}

interface UpdateUserParams {
  copayUsId: number;
  userName?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  activeFlag?: string;
  updatedBy: string;
}


interface SearchParams {
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  page?: number;
  pageSize?: number;
  sort?: { field: keyof CopayUser; order: 'ASC' | 'DESC' };
}

export const Account_Management = async (params: SearchParams) => {
  const page = params.page || 1; // ค่าเริ่มต้นหน้าคือ 1
  const pageSize = params.pageSize || 10; // ค่าเริ่มต้นจำนวนรายการต่อหน้าคือ 10
  const skip = (page - 1) * pageSize;
  const order = params.sort ? { [params.sort.field]: params.sort.order } : undefined;

  try {
    const users = await getDbConnection(async (manager) => {
      return manager.find(CopayUser, {
        where: {
          userName: params.username ? Like(`%${params.username}%`) : undefined,
          firstName: params.firstName ? Like(`%${params.firstName}%`) : undefined,
          lastName: params.lastName ? Like(`%${params.lastName}%`) : undefined,
          role: params.role || undefined,
        },
        skip,
        take: pageSize,
        order,
      });
    });

    return users;
  } catch (error) {
    console.error('Error in Account_Management function:', error);
    throw error;
  }
};


export const createUser = async (params: CreateUserParams) => {
  try {
    const user = new CopayUser();
    user.userName = params.userName;
    user.firstName = params.firstName;
    user.lastName = params.lastName;
    user.role = params.role;
    user.activeFlag = params.activeFlag;
    user.createdBy = params.createdBy;
    user.createdDate = new Date();

    const savedUser = await getDbConnection(async (manager) => {
      return manager.save(user);
    });

    return savedUser;
  } catch (error) {
    console.error('Error in createUser function:', error);
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const result = await getDbConnection(async (manager) => {
      return manager.delete(CopayUser, userId);
    });

    return result;
  } catch (error) {
    console.error('Error in deleteUser function:', error);
    throw error;
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    const result = await getDbConnection(async (manager) => {
      const user = await manager.findOne(CopayUser, { where: { copayUsId: params.copayUsId } });
      if (!user) {
        throw new Error(`User with ID ${params.copayUsId} not found`);
      }

      user.userName = params.userName ?? user.userName;
      user.firstName = params.firstName ?? user.firstName;
      user.lastName = params.lastName ?? user.lastName;
      user.role = params.role ?? user.role;
      user.activeFlag = params.activeFlag ?? user.activeFlag;
      user.updatedBy = params.updatedBy;
      user.updatedDate = new Date();

      return manager.save(user);
    });

    return result;
  } catch (error) {
    console.error('Error in updateUser function:', error);
    throw error;
  }
};
