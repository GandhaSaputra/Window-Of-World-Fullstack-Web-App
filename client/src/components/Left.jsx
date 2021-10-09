import React, {useContext, useEffect, useState} from 'react'
import {Icon, FotoProfile, ProfileIcon, SubscribeIcon, LogoutIcon} from '../assets/assets';

import { Link } from 'react-router-dom';
import { UserContext } from '../config/UserContext/UserContext';

const Left = () => {

    const [state, dispatch] = useContext(UserContext)

    const [statusSubs, setStatusSubs] = useState();

    console.log(state.user.transaction)    

    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT'
        })
    }
    
    useEffect(()=> {
        console.log(state.user?.transaction?.userStatus)
        setStatusSubs(state.user?.transaction?.userStatus);
    }, [])

    return (
        <div className="left">
            <Link to="/home">
                <img src={Icon} alt="wow" className="icon"/>
            </Link>
            <img src={FotoProfile} alt="foto-profile" className="foto-profile"/>
            <p className="nama">{state.user.name}</p>
            {statusSubs === 'Active' ? <p className="status-subs-subscribed">Subscribed </p> : <p className="status-subs">Not Subscribed Yet </p>}
            <hr />
            <Link to="/profile" className="left-side-link">
                <img src={ProfileIcon} alt="profile-icon" className="profile-icon"/>
            </Link>
            <Link to="/subscribe" className="left-side-link">
                <img src={SubscribeIcon} alt="subs-icon" className="subs-icon"/>
            </Link>
            <hr />
            <img style={{cursor:"pointer"}} src={LogoutIcon} alt="logout-icon" className="logout-icon" onClick={handleLogout}/>
        </div>
    )
}

export default Left
