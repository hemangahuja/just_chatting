const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {

  console.log(process.env.PUSHER_APP_KEY);
  console.log(process.env.PUSHER_APP_SECRET);
  console.log(process.env.PUSHER_APP_CLUSTER);
  console.log(process.env.PUSHER_APP_ID);

  const payload = req.body;
  
  const channel = payload.channel;
  const message = payload.message;
  const username = payload.username;
  const color = payload.color;
  
  await pusher.trigger(channel, "message", {
    username,
    message,
    color,
  });
  res.status(200).end();
}
