import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuItem, IconButton, Typography } from "@material-ui/core";
import { PersonAdd, GroupAdd, MoreVert } from "@material-ui/icons";
import clsx from "clsx";

import chatService from "app/service/ChatService";
import * as Actions from "app/store/actions";

import AddPerson from "./AddPerson";
import UserAvatar from "./UserAvatar";
import ChatRoom from "./ChatRoom";
import ChatContact from "./ChatContact";

function Home(props) {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);
  const chat = useSelector(({ chat }) => chat);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addPerson = () => {
    setOpenAddUserDialog(true);
    handleClose();
  };

  const addGroup = () => {
    handleClose();
  };

  useEffect(() => {
    chatService
      .loadChatRooms()
      .then((data) => {
        dispatch(Actions.setChatRooms(data));
      })
      .catch((err) => {
        dispatch(Actions.setChatRooms([]));
      });
  }, [dispatch]);

  useEffect(() => {
    if (chat.chat.rooms !== null && chat.chat.rooms.length > 0) {
      dispatch(Actions.connectUser(auth.user.userId));
    }
  }, [dispatch, auth.user.userId, chat.chat.rooms]);

  useEffect(() => {
    if (chat.chat.connected) {
      dispatch(Actions.subscriberGroup(chat.chat.rooms));
    }
  }, [dispatch, chat.chat.connected, chat.chat.rooms]);

  return (
    <div className="flex h-full overflow-auto justify-center">
      <div
        className={clsx(
          "w-full md:w-1/3 pr-1",
          chat.chat.currenctRoom === null ? "block" : "hidden md:block"
        )}
      >
        <div className="flex flex-grow my-1 justify-between bg-green-200 h-32 pl-5 pr-3 border-green-700 shadow-1">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center mr-3">
              <UserAvatar
                name={auth.user.fullName}
                image={undefined}
                self={true}
              />
            </div>
            <div className="flex flex-col justify-center">
              {auth.user.fullName}
            </div>
          </div>

          <IconButton size="medium" onClick={handleClick}>
            <MoreVert fontSize="inherit" />
          </IconButton>
          <Menu
            id="option-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={addPerson}>
              <IconButton size="small">
                <PersonAdd fontSize="inherit" />
              </IconButton>
              <Typography variant="body1">Add Person</Typography>
            </MenuItem>
            <MenuItem onClick={addGroup}>
              <IconButton size="small">
                <GroupAdd fontSize="inherit" />
              </IconButton>
              <Typography variant="body1">Add Group</Typography>
            </MenuItem>
          </Menu>
        </div>
        <div>
          {chat.chat.rooms === null ? (
            <div className="py-20 text-center">Loading Data...</div>
          ) : chat.chat.rooms.length === 0 ? (
            <div className="py-20 text-center">No Room or Contact Found</div>
          ) : (
            chat.chat.rooms.map((room, index) => (
              <ChatContact room={room} key={index} />
            ))
          )}
        </div>
      </div>
      <div
        className={clsx(
          "w-full md:w-2/3",
          chat.chat.currenctRoom === null ? "hidden md:block" : "block"
        )}
      >
        <ChatRoom roomId={chat.chat.currenctRoom} />
      </div>
      <AddPerson
        open={openAddUserDialog}
        handleClose={() => setOpenAddUserDialog(false)}
      />
    </div>
  );
}

export default Home;
