import React, { useState } from "react";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Index() {
  const [to, setTo] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");

  const sendSMS = async () => {
    try {
      const response = await fetch(
        "https://message-y4ck.onrender.com/sendsms",
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
      await toast.success("API request successful!", { autoClose: 3000 });
    } catch (error) {
      console.error(error);
      setResponse("Failed to send SMS");
    }
  };

  return (
    <div className="App">
      <ToastContainer />
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

export default Index;
