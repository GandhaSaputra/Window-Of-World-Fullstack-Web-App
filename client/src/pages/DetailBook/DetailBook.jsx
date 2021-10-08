import React, {useContext} from 'react'
import Left from '../../components/Left'
import RightDetailBook from '../../components/RightDetailBook'
import './DetailBook.css'

import { UserContext } from '../../config/UserContext/UserContext';
import { Redirect } from 'react-router';

const DetailBook = () => {

    const [state] = useContext(UserContext)

    
    if(!state.isLogin){
        return <Redirect to="/" />
    }

    return (
        <div className="container-home">
            <Left/>
            <RightDetailBook/>
        </div>
    )
}

export default DetailBook
