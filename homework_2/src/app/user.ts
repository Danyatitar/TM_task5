export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface ISelectedUser {
  user: IUser;
  selected: boolean;
}
