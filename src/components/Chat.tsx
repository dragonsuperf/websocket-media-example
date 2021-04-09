import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function Chat(): ReactElement {
  const [socketUrl] = useState('ws://127.0.0.1:8000/chat');
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<string []>([]);

  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket(socketUrl);

  useEffect(() => {
    const newMessages = messages;

    if (lastMessage !== null) {
      console.log(lastMessage);
      newMessages.push(lastMessage.data);
      setMessages([...newMessages]);
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const handleClickSendMessage = useCallback(() => sendMessage(userInput), [userInput]);
  const sendMessageTest = () => {
    sendMessage(userInput);
  };

  return (
    <>
      <p>Current State: {connectionStatus}</p>
      <input value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <button
        onClick={() => {
          sendMessageTest()
        }}
      >
        채팅
      </button>
      <ul>
        {messages.length > 0 && messages.map((message, index) => {
          return <p key={index}>{message}</p>
        })}
      </ul>
    </>
  );
}

export default Chat;
