import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSocketContext } from "@/provider/SocketProvider";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/features/message/message.api";
import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types/user";
import { MoveHorizontalIcon, SendIcon } from "lucide-react";
import { FormEvent, KeyboardEvent, SetStateAction, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Message from "./Message";

const audio = new Audio();

interface IProps {
  selectedChat: TUser | null;
  setselectedChat: React.Dispatch<SetStateAction<TUser | null>>;
}

const ChatInterface: React.FC<IProps> = ({ selectedChat, setselectedChat }) => {
  const { socket } = useSocketContext();
  const { user } = useAppSelector((state) => state.auth);
  const { data, refetch } = useGetMessagesQuery(selectedChat?._id as string, {
    skip: !selectedChat,
  });
  const [sendMessage] = useSendMessageMutation();

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedChat) return;
    audio.src = "/audio/sent.m4a";

    const form = e.target as HTMLFormElement;
    const message = form.message.value;
    if (!message) return;

    await sendMessage({ id: selectedChat._id, message });
    audio.play();
    form.reset();
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", () => {
      refetch();

      audio.src = "/audio/receive.m4a";
      audio.play();
    });
  }, [socket, refetch]);

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      console.log(chatContainer);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [data?.data]);

  const typeMessage = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key;
    const keycode = e.keyCode;
    const isEnterkey = keycode === 13 || e.key === "Enter";

    const textarea = e.target as HTMLTextAreaElement;
    const value = textarea.value;
    const form = document.getElementById(
      "form-message-send"
    ) as HTMLFormElement;
    textarea.style.height = textarea.scrollHeight + "px";
    if (!value) {
      textarea.style.height = "48px";
    }
    if (e.shiftKey && isEnterkey) {
      e.preventDefault();
      textarea.value += "\n";
      textarea.style.height = textarea.scrollHeight + "px";

      return;
    }

    if (isEnterkey) {
      form.submit();
    }
  };

  return (
    <>
      {selectedChat ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-4 border-b bg-background px-4 py-3 sm:px-6">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate font-medium">
              {selectedChat.firstName} {selectedChat.lastName}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoveHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View profile</DropdownMenuItem>
                <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setselectedChat(null)}>
                  Leave chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div
            className="flex-1 overflow-auto p-4 sm:p-6 smoothBar"
            id="chat-container"
          >
            <div className="flex flex-col gap-[10px] w-full">
              {data?.data?.map((message) => (
                <Message message={message} key={message._id} />
              ))}
            </div>
          </div>
          <div className="sticky bottom-0 bg-background px-4 py-3 sm:px-6">
            <form
              onSubmit={handleSendMessage}
              className="relative"
              id="form-message-send"
            >
              <div className="w-full border-borderColor border-[1px] py-[8px] px-[8px] flex items-end justify-start rounded-[8px]">
                <textarea
                  name="message"
                  placeholder="Type your message..."
                  className="min-h-[48px] h-auto w-full outline-none"
                  rows={1}
                  onKeyDown={typeMessage}
                />
                <Button type="submit" size="icon">
                  <SendIcon className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ChatInterface;
