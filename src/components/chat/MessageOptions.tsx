import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteMessageMutation,
  useEditMessageMutation,
} from "@/redux/features/message/message.api";
import { ArrowRight } from "lucide-react";
import React, { FormEvent, SetStateAction } from "react";
import { TbDotsVertical } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IPorps {
  messageId: string;
  message: string;
  setIsDeleted: React.Dispatch<SetStateAction<boolean>>;
}

const MessageOptions: React.FC<IPorps> = ({
  messageId,
  setIsDeleted,
  message,
}) => {
  const [deleteMessage] = useDeleteMessageMutation();
  const [updateMessage] = useEditMessageMutation();

  const handleDeleteMessage = async () => {
    await deleteMessage(messageId);
    setIsDeleted(true);
  };

  const handleUpdateMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const message = form.message.value;
    if (!message) return;
    await updateMessage({ id: messageId, message });

    form.reset();
    document.getElementById("close-edit-modal")?.click();
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
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger className="py-[6px] px-[8px] text-[14px] hover:bg-muted w-full text-start">
              Edit message
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit message</DialogTitle>
                <DialogDescription>
                  This message will update from everyone on this chat
                </DialogDescription>
              </DialogHeader>
              <form
                className="flex items-center space-x-2"
                onSubmit={handleUpdateMessage}
              >
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="message" className="sr-only">
                    Link
                  </Label>
                  <Input id="message" defaultValue={message} />
                </div>
                <Button type="submit" size="sm" className="px-3">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    id="close-edit-modal"
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteMessage}>
          Delete message
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MessageOptions;
