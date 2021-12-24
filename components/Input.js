import { useState } from "react";
import axios from "axios";
import ImageUpload from "./ImageInput";


const ChatInput = ({ channel, username , color , addMessage , addImage}) => {
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
    const sendImage = (image) => {
      let data = {
        channel: "presence-" + channel,
        username,
        image,
        color,
        time : Date.now(),
        ack : true
      }
      addImage(data);
      axios.post(`/api/image`, data);
      
    }
    const sendMessage = (e) => {
        
      e.preventDefault();
      if (message.trim().length > 0) {
        let data = {
          channel : "presence-" + channel,
          username : username,
          message : message,
          color : color,
          time : Date.now(),
          ack : true
        };
        
      addMessage(data);  
      
        setShowErr(false);
        axios
          .post(`/api/hello`, data)
          .then(() => {
            setMessage(""); 
          });
      } else setShowErr(true);
    };
  
    return (
      <><form 
      style={{
        padding : "10px",
        margin : "0px"
      }}
      onSubmit={(e) => sendMessage(e)}>
        <input
        style={{
          marginBottom : "0px",
        }}
          type="text"
          value={message}
          onChange={(e) => handleChange(e.target.value)} />
        <button style={{
          marginTop : "0px",
          marginBottom : "0px",
        }}>
          Send
        </button>
        {showErr && <div>Enter your message</div>}
      </form><ImageUpload onUploaded={sendImage}>
        </ImageUpload></>
    );
  };
  
  export default ChatInput;