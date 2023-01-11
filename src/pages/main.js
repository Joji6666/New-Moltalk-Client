import "../chat.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "../chat";
import Sidebar from "./layout/sidebar";
import ChatWarp from "./layout/chat_warp";
import Terminal from "./layout/terminal";

const socket = io.connect("http://localhost:5000");

export default function MainPage() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chatOn, setChatOn] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setChatOn(true);
    }
  };
  return (
    <>
      {!chatOn ? (
        <body>
          <div className="container">
            <Sidebar />
            <ChatWarp />
            <div className="terminal">
              <Terminal />

              <div className="chat-input">
                <div className="defalut-text">
                  <span>
                    macui-MacBook-Air:myProject mac${" "}
                    <input
                      className="login-input"
                      type="text"
                      placeholder="사용할 이름을 입력해주세요."
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </span>

                  <span>
                    macui-MacBook-Air:myProject mac${" "}
                    <input
                      className="login-input"
                      type="text"
                      placeholder="방 번호를 입력해주세요."
                      onChange={(e) => {
                        setRoom(e.target.value);
                      }}
                    />
                  </span>
                  <span>
                    macui-MacBook-Air:myProject mac${" "}
                    <button className="login-btn" onClick={joinRoom}>
                      입장
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </body>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </>
  );
}
