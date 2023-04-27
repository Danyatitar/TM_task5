export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  img: string;
}

export interface ISelectedUser {
  user: IUser;
  selected: boolean;
}
