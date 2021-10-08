import React, {useContext} from 'react';
import { Redirect } from 'react-router';

import { UserContext } from '../../config/UserContext/UserContext';

import './Subscribe.css';
import Left from '../../components/Left';
import RightSubs from '../../components/RightSubs';


// import RightHome from '../../components/RightHome'

const Subscribe = () => {

    const [state] = useContext(UserContext)

    if(!state.isLogin){
        return <Redirect to="/" />
    }

    return (
        <div className="container-home">
            <Left/>
            <RightSubs/>
        </div>
    )
}

export default Subscribe
