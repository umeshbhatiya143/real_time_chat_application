import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios"; // for api calling
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts"
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import chatBack from "../assets/chatBack3.jpg"

function Chat() {
    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            //first it will check current user or not if yes then navigate to login page
            if (!localStorage.getItem("chat-app-user")) {
                navigate("/login");
            }
            //if not then set the current user
            else {
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
                setIsLoaded(true);
            }
        })();
    }, []);
    
    //when current user is change we add it to map that is defined in backend
    useEffect(()=>{
        if(currentUser){
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    })

    useEffect(() => {
        (async () => {
            //if it is current user then
            if (currentUser) {
                if (currentUser.isAvatarImageset) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);

                    // console.log(data);
                    setContacts(data.data);
                } else {
                    navigate("/setAvatar");
                }
            }
        })();
    }, [currentUser]);

    //if we have chat then save it
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    return (
        <Container>
            <div className="container">
                <Contacts
                    contacts={contacts}
                    currentUser={currentUser}
                    changeChat={handleChatChange} 
                />
                {
                    //if chat selected refer to messaging otherwise welcome page
                   isLoaded && currentChat === undefined ? (
                           <Welcome currentUser={currentUser} />
                    ) : (
                        <ChatContainer 
                        currentChat={currentChat} 
                        currentUser={currentUser}
                        socket = {socket}
                        />
                    )
                }
                
            </div>
        </Container>
    )
}

export default Chat;

const Container = styled.div`
height : 100vh;
widhtL 100vh;
display : flex;
flex-direction: column;
justify-content: center;
gap : 1rem;
align-items: center;

background-image: url(${chatBack});
opacity:1rem;
.container {
    height: 100vh;
    width: 100vw;
    border-radius: 1rem;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px){
        grid-template-columns : 35% 65%;
    }
}
`;