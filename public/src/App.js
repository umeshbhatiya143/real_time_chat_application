import React from "react";
import {createBrowserRouter,RouterProvider, Route, createRoutesFromElements} from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path="/register" element={<Register /> } />
    <Route path="/login" element={<Login /> } />
    <Route path="/" element={<Chat /> } />
 </Route>
  )
)
export default function App(){
  return <RouterProvider router={router} />;
}