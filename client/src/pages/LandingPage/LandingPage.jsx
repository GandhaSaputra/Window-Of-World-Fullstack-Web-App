import React from 'react';
import {useState} from 'react';

import './LandingPage.css';
import {Icon, Vector} from '../../assets/assets'

import ModalSignUp from '../../components/modal/ModalSignUp';
import ModalSignIn from '../../components/modal/ModalSignIn';


function LandingPage() {
  const [showSignUp, setShow] = useState(false);
  const handleCloseSignUp = () => setShow(false);
  const handleShowSignUp = () => setShow(true);

  const [showSignIn, setShowSingIn] = useState(false);
  const handleCloseSignIn = () => setShowSingIn(false);
  const handleShowSignIn = () => setShowSingIn(true);
  return (
    <>
        <div className="text-group">
            <img className="icon-lp" src={Icon} alt="Book" />
            <p className="text-lp">Sign-up now and subscribe to enjoy all the cool and latest books - The best book rental service provider in Indonesia</p>
            <div className="btn-group">
                <button className="btn-signup" onClick={handleShowSignUp}>Sign Up</button>
                <button className="btn-signin" onClick={handleShowSignIn}>Sign In</button>
            </div>
        </div>
        <img className="img-background" src={Vector} alt="Book" />

        <ModalSignUp show={showSignUp} onHide={handleCloseSignUp} handleShowSignIn={handleShowSignIn} centered/>

        <ModalSignIn show={showSignIn} onHide={handleCloseSignIn} handleShowSignUp={handleShowSignUp} className="modal-signin" centered/>

    </>
  );
}

export default LandingPage;