const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.APP_KEY,
  secret: process.env.APP_SECRET,
  cluster: process.env.APP_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  const { message, sender } = req.body;
  await pusher.trigger("my-channel", "my-event", {
    message,
    sender,
  });

  res.json({ message: "completed" });
}