import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  makeStyles,
  Paper,
  IconButton,
  TextField,
  Avatar,
} from "@material-ui/core";
import { Send, PostAdd } from "@material-ui/icons";
import clsx from "clsx";
import moment from "moment/moment";

import chatService from "app/service/ChatService";

const useStyles = makeStyles((theme) => ({
  messageRow: {
    justifyContent: "flex-end",
    "&.contact": {
      "& .avatar": {
        order: 2,
        margin: "0 0 0 16px",
      },
      "& .bubble": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        "& .time": {
          fontSize: "10px",
          justifyContent: "flex-end",
        },
      },
    },
    "&.me": {
      justifyContent: "flex-start",
      "& .avatar": {
        margin: "0 16px 0 0",
      },
      "& .bubble": {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        "& .time": {
          justifyContent: "flex-start",
          fontSize: "10px",
        },
      },
    },
    "&.contact + .me, &.me + .contact": {
      paddingTop: 10,
      marginTop: 10,
    },
    "&.last-of-group": {
      "& .bubble": {
        "& .time": {
          display: "flex",
        },
      },
    },
  },
}));

function ChatMessage(props) {
  const { room } = props;
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const [message, setMessage] = useState("");
  const chat = useSelector(({ chat }) => chat);
  const auth = useSelector(({ auth }) => auth);
  const classes = useStyles(props);

  const sendMessage = () => {
    if (message && message.length > 0) {
      chatService.sendMessage(message, auth.user.userId, room.roomId);
      setMessage("");
      inputRef.current.focus();
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
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

  function scrollToBottom() {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }

  function isFirstMessageOfGroup(item, i) {
    return (
      i === 0 || (getChats()[i - 1] && getChats()[i - 1].sender !== item.sender)
    );
  }

  function isLastMessageOfGroup(item, i) {
    return (
      i === getChats().length - 1 ||
      (getChats()[i + 1] && getChats()[i + 1].sender !== item.sender)
    );
  }

  function getChatSender(chat) {
    const member = room.roomMembers.filter(
      (rm) => rm.userId === chat.sender
    )[0];
    return <Avatar className="avatar m-0">{member.userFullName[0]}</Avatar>;
  }

  useEffect(() => {
    scrollToBottom();
  }, [chat.chat.chats]);

  return (
    <div className="max-w-full min-w-full border-1 border-blue-500">
      <div
        id="scrollbar"
        className="flex flex-1 flex-col overflow-y-auto h-full"
        ref={chatRef}
      >
        <div className="flex flex-col mb-92 pt-1">
          {getChats().map((c, index) => {
            const selfMessage = auth.user.userId === c.sender;
            return (
              <div
                key={index}
                className={clsx(
                  classes.messageRow,
                  "flex flex-grow-0 flex-shrink-0 items-start relative pb-4 px-8",
                  { me: selfMessage },
                  { contact: !selfMessage },
                  { "first-of-group": isFirstMessageOfGroup(c, index) },
                  { "last-of-group": isLastMessageOfGroup(c, index) },
                  index + 1 === getChats().length && "pb-32"
                )}
              >
                {getChatSender(c)}
                <div className="bubble flex flex-col relative items-center justify-center p-1rem max-w-full shadow-1">
                  <div className="leading-tight whitespace-pre-wrap">
                    {c.content}
                  </div>
                  <span
                    className="time absolute text-gray-700 hidden w-full text-11 mt-8 -mb-12 bottom-0 whitespace-no-wrap"
                    color="textSecondary"
                  >
                    {moment(c.timeStamp).format("MMMM Do YYYY, h:mm:ss a")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute w-full md:w-2/3 mb-8 bottom-0 right-0 px-8">
        <Paper className="flex items-center relative rounded-24" elevation={1}>
          <IconButton
            className="absolute right-0 top-0"
            size="medium"
            onClick={() => {}}
          >
            <PostAdd />
          </IconButton>
          <TextField
            autoFocus={false}
            ref={inputRef}
            id="message-input"
            className="flex-1"
            onKeyUp={(e) => handleEnter(e)}
            InputProps={{
              disableUnderline: true,
              classes: {
                root: "flex flex-grow flex-shrink-0 mx-4 my-8",
                input: "",
              },
              placeholder: "Type your message",
            }}
            InputLabelProps={{
              shrink: false,
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            className="absolute right-0 top-0"
            size="medium"
            onClick={() => sendMessage()}
          >
            <Send />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}

export default ChatMessage;
