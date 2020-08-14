import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  makeStyles,
  Paper,
  IconButton,
  TextField,
  Avatar,
  Typography,
} from "@material-ui/core";
import { Send, PostAdd } from "@material-ui/icons";
import clsx from "clsx";
import moment from "moment/moment";

import chatService from "app/service/ChatService";

const useStyles = makeStyles((theme) => ({
  messageRow: {
    "&.contact": {
      "& .bubble": {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.getContrastText(theme.palette.background.paper),
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        "& .time": {
          marginLeft: 12,
        },
      },
      "&.first-of-group": {
        "& .bubble": {
          borderTopLeftRadius: 20,
        },
      },
      "&.last-of-group": {
        "& .bubble": {
          borderBottomLeftRadius: 20,
        },
      },
    },
    "&.me": {
      paddingLeft: 40,

      "& .avatar": {
        order: 2,
        margin: "0 0 0 16px",
      },
      "& .bubble": {
        marginLeft: "auto",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        "& .time": {
          justifyContent: "flex-end",
          right: 0,
          marginRight: 12,
        },
      },
      "&.first-of-group": {
        "& .bubble": {
          borderTopRightRadius: 20,
        },
      },

      "&.last-of-group": {
        "& .bubble": {
          borderBottomRightRadius: 20,
        },
      },
    },
    "&.contact + .me, &.me + .contact": {
      paddingTop: 20,
      marginTop: 20,
    },
    "&.first-of-group": {
      "& .bubble": {
        borderTopLeftRadius: 20,
        paddingTop: 13,
      },
    },
    "&.last-of-group": {
      "& .bubble": {
        borderBottomLeftRadius: 20,
        paddingBottom: 13,
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
  const [message, setMessage] = useState("");
  const chat = useSelector(({ chat }) => chat);
  const auth = useSelector(({ auth }) => auth);
  const classes = useStyles(props);

  const sendMessage = () => {
    chatService.sendMessage(message, auth.user.userId, room.roomId);
    setMessage("");
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

  useEffect(() => {
    scrollToBottom();
  }, [chat.chat.chats]);

  return (
    <div className="max-w-full min-w-full">
      <div
        id="scrollbar"
        className="flex flex-1 flex-col overflow-y-auto h-full"
        ref={chatRef}
      >
        <div className="flex flex-col mb-92">
          {getChats().map((c, index) => {
            const selfMessage = auth.user.userId === c.sender;
            return (
              <div
                key={index}
                className={clsx(
                  classes.messageRow,
                  "flex flex-grow-0 flex-shrink-0 items-start justify-end relative px-8 md:px-16 pb-4",
                  { me: selfMessage },
                  { contact: !selfMessage },
                  index + 1 === getChats().length && "pb-96"
                )}
              >
                <Avatar className="avatar ltr:left-0 rtl:right-0 m-0 -mx-32">
                  H
                </Avatar>
                <div className="bubble flex relative items-center justify-center p-12 max-w-full shadow-1">
                  <div className="leading-tight whitespace-pre-wrap">
                    {c.content}
                  </div>
                  <Typography
                    className="time hidden w-full text-11 mt-8 -mb-24 ltr:left-0 rtl:right-0 bottom-0 whitespace-no-wrap"
                    color="textSecondary"
                  >
                    {moment(c.timeStamp).format("MMMM Do YYYY, h:mm:ss a")}
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full md:relative">
        <div className="absolute mx-2 mb-8 bottom-0 left-0 right-0">
          <Paper
            className="flex items-center relative rounded-24"
            elevation={1}
          >
            <IconButton
              className="absolute right-0 top-0"
              size="medium"
              onClick={() => {}}
            >
              <PostAdd />
            </IconButton>
            <TextField
              autoFocus={false}
              id="message-input"
              className="flex-1"
              InputProps={{
                disableUnderline: true,
                classes: {
                  root:
                    "flex flex-grow flex-shrink-0 mx-4 ltr:mr-48 rtl:ml-48 my-8",
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
    </div>
  );
}

export default ChatMessage;
