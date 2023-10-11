import React, { useState } from "react";
import "./App.css"

function App() {
  const [to, setTo] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");

  const sendSMS = async () => {
    try {
      const response = await fetch("https://message-y4ck.onrender.com/sendsms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ to, body }),
        }
      );

      const data = await response.json();
      setResponse(data.message);
    } catch (error) {
      console.error(error);
      setResponse("Failed to send SMS");
    }
  };

  return (
    <div className="App">
      <h1>Send SMS</h1>
      <div>
        <label>To:</label>
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>
      <div>
        <label>Message:</label>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button onClick={sendSMS}>Send SMS</button>
      <div>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
