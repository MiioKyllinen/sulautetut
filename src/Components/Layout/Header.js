import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <h1>Ajankohtaista Vantaalta</h1>
            <Link to="/" style={linkStyle}>Home</Link> - <Link to="/weather" style={linkStyle}>Sääasema</Link> 
        </header>
    )
}
const linkStyle = {
    color:'#ffffff',
    textDecoration:'none'
}
    const headerStyle = {
    background: '#333333',
    color: '#ffffff',
    textAlign: 'center',
    padding: '10px'
}
export default Header;