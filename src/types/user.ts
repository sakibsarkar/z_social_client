export type TUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  createdAt: string;
  profilePic: string;
  onlineStatus: {
    isOnline: boolean;
    time: Date;
  };
};
