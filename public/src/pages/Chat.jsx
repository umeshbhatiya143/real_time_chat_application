import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; // for api calling
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts"
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
    const navigate = useNavigate();

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

    useEffect(() => {
        (async () => {
            //if it is current user then
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);

                    // console.log(data);
                    setContacts(data.data);
                } else {
                    alert("avatar");
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
                        <ChatContainer currentChat={currentChat} />
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
background-color: #131324;
.container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px){
        grid-template-columns : 35% 65%;
    }
}
`;