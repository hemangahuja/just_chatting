import Pusher from "pusher-js";
import { useState , useEffect} from "react";
import ChatInput from "./Input";
import Messages from "./Messages";
import Image from 'next/image';

const ChatScreen = ({ channelName, userName , color}) => {
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState();

  
  useEffect(() => {
    const pusher = new Pusher('406974db40ff8341c47c', {
      cluster: 'ap2',
    });
    const channel = pusher.subscribe(channelName);
    channel.bind("message", (data) => {
      setMsg(data);
    });
    return () => {
      pusher.unsubscribe(channelName);
    };
  }, []);

  useEffect(() => {
    if (msg) setChats([...chats, msg]);
  }, [msg]);

  return (
    <div>
      <div>
        <h2 style={
          {
            color: color
          }
        }>
         { (userName == "prerna" || userName == "Prerna") ? "Hello cutiepie! " : "Hello " + userName + "! "}
        <Image src = {'/chatting.gif'} alt = 'emote' width={100} height={100}/>
        </h2>
        
        <Messages chats={chats} username={userName} myColor = {color} />
        <ChatInput channel={channelName} username={userName} color = {color}/>
      </div>
    </div>
  );
};

export default ChatScreen;