import React from "react";
import "../styles/personal.css";
import defaultprofile from "../images/default_profile.png";
import Grade from "../components/grade";
import Distance from "../components/distance";
import { useAuth } from '../components/authContext';


function Personal() {
    const { isLoggedIn, user } = useAuth();
    if (isLoggedIn) {
        return (
            <>
                <div>
                    <div className="background-section">
                        <div className="background">
                            <div className="profile-container">
                                <div>
                                    <img src={defaultprofile}
                                        alt={""}
                                        className="personal-img" />
                                </div>
                                <div className="nickname">{user.nickname}</div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="main-section">
                        <Grade />
                        <Distance />
                    </div>
                </div>
            </>
        );
    }
}
export default Personal;