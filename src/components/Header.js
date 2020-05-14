import React from 'react';
import './Header.scss';

function Header () {
    return (
        <header className='header'>
            <div className='flex-container'>
                <img style={{height:'100px'}} src='./images/trollface.png' title='trollface' alt='a smirking troll face'/>
                <h1>Meme Generator</h1>
            </div>
        </header>
    )
}

export default Header;