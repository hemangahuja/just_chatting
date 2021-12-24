
import { useState , useEffect} from 'react';
import {initializeApp} from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey : process.env.FIREBASE_API_KEY,
    authDomain : process.env.FIREBASE_AUTH_DOMAIN,
    projectID : process.env.FIREBASE_PROJECT_ID,
    storageBucket : "just-chatting-4eebb.appspot.com",
    messagingSenderId : process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId : process.env.FIREBASE_APP_ID,
}        

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default function ImageUpload({onUploaded}) {

    
   const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.addEventListener('paste', e => {
            console.log(e.clipboardData.files[0]);
            if(e.clipboardData.files[0].size > 5000000){
                setError('Image size should be less than 5MB');
                document.getElementById('image-input').value = '';
                return;
            }
            setImage(e.clipboardData.files[0]);
            document.getElementById('image-message').files = e.clipboardData.files;
            setError(null);
        })
        return () => {
            window.removeEventListener('paste', e => {
                setImage(e.clipboardData.files[0]);
            })
        }
    }, [])
    const handleChange = e => {
        if(e.target.files[0]){
            console.log(e.target.files[0]);
            if(e.target.files[0].size > 5000000){
                setError('Image size should be less than 5MB');
                document.getElementById('image-message').value = '';
                return;
            }
            setImage(e.target.files[0]);
            setError(null);
        }
    }
    const handleUpload = () => {
        if(!image){
            setError("No image selected");
            return;
        }
        const storageRef = ref(storage , `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed', 
            (snapshot) => {
                return;
            },
        (error) => {
            setError(error);
        },
        () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setError(null);
                    onUploaded(url);
                });
            })
        }

    return (
        <div>
            <input style={{
              
                margin : "0px",
            }}
            id = "image-message" type="file" accept='image/*' onChange={handleChange}/>
            <button style={{
                marginLeft : "10px",
            }}
            onClick={handleUpload}>Upload</button>
            {error}
        </div>
    )
}