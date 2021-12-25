import { useState } from "react";


export default function Channel({ handleJoinBtn }){
    const [channelName, setChannelName] = useState("");
    const [userName, setUserName] = useState("");
    const colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];
    const [showError, setShowError] = useState('');
    const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)]);
    const handleSubmit = (e) => {
      e.preventDefault();
      if (channelName.trim().length !== 0 && userName.trim().length !== 0 ){
        if(channelName.indexOf(" ") !== -1){
          setShowError("No spaces allowed in channel name");
          return;
        }
        handleJoinBtn(channelName.trim(), userName.trim() , color);
        setShowError('');
        setChannelName("");
        setUserName("");
      } else {
        setShowError('Please enter a channel name and username');
      }
    };

    return (
      <div >
        <h1 style={
          {
            color: color,
          }
        }>Just Chatting</h1>
        <form onSubmit={(e) => handleSubmit(e)} >
          <div> {showError}  </div>
          <div>
            <span style={
              {
                width : "100px",
                marginRight : "10px"
              }
            }>Enter Channel Name</span>
            <input
              type="text"
              
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>
          <div >
            <span style={
              {
                width : "100px",
                marginRight : "10px"
              }
            } >Enter your Name</span>
            <input
              type="text"
              value={userName}
              
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="choose-color-container">
            Choose your color (randomized if not chosen)
            {colors.map((color , index) => (
              <div key={index}
                style={{
                  backgroundColor: color,
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  margin: "5px",
                  cursor: "pointer",  
                }}
                onClick={() => setColor(color)}
              />
            ))}
          </div>
          <div >
            <button type="submit" >
              Join
            </button>
          </div>
        </form>
      </div>
    );
}