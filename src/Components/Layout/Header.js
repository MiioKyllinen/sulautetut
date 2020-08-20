import React from 'react';

function Header(){
    return(
        <header style={headerStyle}>
            <h1>Työpaikkoja Vantaalla</h1>
        </header>
    )
}
const headerStyle ={
    background:'#000000',
    color: '#F0FFFF',
    padding: '5px',
}
export default Header