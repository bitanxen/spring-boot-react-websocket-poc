import { ListItem, ListItemText } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import moment from "moment";
import React from "react";

import UserAvatar from "./UserAvatar";
//import StatusIcon from "./StatusIcon";
import * as Actions from "app/store/actions";

const useStyles = makeStyles((theme) => ({
  contactListItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&.active": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  unreadBadge: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

function ChatContact(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const chat = useSelector(({ chat }) => chat);
  const auth = useSelector(({ auth }) => auth);

  const { room } = props;

  const setCurrentRoom = (roomId) => {
    dispatch(Actions.setCurrentChatRoom(roomId));
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

  const getLastMessage = () => {
    const chats = getChats();
    return chats.length > 0 ? chats[chats.length - 1] : false;
  };

  const getLastMessageContent = () => {
    const lastChat = getLastMessage();
    if (!lastChat) return false;

    const sender =
      auth.user.userId === lastChat.sender
        ? "You"
        : room.roomMembers
            .filter((rm) => rm.userId === lastChat.sender)[0]
            .userFullName.split(" ")[0];
    return `${sender}: ${lastChat.content}`;
  };

  return (
    <ListItem
      button
      className={clsx(classes.contactListItem, "py-12 max-h-68", {
        active: room.roomId === chat.chat.currenctRoom,
      })}
      onClick={() => setCurrentRoom(room.roomId)}
    >
      <UserAvatar
        name={room.roomName}
        image={undefined}
        group={room.group}
        targetUserId={room.targetUserId}
      />

      <ListItemText
        classes={{
          root: "min-w-px px-4",
        }}
        disableTypography={true}
        primary={
          <div className="text-10 md:text-12 text-gray-700 w-full">
            {room.roomName}
          </div>
        }
        secondary={
          <div className="text-9 md:text-10 text-gray-500 max-w-full truncate">
            {getLastMessageContent()}
          </div>
        }
      />

      {getLastMessage() && (
        <div className="flex flex-col justify-center items-end">
          <span className="whitespace-no-wrap mb-4 text-8">
            {moment(getLastMessage().timeStamp).format("ll")}
          </span>
          {true && (
            <div
              className={clsx(
                classes.unreadBadge,
                "flex items-center justify-center min-w-12 h-12 rounded-full text-6 text-center"
              )}
            >
              5
            </div>
          )}
        </div>
      )}
    </ListItem>
  );
}

export default ChatContact;
