import React from 'react'
import { Link } from 'react-router-dom'

// Images
import HomeImg from '../../../assets/images/home.jpg'

function Home() {
  return (
    <div className="page-content home">
      <img className="page-img" src={HomeImg} alt="" />
      <Link to="/cards">
        <button>create cards</button>
      </Link>
    </div>
  );
}

export default Home;
