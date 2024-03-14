import { useEffect, useState } from "react";
import "./App.css";
import socket from "./server";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    askUserName();
  }, []);

  const askUserName = () => {
    const userName = prompt("당신의 이름을 입력하세요");

    socket.emit("login", userName, (res) => {
      setMessage(res.message);
    });
  };

  return (
    <div>
      <div className="App">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
