import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { UserContext } from '../../config/UserContext/UserContext';

import RightHome from '../../components/RightHome';
import Left from '../../components/Left';

import './Home.css';

const Home = () => {

    const [state] = useContext(UserContext)

    if(!state.isLogin){
        return <Redirect to="/" />
    }

    return (
        <div className="container-home">
            <Left/>
            <RightHome/>
        </div>
    )
}

export default Home;
