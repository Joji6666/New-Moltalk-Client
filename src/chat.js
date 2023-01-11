import React, { useEffect, useState } from "react";
import "./chat.css";
import ChatWarpHead from "./pages/layout/chat_warp_head";
import Sidebar from "./pages/layout/sidebar";
import Terminal from "./pages/layout/terminal";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [messageContent, setMessageContent] = useState([]);

  useEffect(() => {
    socket.on("get_message", (data) => {
      console.log(data);
      setMessageContent((content) => [...content, data]);
      data.stopPropagation();
    });
  }, [socket]);

  const sendMessage = async (e) => {
    if (message !== "") {
      const messageData = {
        room,
        username,
        message,
      };
      await socket.emit("set_message", messageData);
      setMessageContent((content) => [...content, messageData]);
      e.stopPropagation();
    }
  };
  const inputOnChange = (e) => {
    setMessage(e.target.value);
  };
  const resetInput = () => {
    setMessage("");
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
      resetInput();
    }
  };

  return (
    <>
      <body>
        <div className="container">
          <Sidebar />
          <div className="chat-warp">
            <ChatWarpHead />
            <div className="chating-wrap">
              <div className="chat-list">
                <div className="chat-body">
                  {messageContent.map((result) => {
                    return (
                      <>
                        <div>
                          <span id="chat-list-lt">&lt;</span>
                          <span id="chat-list-div">div</span>{" "}
                          <span id="chat-list-class">class</span>
                          <span id="chat-list-equal">=</span>
                          <span id="chat-list-quot"> &quot;</span>
                          <span id="chat-list-username">{result.username}</span>
                          <span id="chat-list-quot">&quot;</span>
                          <span id="chat-list-gt">&gt;</span>
                        </div>
                        <div>
                          <span id="chat-list-lt">&lt;</span>
                          <span id="chat-list-div">span</span>
                          <span id="chat-list-gt">&gt;</span>
                          <span id="chat-list-content">{result.message}</span>
                          <span id="chat-list-lt">&lt;/</span>
                          <span id="chat-list-div">span</span>
                          <span id="chat-list-gt">&gt;</span>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="terminal">
            <Terminal />

            <div className="chat-input">
              <div className="defalut-text">
                <span>
                  macui-MacBook-Air:myProject mac${" "}
                  <input
                    className="input"
                    type="text"
                    value={message}
                    onChange={inputOnChange}
                    onKeyPress={handleOnKeyPress}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Chat;
