import { useEffect } from "react";

export default function Messages({chats , username , myColor}){
    
    useEffect(() => {
      window.scrollTo(0, document.body.scrollHeight);
      console.log(chats);
    }, [chats]);
    return (
        <div className="chats-container">
          {chats.map((item , index) => {
            return (
              <div key={index}>
                {
                  item.type == "update" ? (
                    <div className="chat-update" style={{color : item.data.color}}>
                      {item.data.message}
                    </div>
                  ) : (
                  item.data.username === username ?
                  
                  (<div className="chat-bubble-container-right">
                    <div className="chat-bubble-right" style={
                      {
                        backgroundColor: myColor
                      }
                    }>
                      {item.data.message}
                    </div>
                  </div>)
                  :
                  (<div className="chat-bubble-container-left">
                    <div className="chat-bubble-left" style={
                      {
                        backgroundColor: item.data.color
                      }
                    }>
                      <div>
                      ~{item.data.username}
                      </div>
                      {item.data.message}
                    </div>
                      
                  </div>
                  ) 
                  )
                }
              </div>
            );
          })}
        </div>
      );
}

