import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

const Logs = (props) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const socket = io.connect("http://localhost:9001");
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      socket.emit("subscribe", `logs:${props.slug}`);
    });

    socket.on("message", (message) => {
      setLogs((prevLogs) => [...prevLogs, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [props.slug]);

  return (
    <div className="log-body">
      <div className="logs">
        <h5>Logs</h5>
      </div>
      <ScrollToBottom className="scroll">
        {logs.map((log, index) => {
          return ( 
            <div className="log">
              <p key={index}>&gt;&nbsp;{log}</p>
            </div>
          );
        })}
      </ScrollToBottom>
    </div>
  );
};

export default Logs;
