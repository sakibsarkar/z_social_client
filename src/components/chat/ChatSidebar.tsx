"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localAvatar } from "@/redux/features/auth/auth.slice";
import { useChatHeadsQuery } from "@/redux/features/message/message.api";
import { TUser } from "@/types/user";
import { formatDistanceToNow } from "date-fns";
import { MoveHorizontalIcon } from "lucide-react";
import Image from "next/image";
import React, { SetStateAction } from "react";

interface IProps {
  selectedChat: TUser | null;
  setselectedChat: React.Dispatch<SetStateAction<TUser | null>>;
}

const ChatSidebar: React.FC<IProps> = ({ selectedChat, setselectedChat }) => {
  const { data } = useChatHeadsQuery(undefined);
  console.log(selectedChat);

  return (
    <div className="hidden w-64 flex-col border-r border-borderColor bg-background p-4 sm:flex">
      <div className="flex items-center gap-2 border-b pb-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="flex-1 truncate font-medium">Acme Chat</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoveHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 overflow-auto pt-[10px]">
        <nav className="grid gap-2">
          {data?.data?.map((user, i) => {
            const isOnline = user.onlineStatus?.isOnline;
            return (
              <div
                key={i + "chatHead" + user._id}
                onClick={() => setselectedChat(user)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer font-medium transition-colors hover:bg-muted relative ${
                  selectedChat?._id === user._id ? "bg-muted" : ""
                }`}
              >
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} />
                    <AvatarFallback>
                      <Image
                        className="rounded-full object-cover w-full h-full"
                        width={50}
                        height={50}
                        src={localAvatar}
                        alt="avatar"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-3 h-3 border-[1px] bg-borderDark p-[1px] absolute right-[-3px] top-[-2px] rounded-full">
                    <Avatar
                      className={`w-full h-full ${
                        isOnline ? "bg-green-300" : "bg-muted"
                      }`}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <div className="flex-1 truncate">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isOnline
                      ? "now"
                      : formatDistanceToNow(
                          new Date(user.onlineStatus?.time || "1-1-2024"),
                          { addSuffix: true }
                        )}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default ChatSidebar;
