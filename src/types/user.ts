export type TUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  createdAt: string;
  image: string;
  onlineStatus: {
    isOnline: boolean;
    time: Date;
  };
};
