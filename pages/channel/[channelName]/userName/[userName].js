import {useRouter} from "next/router";
import ChatScreen from "../../../../components/ChatScreen";
import {useState , useEffect} from "react";

export default function Home() {
    
    const router = useRouter();
    const { channelName, userName , color} = router.query;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(!router.isReady){
            return;
        }
        setLoading(false);
    }, [router])
    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ChatScreen channelName={channelName} userName={userName} color = {color}/>
            )}
        </div>
    )
}
