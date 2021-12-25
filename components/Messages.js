import { useEffect } from "react";

export default function Messages({chats , username , myColor}){
    
    useEffect(() => {
      console.log("chats" , chats);
      let chat = document.getElementsByClassName("chats-container");
      chat[0].scrollTop = chat[0].scrollHeight;
    }, [chats]);
    const hoursMinutesString = (time) => {
      const date = new Date(time);
      let hours = date.getHours();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      let minutes = date.getMinutes();
      if(minutes < 10){
        minutes = "0" + minutes;
      }
      return hours + ":" + minutes + " " + ampm;
    };
    const scrollbarStyle = {
      scrollbarColor : myColor + `white`
    }
    return (
        <div className="chats-container" style={scrollbarStyle}>
          {chats.map((item , index) => {
            return (
              <div key={index}>
                {
                  item.type == "image" ? (
                    <div>
                      {item.data.username === username ? (
                        <div className="chat-bubble-container-right">
                          <div className="chat-bubble-left" style={{backgroundColor:item.data.color}}>
                            <img className ="chat-image" src={item.data.image} alt="image" width={150} height={200} />
                            <div
                               className="time">{hoursMinutesString(item.data.time)}{item.data.ack ? <span className="ack"> ✔</span> : null}
                            </div>

                          </div>
                        </div>
                      ) : (
                        <div className="chat-bubble-container-left">
                          <div className="chat-bubble-left" style={{borderRadius : "20%", color : item.data.color, background:"black" , padding : "0.2rem"}}>
                            ~{item.data.username}
                            <img className = "chat-image" src={item.data.image} alt="image" width={150} height={200} />
                            <div
                               className="time">{hoursMinutesString(item.data.time)}
                            </div>
                          </div>
                          
                        </div>
                      )}
      
                    </div>
            ) : (
                  item.type == "update" ? (
                    <div className="chat-update" style={{color : item.data.color}}>
                      {item.data.message}
                    </div>
                  ) : 
                    (
                  item.data.username === username ?
                  
                  (<div className="chat-bubble-container-right">
                    <div className="chat-bubble-right" style={
                      {
                        backgroundColor: myColor
                      }
                    }>
                      {item.data.message}
                      <div className="time">
                      {hoursMinutesString(item.data.time)}
                      {item.data.ack ? <span className="ack"> ✔</span> : null}
                      </div>
                    </div>
                  </div>)
                  :
                  (<div className="chat-bubble-container-left">
                    <div className="chat-bubble-left" style={
                      {
                        backgroundColor: item.data.color
                      }
                    }>
                      <div style={
                        {borderRadius : "20%", color : item.data.color, background:"mintcream" , padding : "0.2rem" , width : "fit-content" , fontSize : "0.9rem"}
                      }>
                      ~{item.data.username}
                      </div>
                      {item.data.message}
                      <div className="time">
                      {hoursMinutesString(item.data.time)}
                      </div>
                    </div>
                  </div>
                  ) 
                  ))
                }
              </div>
            );
          })}
        </div>
      );
}

