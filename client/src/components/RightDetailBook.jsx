import React, {useContext, useEffect, useState} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom';
import {IconReadBook, IconAddMyList} from '../assets/assets';

import { API } from '../config/api/api'
import { UserContext } from '../config/UserContext/UserContext';

const RightDetailBook = () => {

    let history = useHistory();
    let { id } = useParams();

    const [state] = useContext(UserContext)
    const [book, setBook] = useState({});
    // const [isBookMyList, setIsBookMyList] = useState(false);

    const getBook = async () => {
        try {
            const response = await API.get('/book/' + id);
            setBook(response.data.data.book);
        } catch (error) {
            console.log(error)
        }
    };

    const handleAddMyList = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const data = {
                idUser: state.user.id,
                idBook: id
            }
            const body = JSON.stringify(data);
            await API.post("/add-book-to-user-list", body, config);
            history.push('/profile');
        } catch (error) {
            console.log(error)
        }
    }

    const userBookLists = state.user.userBookLists

    console.log()

    let isBookMyList = false
  
    
    useEffect(() => {
        getBook();
    }, [])

    userBookLists.forEach((e) => {
        if(e.id === book.id){
            isBookMyList = true;
        }
    })

    return (
        <div className="right right-detail-book">
            <div className="container-detail-book">
                <img src={book?.bookCover} alt="test" className="img-detail-book"/>
                <div className="text-group-detail-book">
                    <div>
                        <p className="detail-book-name">{book?.title}</p>
                        <p className="detail-book-grey-text">{book?.author}</p>
                    </div>
                    <div>
                        <p className="detail-book-date-pages-isbn">Publication date</p>
                        <p className="detail-book-grey-text">{book?.publicationDate}</p>
                    </div>
                    <div>
                        <p className="detail-book-date-pages-isbn">Pages</p>
                        <p className="detail-book-grey-text">{book?.pages}</p>
                    </div>
                    <div>
                        <p className="detail-book-date-pages-isbn detail-book-isbn">ISBN</p>
                        <p className="detail-book-grey-text">{book?.isbn}</p>
                    </div>
                </div>
            </div>
            <div className="container-about-book">
                <p className="about-book-title">About This Book </p>
                <p className="about-book-desc">{book?.about}</p>
                <div className="abaout-book-button-group">
                    {isBookMyList? <></> : <img src={IconAddMyList} onClick={handleAddMyList} alt="addMyList" />}
                    <Link to={`/read-book/${book.id}`}>
                        <img src={IconReadBook} alt="ReadBook" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RightDetailBook;
