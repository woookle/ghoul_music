import React from "react";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Catalog from "./components/Catalog/Catalog";
import { ToastContainer } from "react-toastify";
import Register from "./components/Register/Register";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login/Login";
import MyMusic from "./components/MyMusic/MyMusic";
import Favorites from "./components/Favorites/Favorites";
import Me from "./components/Me/Me";
import Profile from "./components/Profile/Profile";
import UploadMusic from "./components/UploadMusic/UploadMusic";
import DynamicTitle from "./components/DynamicTitle/DynamicTitle";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="content">
        <Routes> 
          <Route path="/" Component={Main} />
          <Route path="/catalog" Component={Catalog} />
          <Route path="/register" Component={Register} />
          <Route path="/login" Component={Login} />
          <Route path="/mymusic" Component={MyMusic} />
          <Route path="/favorites" Component={Favorites} />
          <Route path="/me" Component={Me} />
          <Route path="/profile/:id" Component={Profile} />
          <Route path="/uploadmusic" Component={UploadMusic} />
        </Routes>
      </main>
      <Footer />
      <MusicPlayer />
      <DynamicTitle />
      <ToastContainer
        theme="dark"
        closeOnClick={true}
        autoClose={2000}
        style={{ marginTop: "100px" }}
      />
    </div>
  );
}

export default App;
