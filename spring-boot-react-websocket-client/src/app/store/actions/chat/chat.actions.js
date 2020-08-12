import chatService from "app/service/ChatService";

export const CHAT_CONNECTION = "[CHAT] CHAT CONNECTION";
export const CHAT_CONNECTION_ERR = "[CHAT] CHAT CONNECTION ERROR";
export const SET_CHAT_ROOMS = "[CHAT] SET CHAT ROOM";
export const ADD_CHAT_ROOMS = "[CHAT] ADD CHAT ROOM";
export const CHANGE_CURRENT_CHAT_ROOM = "[CHAT] CHANGE_CURRENT_CHAT_ROOM";
export const USER_ONLINE = "[CHAT] USER_ONLINE";

export function setConnectionStatus(value) {
  return {
    type: CHAT_CONNECTION,
    payload: value,
  };
}

export function setConnectionError(value) {
  return {
    type: CHAT_CONNECTION_ERR,
    payload: value,
  };
}

export function setChatRooms(value) {
  return {
    type: SET_CHAT_ROOMS,
    payload: value,
  };
}

export function addChatRoom(value) {
  return {
    type: ADD_CHAT_ROOMS,
    payload: value,
  };
}

export function setCurrentChatRoom(value) {
  return {
    type: CHANGE_CURRENT_CHAT_ROOM,
    payload: value,
  };
}

export function setUserOnline(value) {
  return {
    type: USER_ONLINE,
    payload: value,
  };
}

export function connectUser(userId) {
  return (dispatch) => {
    chatService.connectUser(
      (f) => {
        chatService.joinChat(userId, (msg) => dispatch(userOnline(msg)));
        dispatch(onConnect(f));
      },
      (e) => {
        dispatch(onError(e));
      }
    );
  };
}

function onConnect() {
  return (dispatch) => {
    dispatch(setConnectionStatus(true));
  };
}

function onError(e) {
  return (dispatch) => {
    dispatch(setConnectionStatus(false));
    dispatch(setConnectionError(e));
  };
}

function userOnline(msg) {
  return (dispatch) => {
    const data = JSON.parse(msg.body);
    dispatch(setUserOnline(data));
  };
}

export function subscriberGroup(rooms) {
  //console.log(rooms);
}

/*
function onMessageReceived(msg) {
  return (dispatch) => {
    console.log(msg);
  };
}
*/
