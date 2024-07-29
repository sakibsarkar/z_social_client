import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMessageMutation } from "@/redux/features/message/message.api";
import React, { SetStateAction } from "react";
import { TbDotsVertical } from "react-icons/tb";

interface IPorps {
  messageId: string;
  setIsDeleted: React.Dispatch<SetStateAction<boolean>>;
}

const MessageOptions: React.FC<IPorps> = ({ messageId, setIsDeleted }) => {
  const [deleteMessage] = useDeleteMessageMutation();

  const handleDeleteMessage = async () => {
    await deleteMessage(messageId);
    setIsDeleted(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <TbDotsVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Eidt message</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteMessage}>
          Delete message
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MessageOptions;
