"use client";
import ChatInterface from "@/components/chat/ChatInterface";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { TUser } from "@/types/user";
import { useState } from "react";
const HomeView = () => {
  const [selectedChat, setselectedChat] = useState<TUser | null>(null);

  return (
    <div className="w-full h-screen center">
      <div className="flex w-[80%] h-[80%] mx-auto border-[1px] border-borderColor rounded-[8px] overflow-hidden">
        <ChatSidebar
          selectedChat={selectedChat}
          setselectedChat={setselectedChat}
        />
        <ChatInterface
          selectedChat={selectedChat}
          setselectedChat={setselectedChat}
        />
      </div>
    </div>
  );
};

export default HomeView;
