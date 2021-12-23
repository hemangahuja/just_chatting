const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});



export default async function Auth(req,res){

    const randomID = Math.random().toString(36).slice(2);
    const randomInfo = Math.random().toString(36).slice(2);
    const sockID = req.body.socket_id;
    const channel = req.body.channel_name;
    const presenceData = {
        user_id: randomID,
        user_info: {
            name: randomInfo
        }
    }
    try{
        const auth = pusher.authenticate(sockID, channel , presenceData);
        
        res.send(auth);
    }catch(e){
        
    }
}