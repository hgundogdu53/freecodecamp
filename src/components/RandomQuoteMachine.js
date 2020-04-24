import React, { useState, useEffect } from "react";
import "./Randomqm.css";

const RandomQuoteMachine = () => {
  const [text, setText] = useState(
    " Winter is coming,absolutely. But then, Spring will come out."
  );
  const [author, setAuthor] = useState(" Huseyin Gundogdu ");
  const [image, setImage] = useState(" ");

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    fetch("https://thesimpsonsquoteapi.glitch.me/quotes")
      .then((response) => response.json())
      .then((data) => {
        setText(data[0].quote);
        setAuthor(data[0].character);
        setImage(data[0].image);
      });
  };

  return (
    <div className="App">
      <div id="quote-box">
        <img src={image} alt="Simpsons" width="80" height="120"></img>
        <div id="text">{text}</div>
        <div id="author">{author}</div>
        <div id="new-quote" onClick={getQuote}>
          New Quote
        </div>
        <a
          href="https://twitter.com/intent/tweet"
          target="_blank"
          id="tweet-quote"
        >
          Tweet
        </a>
      </div>
    </div>
  );
};

export default RandomQuoteMachine;
