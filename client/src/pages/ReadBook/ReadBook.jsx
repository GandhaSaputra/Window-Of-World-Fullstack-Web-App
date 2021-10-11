import React, {useContext, useState, useEffect} from 'react'
import { BookContent, Icon } from '../../assets/assets'
import { Link, useHistory } from 'react-router-dom'
import './ReadBook.css'
import { ReactReader } from "react-reader"

import { UserContext } from '../../config/UserContext/UserContext';
import { Redirect, useParams } from 'react-router';
import { API } from '../../config/api/api';

const ReadBook = () => {

    let { id } = useParams();
    let history = useHistory();

    const [state] = useContext(UserContext)
    const [book, setBook] = useState({});

    const getBook = async () => {
        try {
            const response = await API.get('/book/' + id);
            setBook(response.data.data.book);
        } catch (error) {
            console.log(error)
        }
    };

    console.log(book.bookFile)

    const [location, setLocation] = useState(null);
    const locationChanged = (epubcifi) => {
        setLocation(epubcifi);
    }

    const handleBackToHome = () => {
        history.push("/home")
    }

    useEffect(() => {
        getBook();
    }, [])


    // if(!state.isLogin){
    //     return <Redirect to="/" />
    // }

    return (
        <>  
            <img className="icon-wow-read-book" src={Icon} alt="icon" onClick={handleBackToHome} />
            <div style={{height: '80vh', position: 'relative'}} className="book-content">
                <ReactReader title={book?.title} location={location} locationChanged={locationChanged} url={book?.bookFile} />
            </div>
        </>
    )
}

export default ReadBook
