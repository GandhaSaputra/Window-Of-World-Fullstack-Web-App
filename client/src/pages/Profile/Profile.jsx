import React, {useContext, useEffect, useState} from 'react';
import { Redirect } from 'react-router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { UserContext } from '../../config/UserContext/UserContext';

import './Profile.css'

import MyList from '../../components/list/MyList';
import Left from '../../components/Left';

import { EmailIcon, FotoProfileBesar, GenderIcon, MapsIcon, PhoneIcon, DummyAvatar } from '../../assets/assets';
import ModalEditProfile from '../../components/modal/ModalEditProfile';
import { API } from '../../config/api/api';

const Profile = () => {
    const [showModalProfile, setShowModalProfile] = useState(false);
    const handleCloseModalProfile = () => setShowModalProfile(false);
    const handleShowModalProfile = () => setShowModalProfile(true);
    const [profile, setProfile] = useState({});

    const [state] = useContext(UserContext)

    const getProfile = async () => {
        try {
            const response = await API.get('/get-user-profile/');
            setProfile(response.data.data);
        } catch (error) {
            console.log(error)
        }
    };

    const avatar = profile.userPhoto

    useEffect(()=> {
        getProfile();
    }, []);

    if(!state.isLogin){
        return <Redirect to="/" />
    }

    return (
        <div className="container-home">
            <Left getProfile={getProfile} data={profile}/>
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
                                    <p className="text-data-profile text-dua">{profile.gender}</p>
                                    <p className="text-label-profile">Gender</p>
                                </div>
                                <div>
                                    <p className="text-data-profile text-tiga">{profile.phone}</p>
                                    <p className="text-label-profile">Mobile Phone</p>
                                </div>
                                <div>
                                    <p className="text-data-profile text-empat">{profile.address}</p>
                                    <p className="text-label-profile">Address</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={4} className="item-dua">
                            {avatar === "http://localhost:5000/uploads/dummy.jpg" ? <img src={DummyAvatar} alt="foto-profile-dummy" className="foto-profil-besar"/> : <img src={profile.userPhoto} alt="foto-profile-user" className="foto-profil-besar"/>}
                            <Button className="btn-edit-profile" onClick={handleShowModalProfile}>Edit Profile</Button>
                        </Col>
                    </Row>
                </Container>
                <p className="title-my-list-book">My List Book</p>
                <MyList/>
            </div>
            <ModalEditProfile show={showModalProfile} onHide={handleCloseModalProfile} getProfile={getProfile} centered/>
        </div>
    )
}
// className="foto-profil-besar"
export default Profile;
