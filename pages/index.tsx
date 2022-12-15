import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Home: NextPage = () => {
  const [isBotChoiceVisible, setIsBotChoiceVisible] = useState(false);
  const [color, setColor] = useState("random");
  const botButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const handleBotButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBotChoiceVisible((prevValue) => !prevValue);
  };
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.value) setColor(e.target.value);
  };
  return (
    <>
      <div className="homepage-container">
        <h1 className="homepage-title">Chess</h1>
        <nav className="homepage-nav">
          <li>
            <Link href="singleplayer" passHref>
              <button>Singleplayer</button>
            </Link>
            <button onClick={handleBotButtonClick}>Bot</button>
          </li>
        </nav>
      </div>
      {isBotChoiceVisible && (
        <div className="bot-container">
          <button className="exit" onClick={handleBotButtonClick}>
            X
          </button>

          <div className="bot-section-container">
            <p>Choose Color</p>
            <form className="choose-color-form">
              <label>
                <input type="radio" name="color" value="white" checked={color === "white"} onChange={handleColorChange} />
                <Image src={"/rookWhite.png"} height={150} width={150} alt="white rook" />
                <p>White</p>
              </label>
              <label>
                <input type="radio" name="color" value="random" checked={color === "random"} onChange={handleColorChange} />
                <Image src={"/halfWhitehalfBlackRook.png"} height={200} width={200} alt="white rook" />
                <p>Random</p>
              </label>
              <label>
                <input type="radio" name="color" value="black" checked={color === "black"} onChange={handleColorChange} />
                <Image src={"/rookBlack.png"} height={150} width={150} alt="white rook" />
                <p>Black</p>
              </label>
            </form>
          </div>
          <div className="bot-section-container">
            <p>Choose bot level</p>
            <div className="bot-level-container">
              {botButtons.map((button) => (
                <Link key={button} href={`/bot/${color}/${button}`}>
                  <button>{button}</button>
                </Link>
              ))}
              <Link href={"random/" + color}>
                <button>Random</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
