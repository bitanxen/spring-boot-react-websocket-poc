import applicationService from "./ApplicationService";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

var stompClient;

class ChatService {
  loadChatRooms = () => {
    return applicationService.get("/api/chat/room");
  };

  createIndividualChatRoom = (chatRoom) => {
    return applicationService.post("/api/chat/room", chatRoom);
  };

  connectUser = (onConnected, onError) => {
    var url = applicationService.appUrl() + "/bitanxen";
    const access_token = window.localStorage.getItem("chat_app_key");
    url = url + "?token=Bearer " + access_token;

    const sockJS = new SockJS(url);
    stompClient = Stomp.over(sockJS);

    stompClient.connect({}, onConnected, onError);
  };

  joinChat = (userId, onMessageReceived) => {
    stompClient.subscribe("/topic/public", onMessageReceived);
    setInterval(() => {
      stompClient.send(
        "/app/chat.register",
        {},
        JSON.stringify({ sender: userId, messageType: "USER_ONLINE" })
      );
    }, 5000);
  };

  subscribeTopics = (roomId, onMessageReceived) => {
    stompClient.subscribe("/topic/message/" + roomId, onMessageReceived);
  };

  sendMessage = (text, sender, room) => {
    stompClient.send(
      "/app/chat/" + room,
      {},
      JSON.stringify({
        sender: sender,
        messageType: "CHAT",
        content: text,
        chatGroup: room,
      })
    );
  };
}

const instance = new ChatService();
export default instance;
