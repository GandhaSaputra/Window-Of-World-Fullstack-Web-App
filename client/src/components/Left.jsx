import React, {useContext, useEffect, useState} from 'react'
import {Icon, DummyAvatar, ProfileIcon, SubscribeIcon, LogoutIcon} from '../assets/assets';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { UserContext } from '../config/UserContext/UserContext';

const Left = () => {

    const [state, dispatch] = useContext(UserContext)

    const [statusSubs, setStatusSubs] = useState();

    // const isAvatar

    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT'
        })
    }
    
    useEffect(()=> {
        setStatusSubs(state.user?.transaction?.userStatus);
    }, []);

    return (
        <div className="left">
            <div className="kotak">
                <Link to="/home">
                    <img src={Icon} alt="wow" className="icon"/>
                </Link>
                {/* {avatar ? <img src={state.user.profile.userPhoto} alt="foto-profile-user" className="foto-profile"/>} */}
                <img src={DummyAvatar} alt="foto-profile-dummy" className="foto-profile"/>
                <p className="nama">{state.user.name}</p>
                {statusSubs === 'Active' ? <p className="status-subs-subscribed">Subscribed </p> : <p className="status-subs">Not Subscribed Yet </p>}
            </div>
            <hr />
            <Link to="/profile" className="left-side-link">
                <img src={ProfileIcon} alt="profile-icon" className="profile-icon"/>
            </Link>
            <Link to="/subscribe" className="left-side-link">
                <img src={SubscribeIcon} alt="subs-icon" className="subs-icon"/>
            </Link>
            <Link to="/chat" className="left-side-link">
                <span> Chat Admin</span>
            </Link>
            <hr />
            <img style={{cursor:"pointer"}} src={LogoutIcon} alt="logout-icon" className="logout-icon" onClick={handleLogout}/>
        </div>
    )
}

export default Left
