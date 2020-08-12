import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import uuid from "uuid";

import * as Actions from "app/store/actions";
import authService from "app/service/AuthService";
import chatService from "app/service/ChatService";

export default function AddPerson(props) {
  const dispatch = useDispatch();
  const { open, handleClose } = props;
  const [searchedUser, setSearchedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searching, setSearching] = useState(false);

  const startSearching = () => {
    setSearching(true);
    authService
      .searchUser(searchTerm)
      .then((data) => {
        setSearching(false);
        setSearchedUser(data);
      })
      .catch((err) => {
        setSearching(false);
      });
  };

  const startChat = (user) => {
    if (user.chatRoom === null) {
      const room = uuid.v4();
      chatService
        .createIndividualChatRoom({
          group: false,
          targetUser: user.userId,
          roomName: room,
          roomDescription: room,
        })
        .then((newRoom) => {
          dispatch(Actions.addChatRoom(newRoom));
          handleClose();
        });
    } else {
      dispatch(Actions.setCurrentChatRoom(user.chatRoom));
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="person-dialog-title">Add User</DialogTitle>
      <DialogContent>
        <DialogContentText>Search User to start chatting.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        {searchedUser !== null && searchedUser.length === 0 && (
          <div className="my-2 text-center w-full">No Record Found</div>
        )}

        <div className="mt-10 w-full max-h-200">
          {searchedUser !== null &&
            searchedUser.length > 0 &&
            searchedUser.map((user, index) => (
              <div
                key={index}
                className="flex flex-grow justify-between w-2/3 mx-auto border-1 rounded-8 p-3"
              >
                <div>{user.fullName}</div>
                <div>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => startChat(user)}
                  >
                    Chat
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={!searchTerm || searchTerm === null || searching}
          onClick={() => startSearching()}
          color="primary"
        >
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
}
