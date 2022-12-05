import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <div className="homepage-container">
        <h1 className="homepage-title">Chess</h1>
        <nav className="homepage-nav">
          <li>
            <Link href="singleplayer" passHref>
              <button>Singleplayer</button>
            </Link>
          </li>
        </nav>
      </div>
    </>
  );
};

export default Home;
