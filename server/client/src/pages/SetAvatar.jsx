import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif"
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css"
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";


export default function SetAvatar(props) {

  //for generating default avatar, we just pass any random number here and it will generate random avatar
  const api = `https://api.multiavatar.com/4645646`;

  //for navigating the pages
  const navigate = useNavigate();

  //define the state for avatar
  const [avatars, setAvatars] = useState([]);
  //state for while avatar is loading
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  //toast properties for displaying error
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //when user already present redirect to login page
  useEffect(() => {

    (async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      }
    })();

  }, []);

  //set profile picture
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("chat-app-user")
      );
      console.log(user);
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageset = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };



  //generate random avatars
  useEffect(() => {
    //generate random avatar function, do that way to handle race conditions
    const handleLoadImage = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };

    handleLoadImage();
  }, []);

  return (
    <>
      {
        isLoading ? <Container >
          <img src={loader} alt="loader" className="loader" />
        </Container> : (
          <Container className="container">
            <div className="title-container" >
              <h1>Pick an Avatar as your profile picture</h1>
            </div>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    key={avatar}
                    className={`avatar ${selectedAvatar === index ? "selected" : ""
                      }`}
                  >

                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      key={avatar}
                      onClick={() => setSelectedAvatar(index)}
                      className="img-avt"
                    />
                  </div>
                );
              })}
            </div>
            <button onClick={setProfilePicture} className="submit-btn">
              Set as Profile Picture
            </button>
            <ToastContainer />
          </Container>
        )
      }

    </>
  );
}


//adding css properties

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #003333;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
    
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
        &:hover {
          cursor:pointer;
        }
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;