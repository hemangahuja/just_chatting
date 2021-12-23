import Channel from "../components/Channel";
import Router from "next/router";

export default function Home(){
      const navigate = (channelName, userName,color) => {
        Router.push({
          pathname: `/channel/${channelName}/userName/${userName}`,
          query: {
            color
          },
          as: `/channel/${channelName}/userName/${userName}`
        });
      };
      return (

          <div>
              <Channel handleJoinBtn={navigate}/>
          </div>
      )
}