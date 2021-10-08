import React, {useContext} from 'react'
import { BookContent, Icon } from '../../assets/assets'
import { Link } from 'react-router-dom'
import './ReadBook.css'


import { UserContext } from '../../config/UserContext/UserContext';
import { Redirect } from 'react-router';

const ReadBook = () => {

    const [state] = useContext(UserContext)

    if(!state.isLogin){
        return <Redirect to="/" />
    }

    return (
        <div>
            <Link to="/home">
                <img className="icon-wow-read-book" src={Icon} alt="icon" />
            </Link>
            <img className="book-content" src={BookContent} alt="Book Content" />
        </div>
    )
}

export default ReadBook
