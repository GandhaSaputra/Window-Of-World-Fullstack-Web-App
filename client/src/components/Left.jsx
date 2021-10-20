import React, {useContext, useEffect, useState} from 'react'
import {Icon, DummyAvatar, ProfileIcon, SubscribeIcon, LogoutIcon} from '../assets/assets';
import { BiChat, BiUser, BiBookContent } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { UserContext } from '../config/UserContext/UserContext';
import { API } from '../config/api/api';

const Left = () => {

    const [state, dispatch] = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [statusSubs, setStatusSubs] = useState();

    const getProfile = async () => {
        try {
            const response = await API.get('/get-user-profile/');
            setProfile(response.data.data);
        } catch (error) {
            console.log(error)
        }
    };

    const avatar = profile.userPhoto;

    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT'
        })
    }
    
    useEffect(()=> {
        setStatusSubs(state.user?.transaction?.userStatus);
        getProfile();
    }, []);

    return (
        <div className="left">
            <div className="kotak">
                <Link to="/home">
                    <img src={Icon} alt="wow" className="icon"/>
                </Link>
                {avatar === "http://localhost:5000/uploads/dummy.jpg" ? <img src={DummyAvatar} alt="foto-profile-dummy" className="foto-profile"/> : <img src={profile.userPhoto} alt="foto-profile-user" className="foto-profile"/>}
                <p className="nama">{state.user.name}</p>
                {statusSubs === 'Active' ? <p className="status-subs-subscribed">Subscribed </p> : <p className="status-subs">Not Subscribed Yet </p>}
            </div>
            <hr />
            <Link to="/profile" className="left-side-link-chat">
                <p className="chat-icon"><BiUser className="chat"/> Profile</p>
            </Link>
            <Link to="/subscribe" className="left-side-link-chat">
                <p className="chat-icon"><BiBookContent className="chat"/> Subscribe</p>
            </Link>
            <Link to="/chat" className="left-side-link-chat">
                <p className="chat-icon"><BiChat className="chat"/> Chat Admin</p>
            </Link>
            <hr />
            <img style={{cursor:"pointer"}} src={LogoutIcon} alt="logout-icon" className="logout-icon" onClick={handleLogout}/>
        </div>
    )
}

export default Left
