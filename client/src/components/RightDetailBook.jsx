import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import {IconReadBook, IconAddMyList} from '../assets/assets';

import { API } from '../config/api/api'

const RightDetailBook = () => {
    let { id } = useParams();

    console.log(id)

    const [book, setBook] = useState({});

    const getBook = async () => {
        try {
            const response = await API.get('/book/' + id);
            setBook(response.data.data.book);
        } catch (error) {
            console.log(error)
        }
    };

    console.log(book)

    useEffect(() => {
        getBook();
    }, [])
    
    // const data = [...bookData];

    // const {name, penulis, image, publicationDate, pages, isbn, aboutBook} = data[id];

    return (
        <div className="right right-detail-book">
            <div className="container-detail-book">
                <img src={book?.bookFile} alt="test" className="img-detail-book"/>
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
                    <Link to="/profile">
                        <img src={IconAddMyList} alt="addMyList" />
                    </Link>
                    <Link to="/read-book">
                        <img src={IconReadBook} alt="ReadBook" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RightDetailBook;
