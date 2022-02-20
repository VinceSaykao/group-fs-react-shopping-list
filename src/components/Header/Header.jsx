import React from "react";
import "./Header.css";
import logo1 from "../images/GL.png"

function Header() {
	return (
		<header className='banner-header'>
	
			<img className="logo" src={logo1}/>
			
		</header>
	);
}

export default Header;
