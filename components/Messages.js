import { useEffect } from "react";

export default function Messages({chats , username , myColor}){
    
    useEffect(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, [chats]);
    return (
        <div className="chats-container">
          {chats.map((chat , index) => {
            return (
              <div key={index}>
                {
                  chat.username === username ?
                  
                  (<div className="chat-bubble-container-right">
                    <div className="chat-bubble-right" style={
                      {
                        backgroundColor: myColor
                      }
                    }>
                      {chat.message}
                    </div>
                  </div>)
                  :
                  (<div className="chat-bubble-container-left">
                    <div className="chat-bubble-left" style={
                      {
                        backgroundColor: chat.color
                      }
                    }>
                      <div>
                      ~{chat.username}
                      </div>
                      {chat.message}
                    </div>
                      
                  </div>
                  ) 
                }
              </div>
            );
          })}
        </div>
      );
}

