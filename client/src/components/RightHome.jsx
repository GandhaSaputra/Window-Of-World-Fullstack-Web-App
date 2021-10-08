import React from 'react'

import List from '../components/list/List';
import {Banner} from '../assets/assets';

const Right = () => {
    return (
        <div>
            <div className="right">
                <img src={Banner} alt="Banner" className="banner"/>
                <p className="text-list-book">List Book</p>
                <div>
                    <List/>
                </div>
            </div>
        </div>
    )
}

export default Right
