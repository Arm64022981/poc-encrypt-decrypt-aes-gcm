// src/store/useStore.ts
import { create } from 'zustand';
import { CopayUser } from '@/repository/copay-backoffice/entity';
import { getAllUsers } from '@/service/co-pay-back-office/account-management';

interface StoreState {
  username: string;
  setUsername: (name: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  users: CopayUser[];
  setUsers: (users: CopayUser[]) => void;
  fetchUsers: (params?: Partial<CopayUser>) => Promise<void>; // เพิ่ม fetchUsers ใน Zustand Store
}

const useStore = create<StoreState>((set) => ({
  username: '',
  setUsername: (name) => set({ username: name }),
  isOpen: true,
  setIsOpen: (isOpen) => set({ isOpen }),
  users: [],
  setUsers: (users) => set({ users }),
  fetchUsers: async (params = {}) => { // ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้
    try {
      const fetchedUsers = await getAllUsers(params);
      set({ users: fetchedUsers });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
}));

export default useStore;
