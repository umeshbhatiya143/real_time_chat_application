import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";

export default function Welcome({currentUser}){

    return (
        <Container>
            <div className="welcome-header">

            <Logout />
            </div>
            <div className="robot">

            <img src={Robot} alt="Robot" />
            <h1>
                Welcome, <span>{currentUser.username}!</span>
            </h1>
            <h3>Please select a chat to start Messaging.</h3>
            </div>
        </Container>
    )
}

const Container = styled.div`

background-color: #003333;
   .robot{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    color: white;
    img{
     height: 25rem;
    }
    span{
     color: #FF6633;
    }
   }
  
   .welcome-header{
   display:flex;
   justify-content:flex-end;
   margin-top:40px;
   margin-right:40px;
   
    
    
    
   
   }
`;