import {useEffect , useState} from 'react'
const Pusher = require("pusher-js");
import axios from 'axios';

export default function Home() {
  
  const [userName, setUserName] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const pusher = new Pusher(process.env.APP_KEY, {
    cluster: process.env.APP_CLUSTER,
  });


  useEffect(() => {
    const channel = pusher.subscribe("my-channel");

    // updates chats
    channel.bind("my-event", function (data) {
      setMessages((prevState) => [
        ...prevState,
        { sender: data.sender, message: data.message },
      ]);
    });

    return () => {
      pusher.unsubscribe("my-channel");
    };
  }, []);


  let pushData = async () => {
    if(message.length == 0 || userName.length == 0) {
      alert('Please enter a message and a user name');
      return;
    }
    await axios.post("/api/hello", {
      message: message,
      sender: userName,
    });
  }

  return (
    <>
    <script src="https://js.pusher.com/7.0/pusher.min.js"></script>
    <link rel="stylesheet" href="https://cdn.rawgit.com/kimeiga/bahunya/css/bahunya-0.1.3.css"/>
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Chat</h5>
              <div className="input-group mb-3">
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <div className="input-group-append">
                </div>
              </div>
              <div className="input-group mb-3">
                <input

                  type="text"
                  className="form-control"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="input-group-append">
                  <button

                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => pushData()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Messages</h5>
              <ul className="list-group">
                {messages.map((message) => (
                  <li className="list-group-item">
                    <div className="badge badge-primary badge-pill">
                      Sender : {message.sender}
                    </div>
                      Message : {message.message}
                  </li>
                ))}
              </ul>
              </div>
              </div>
              </div>
      </div>
    </div>
    </>
  );

}
