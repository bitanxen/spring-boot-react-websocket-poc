import * as Actions from "../../actions/chat";

const initialState = {
  connected: false,
  error: false,
  rooms: null,
  currenctRoom: null,
  onlineUsers: [],
  chats: [],
  lastSeen: {},
};

const chat = function (state = initialState, action) {
  switch (action.type) {
    case Actions.CHAT_CONNECTION: {
      return {
        ...state,
        connected: action.payload,
      };
    }
    case Actions.CHAT_CONNECTION_ERR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case Actions.SET_CHAT_ROOMS: {
      return {
        ...state,
        rooms: action.payload,
      };
    }
    case Actions.ADD_CHAT_ROOMS: {
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
        currenctRoom: action.payload.roomId,
      };
    }
    case Actions.CHANGE_CURRENT_CHAT_ROOM: {
      return {
        ...state,
        currenctRoom: action.payload,
      };
    }
    case Actions.USER_ONLINE: {
      return {
        ...state,
        onlineUsers: [...action.payload],
      };
    }
    case Actions.STORE_CHAT: {
      return {
        ...state,
        chats: [...state.chats, action.payload],
        lastSeen: {
          ...state.lastSeen,
          [action.payload.chatGroup]:
            state.currenctRoom === action.payload.chatGroup
              ? action.payload.messageId
              : state.lastSeen[action.payload.chatGroup],
        },
      };
    }
    case Actions.LAST_SEEN_MESSAGE: {
      return {
        ...state,
        lastSeen: {
          ...state.lastSeen,
          [action.payload.roomId]: action.payload.messageId,
        },
      };
    }
    default:
      return state;
  }
};

export default chat;
