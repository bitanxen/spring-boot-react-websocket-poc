import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IconButton, TextField } from "@material-ui/core";
import { MoreVert, Send, PostAdd, Call } from "@material-ui/icons";

import UserAvatar from "./UserAvatar";

function ChatRoom(props) {
  const { roomId } = props;
  const [room, setRoom] = useState(null);
  const chat = useSelector(({ chat }) => chat);

  useEffect(() => {
    if (chat.chat.rooms !== null) {
      const selectedRoom = chat.chat.rooms.filter((r) => r.roomId === roomId);
      if (selectedRoom.length > 0) {
        setRoom(selectedRoom[0]);
      }
    }
  }, [roomId, chat]);

  return (
    <div className="w-full h-full py-1">
      {room === null ? (
        <div className="text-center py-40">Welcome to TalkFest</div>
      ) : (
        <div className="h-full w-full relative border-1 border-green-200">
          <div className="flex w-full absolute justify-between px-4 bg-green-500">
            <div className="flex justify-center">
              <div className="flex flex-col justify-center mr-3">
                <UserAvatar
                  name={room.roomName}
                  image={undefined}
                  group={room.group}
                  targetUserId={room.targetUserId}
                />
              </div>
              <div className="flex flex-col justify-center">
                {room.roomName}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col justify-center">
                <IconButton size="medium">
                  <Call />
                </IconButton>
              </div>
              <div className="flex flex-col justify-center">
                <IconButton size="medium">
                  <MoreVert />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="w-full h-full py-36 bg-green-100">Message</div>
          <div className="w-full absolute flex flex-grow bottom-0">
            <div className="w-auto p-2">
              <IconButton size="small">
                <PostAdd />
              </IconButton>
            </div>
            <div className="p-0 w-full">
              <TextField fullWidth />
            </div>
            <div className="w-auto p-0">
              <IconButton size="medium">
                <Send />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
