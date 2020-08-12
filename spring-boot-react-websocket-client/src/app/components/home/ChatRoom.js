import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, TextField } from "@material-ui/core";
import { MoreVert, Send, PostAdd, Call, ArrowBack } from "@material-ui/icons";

import UserAvatar from "./UserAvatar";
import chatService from "app/service/ChatService";
import * as Actions from "app/store/actions";

function ChatRoom(props) {
  const { roomId } = props;
  const dispatch = useDispatch();
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState("");
  const chat = useSelector(({ chat }) => chat);
  const auth = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (chat.chat.rooms !== null) {
      const selectedRoom = chat.chat.rooms.filter((r) => r.roomId === roomId);
      if (selectedRoom.length > 0) {
        setRoom(selectedRoom[0]);
      }
    }
  }, [roomId, chat]);

  const sendMessage = () => {
    chatService.sendMessage(message, auth.user.userId, roomId);
    setMessage("");
  };

  const backHandler = () => {
    dispatch(Actions.setCurrentChatRoom(null));
  };

  const getChats = () => {
    return chat.chat.chats
      .filter((c) => c.chatGroup === room.roomId)
      .sort(function (a, b) {
        var c = new Date(a.timeStamp);
        var d = new Date(b.timeStamp);
        return c - d;
      });
  };

  return (
    <div className="w-full h-full py-1">
      {room === null ? (
        <div className="text-center py-40">Welcome to TalkFest</div>
      ) : (
        <div className="h-full w-full relative border-1 border-green-200">
          <div className="flex w-full absolute justify-between px-4 bg-green-500">
            <div className="flex justify-center">
              <div className="md:hidden flex flex-col justify-center">
                <IconButton size="medium" onClick={() => backHandler()}>
                  <ArrowBack />
                </IconButton>
              </div>
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
          <div className="w-full h-full py-36 bg-green-100">
            {getChats().map((c, index) => (
              <div key={index}>
                {JSON.stringify(c)} <br />
              </div>
            ))}
          </div>
          <div className="w-full absolute flex flex-grow bottom-0">
            <div className="w-auto p-2">
              <IconButton size="small">
                <PostAdd />
              </IconButton>
            </div>
            <div className="p-0 w-full">
              <TextField
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="w-auto p-0">
              <IconButton size="medium" onClick={() => sendMessage()}>
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
