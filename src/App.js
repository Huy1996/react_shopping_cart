import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatBox from "./components/ChatBox";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import ScreenContainer from "./components/ScreenContainer";

export default function App() {

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <Header openSideBar={open => setSidebarIsOpen(open)} />
                </header>
                <SideBar
                    open={sidebarIsOpen}
                    closeSideBar={close => setSidebarIsOpen(close)}
                />
                <main>
                    <ScreenContainer />
                </main>
                <footer className="row center">
                    {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
                    <p>Copyright <i className={"fa fa-copyright"}/> 2021-2022 CHTQ, Inc - All Right Reserved</p>
                </footer>
            </div>
        </BrowserRouter>
    );
}
