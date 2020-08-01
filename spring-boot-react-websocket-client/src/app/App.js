import React, { useRef, useState } from "react";
import SockJsClient from "react-stomp";

function App(props) {
  const clientRef = useRef(null);
  const [msg, setMsg] = useState([]);
  const [text, setText] = useState([]);
  const [connected, setConnected] = useState(false);

  const sendMessage = () => {
    clientRef.current.sendMessage("/topic/public", text);
  };

  return (
    <div>
      <SockJsClient
        url="http://192.168.1.100:8080/bitanxen"
        topics={["/topic/public"]}
        onMessage={(m) => {
          setMsg([...msg, m]);
        }}
        ref={clientRef}
        onConnect={() => setConnected(true)}
      />
      {connected ? (
        <React.Fragment>
          Your Message:{" "}
          <input type="text" onChange={(e) => setText(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </React.Fragment>
      ) : (
        <div>Not Connected</div>
      )}

      <div style={{ width: "100%", textAlign: "center" }}>
        {msg.map((m, index) => (
          <div key={index}>{m}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
