"use client";
import { useAppSelector } from "@/redux/hook";
import { IMessage } from "@/types/message";
import { format } from "date-fns";
import { useState } from "react";
import { AiOutlineStop } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MessageOptions from "./MessageOptions";
const Message = ({ message }: { message: IMessage }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [isDeleted, setIsDeleted] = useState(message.isDeleted);

  const isSender = user?._id === message.sender?._id;

  return (
    <div
      className={`flex items-start gap-4 w-full  ${
        isSender ? "justify-end" : "justify-start"
      }`}
      key={message._id}
    >
      {isSender ? (
        ""
      ) : (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
      )}
      {isDeleted ? (
        <div className="flex flex-col gap-[5px] max-w-[80%] items-end">
          <div className="bg-muted rounded-lg p-3 max-w-[200px]">
            <p className="text-sm text-muted-foreground flex gap-[5px] item-center">
              <AiOutlineStop /> This message has been deleted
            </p>
          </div>
          <div className="w-full flex items-center justify-start gap-[5px]">
            <div className="text-xs text-muted-foreground">
              {format(new Date(message.createdAt), "MMM dd, yy hh:mm a")}
            </div>
            {"-"}
            <div className="text-xs text-muted-foreground">
              deleted on{" "}
              {format(new Date(message.updatedAt), "MMM dd, yy hh:mm a")}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex  flex-col gap-[5px] max-w-[80%] items-end">
          <div className="w-full center gap-[8px]">
            {isSender ? (
              <MessageOptions
                messageId={message._id}
                setIsDeleted={setIsDeleted}
              />
            ) : (
              ""
            )}
            <span
              className={` rounded-[5px] px-[8px] py-[8px] text-sm w-full  ${
                isSender
                  ? "bg-[#e7efff] rounded-tr-[0]"
                  : "bg-muted rounded-tl-[0]"
              }`}
            >
              {message.message}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {format(new Date(message.createdAt), "MMM dd, yy hh:mm a")}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
