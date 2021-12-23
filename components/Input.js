import { useState } from "react";
import axios from "axios";

const ChatInput = ({ channel, username , color}) => {
    const [message, setMessage] = useState("");
    const [showErr, setShowErr] = useState(false);
    const [canSend, setCanSend] = useState(true);
    const throttle = 200;

    const handleChange = (e) =>{
      setMessage(e);
        if(canSend){
          axios.post(`/api/typing`, {
            channel: "presence-" + channel,
            username,
          });

          setCanSend(false);
          setTimeout(() => {
            setCanSend(true);
          }, throttle);
      
      }
    }
    const sendMessage = (e) => {
        
      e.preventDefault();
      if (message.trim().length > 0) {
        let data = {
          channel : "presence-" + channel,
          username : username,
          message : message,
          color : color
        };
        
        setShowErr(false);
        axios
          .post(`/api/hello`, data)
          .then(() => {
            setMessage(""); 
          });
      } else setShowErr(true);
    };
  
    return (
      <form  onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          value={message}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button >
          Send
        </button>
        {showErr && <div >Enter your message</div>}
      </form>
    );
  };
  
  export default ChatInput;