import React, { useState, useRef } from "react";
import { IoMdSend, } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import styled from "styled-components";
// import Picker from "emoji-picker-react";
import InputEmoji from 'react-input-emoji'


import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 

export default function Messages({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputFile = useRef(null) ;

  const modules = {
    toolbar: [
      ['bold', 'italic', 'strike'],
      ['link'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['blockquote', 'code-block', 'snippet'],['clean'],

    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const { quill, quillRef } = useQuill({ modules, placeholder: "messages comes here...", color:"black" });
  const [text, setText] = useState('')

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        // console.log(quill.getText())
        setText(quill.getText());
      });
    }
  }, [quill]);



  function handleOnEnter(text) {
    console.log('enter', text)
  }

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    alert(text);
    let message = text;
    message += emojiObject.emoji;
    setText(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (text.length > 0) {
      handleSendMsg(text);
      setText("");
    }
  };

  const onFileButtonClick = () => {
    // `current` points to the mounted file input element
   inputFile.current.click();
  };

    const handleChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);
    //this.setState({file}); /// if you want to upload latter
    // setText(file);
    // sendChat();
}

  const customStyle = {
    marginTop:"40px",
    marginLeft:"20px",
    width: "20px",
    height:"20px",
    color:"#212F3D"
    
  }
  return (
    <Container>
      
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        
        <InputEmoji
          value={text}
          onChange={setText}
          onEnter={handleOnEnter}
          cleanOnEnter
          placeholder="Type a message"
        />
        <button type="submit" className="btn-sb">
          <IoMdSend />
        </button>
        <input type='file' 
               id='file' ref={inputFile} 
               style={{display: 'none'}}
               onChange={handleChangeFile}/>
       
        <button className="f-btn" onClick={onFileButtonClick} onChange={sendChat}> <IoAddSharp/> </button>
       
      </form>
     
     
    </Container>
  );
}

const Container = styled.div`

 

  background-color: #080420;
  height: 120px;
  
  display:flex;
 
  
  .input-container {
    width: 98%;
    
    margin:5px;
    border: 1px solid #D0D3D4  ;
    background-color:#1C2833  ;
    border-radius: 0.5rem;
    
    .btn-sb {
      
      // padding-right:2rem;
       padding:0.2rem;
      width:50px;
      height:25px;
      border-radius: 0.2rem;
      display: flex;
      background-color: green;
      border: none;
      margin:2px;
      margin-right:10px;
      float:right;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 1.3rem;
        color: white;
      }
      &:hover{
        cursor:pointer;
      }
    }

    .f-btn{
        background-color:#363A39;
        border-radius:6rem;
        width:25px;
        height:25px;
       border:none;
       margin-left:0.4rem;
       margin-top:0.5rem;

        svg{
            font-size: 1rem;
            color:white;
        }
        &:hover{
            cursor:pointer;
          }
    }
    // Button{
    //     top:50px;
    //     left:-1060px;
    //     padding:5px;
    //     @media screen and (min-width: 720px) and (max-width: 1080px) {
    //         left:-410px;
    //       }
        
    // }
   
  }
`;