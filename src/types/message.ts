import { TUser } from "./user";

export interface IMessage {
  _id: string;
  sender: TUser;
  receiver: TUser;
  message: string;
  conversation: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
