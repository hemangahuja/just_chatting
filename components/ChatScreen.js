import Pusher from "pusher-js";
import { useState , useEffect} from "react";
import ChatInput from "./Input";
import Messages from "./Messages";
import Image from 'next/image';

const ChatScreen = ({ channelName, userName , color}) => {
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState();
  const [typingText, setTypingText] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const clearInterval = 900;
  var clearTimer;
  useEffect(() => {
    const pusher = new Pusher('406974db40ff8341c47c', {
      cluster: 'ap2',
      authEndpoint : "/api/auth",
      auth: {
        params: {
          username : userName,
          color
        }
      }
    });
    const channel = pusher.subscribe("presence-" + channelName);

    channel.bind("pusher:subscription_succeeded",(members) => {
      console.log("members" , members);
      setTotalUsers(members.count);
    });
    channel.bind("pusher:member_added",(member) => {
      console.log(member);
      setMsg({
        type : "update",
        data :{
          message : `${member.info.name} has joined the channel :)`,
          color : member.info.color
        }}); 
      setTotalUsers(channel.members.count);
    });
    channel.bind("pusher:member_removed",(member) => {
      console.log(member);
      setMsg({
        type : "update",
        data :{
          message : `${member.info.name} has left the channel :(`,
          color : member.info.color
        }}); 
      setTotalUsers(channel.members.count);
    });
    channel.bind("message", (data) => {
      setMsg({
        type : "message",
        data
      });
    });

    channel.bind("typing", ({username}) => {
      console.log(username);
      if(username !== userName){
      setTypingText(`${username} is typing...`);
      clearTimeout(clearTimer);
      clearTimer = setTimeout(() => {
        setTypingText('');
      }, clearInterval);
      }
    });

    return () => {
      pusher.unsubscribe("presence-" + channelName);
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
        <div>
          There are {totalUsers} users in channel <i>{channelName}</i> !
        </div>
        <Messages chats={chats} username={userName} myColor = {color} />
        <div>
          {typingText && <div>{typingText}</div>}
        </div>
        <ChatInput channel={channelName} username={userName} color = {color}/>
      </div>
    </div>
  );
};

export default ChatScreen;