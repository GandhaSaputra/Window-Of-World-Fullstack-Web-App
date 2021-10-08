import React, {useContext, useState} from 'react';
import { Card } from 'react-bootstrap';
import { UserContext } from '../../config/UserContext/UserContext';

import ModalSubsDanger from '../modal/ModalSubsDanger';

import { Link } from 'react-router-dom';

export default function MyBookList({ data }) {

  const [showModalSubsDanger, setShow] = useState(false);
  const handleCloseModalSubsDanger = () => setShow(false);
  const handleShowModalSubsDanger = () => setShow(true);

  const [state] = useContext(UserContext)

  const statusSubs = state.user.statusSubs;

  return (
    <>
      <Card className="card-book mb-3">
        {statusSubs === 'Subscribed' ? <Link to={`/detail-book/${data.id}`}>
          <Card.Img variant="top" src={data.image}/></Link> : <Card.Img variant="top" src={data.image} onClick={handleShowModalSubsDanger} style={{cursor: "pointer"}}/>
        }
        <Card.Body>
          <Card.Title className="book-title">{data.name}</Card.Title>
          <Card.Text className="book-penulis">{data.penulis}</Card.Text>
        </Card.Body>
      </Card>

      <ModalSubsDanger show={showModalSubsDanger} onHide={handleCloseModalSubsDanger}/>
    </>
  );
}