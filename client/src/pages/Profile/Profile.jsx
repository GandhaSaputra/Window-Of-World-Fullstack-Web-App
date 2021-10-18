import React, {useContext, useState} from 'react';
import { Redirect } from 'react-router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { UserContext } from '../../config/UserContext/UserContext';

import './Profile.css'

import MyList from '../../components/list/MyList';
import Left from '../../components/Left';

import { EmailIcon, FotoProfileBesar, GenderIcon, MapsIcon, PhoneIcon, DummyAvatar } from '../../assets/assets';
import ModalEditProfile from '../../components/modal/ModalEditProfile';

const Profile = () => {
    const [showModalProfile, setShowModalProfile] = useState(false);
    const handleCloseModalProfile = () => setShowModalProfile(false);
    const handleShowModalProfile = () => setShowModalProfile(true);

    const [state] = useContext(UserContext)

    if(!state.isLogin){
        return <Redirect to="/" />
    }

    return (
        <div className="container-home">
            <Left/>
            <div className="right">
                <p className="profile-title">Profile</p>
                <Container className="profile-box">
                    <Row>
                        <Col sm={8} className="item-satu">
                            <div className="icon-group-profile">
                                <img src={EmailIcon} alt="email" />
                                <img src={GenderIcon} alt="gender"/>
                                <img src={PhoneIcon} alt="phone" />
                                <img src={MapsIcon} alt="maps" />
                            </div>
                            <div className="text-group-profile">
                                <div className="top-group-profile">
                                    <p className="text-data-profile text-satu">{state.user.email}</p>
                                    <p className="text-label-profile">Email</p>
                                </div>
                                <div>
                                    <p className="text-data-profile text-dua">{state.user.profile.gender}</p>
                                    <p className="text-label-profile">Gender</p>
                                </div>
                                <div>
                                    <p className="text-data-profile text-tiga">{state.user.profile.phone}</p>
                                    <p className="text-label-profile">Mobile Phone</p>
                                </div>
                                <div>
                                    <p className="text-data-profile text-empat">{state.user.profile.address}</p>
                                    <p className="text-label-profile">Address</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={4} className="item-dua">
                            <img className="foto-profil-besar" src={DummyAvatar} alt="foto-profil-besar" />
                            <Button className="btn-edit-profile" onClick={handleShowModalProfile}>Edit Profile</Button>
                        </Col>
                    </Row>
                </Container>
                <p className="title-my-list-book">My List Book</p>
                <MyList/>
            </div>
            <ModalEditProfile show={showModalProfile} onHide={handleCloseModalProfile} centered/>
        </div>
    )
}

export default Profile;
