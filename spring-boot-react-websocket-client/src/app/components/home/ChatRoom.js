import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Badge,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MoreVert, Call, ArrowBack } from "@material-ui/icons";
import { fade } from "@material-ui/core/styles/colorManipulator";
import clsx from "clsx";

import UserAvatar from "./UserAvatar";
import ChatMessage from "./ChatMessage";
import * as Actions from "app/store/actions";

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 100%",
    zIndex: 10,
    background: `linear-gradient(to bottom, ${fade(
      theme.palette.background.paper,
      0.8
    )} 0,${fade(theme.palette.background.paper, 0.6)} 20%,${fade(
      theme.palette.background.paper,
      0.8
    )})`,
  },
  content: {
    display: "flex",
    flex: "1 1 100%",
    minHeight: 0,
  },
  toolBar: {
    padding: 0,
    backgroundColor: theme.palette.primary.light,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    fontSize: "8px",
    right: "-6px",
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: theme.palette.warning.light,
  },
}))(Badge);

function ChatRoom(props) {
  const classes = useStyles(props);
  const { roomId, totalUnseen } = props;
  const dispatch = useDispatch();
  const [room, setRoom] = useState(null);
  const chat = useSelector(({ chat }) => chat);
  //const auth = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (chat.chat.rooms !== null) {
      const selectedRoom = chat.chat.rooms.filter((r) => r.roomId === roomId);
      if (selectedRoom.length > 0) {
        setRoom(selectedRoom[0]);
      } else {
        setRoom(null);
      }
    } else {
      setRoom(null);
    }
  }, [roomId, chat]);

  const backHandler = () => {
    dispatch(Actions.setCurrentChatRoom(null));
  };

  const getChats = useCallback(
    (roomId) => {
      return chat.chat.chats
        .filter((c) => c.chatGroup === roomId)
        .sort(function (a, b) {
          var c = new Date(a.timeStamp);
          var d = new Date(b.timeStamp);
          return c - d;
        });
    },
    [chat.chat.chats]
  );

  useEffect(() => {
    const roomChats = getChats(roomId);
    if (roomChats.length > 0) {
      dispatch(Actions.updateLastMessage(roomId, roomChats[0].messageId));
    }
  }, [dispatch, roomId, getChats]);

  return (
    <div className="w-full h-full overflow-hidden">
      {room === null ? (
        <div className="text-center py-40">Welcome to TalkFest</div>
      ) : (
        <main
          className={clsx(
            classes.contentWrapper,
            "max-w-full min-h-full max-h-full md:mt-1"
          )}
        >
          <AppBar className="w-full" position="static" elevation={1}>
            <Toolbar className={classes.toolBar}>
              <div className="md:hidden flex flex-col justify-center">
                <IconButton size="medium" onClick={() => backHandler()}>
                  {totalUnseen > 0 ? (
                    <StyledBadge
                      badgeContent={totalUnseen > 10 ? "10+" : totalUnseen}
                      color="secondary"
                    >
                      <ArrowBack />
                    </StyledBadge>
                  ) : (
                    <ArrowBack />
                  )}
                </IconButton>
              </div>

              <div className="w-full flex justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <UserAvatar
                      name={room.roomName}
                      image={undefined}
                      group={room.group}
                      targetUserId={room.targetUserId}
                    />
                  </div>
                  <Typography color="inherit" className="text-18 font-600 px-4">
                    {room.roomName}
                  </Typography>
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
            </Toolbar>
          </AppBar>

          <div className={classes.content}>
            <ChatMessage room={room} />
          </div>
        </main>
      )}
    </div>
  );
}

export default ChatRoom;
