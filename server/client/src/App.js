import React from "react";
import {createBrowserRouter,RouterProvider, Route, createRoutesFromElements} from "react-router-dom";
import SetAvatar from "./pages/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contacts from "./components/Contacts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path="/register" element={<Register /> } />
    <Route path="/login" element={<Login /> } />
    <Route path="/setAvatar"  element={<SetAvatar /> } />
    <Route path="/" element={<Chat /> } />
    </ Route>
  )
)
export default function App(){
  return <RouterProvider router={router} />;
}