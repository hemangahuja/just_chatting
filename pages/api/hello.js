const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.MIX_PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {

  const payload = req.body;
  
  const channel = payload.channel;
  const message = payload.message;
  const username = payload.username;
  const color = payload.color;
  
  pusher.trigger(channel, "message", {
    username,
    message,
    color,
  });
  res.status(200).end();
}