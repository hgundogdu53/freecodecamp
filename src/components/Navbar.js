import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">RandomQuoteMachine</Link>
        </li>
        <li>
          <Link to="/calculator">Calculator</Link>
        </li>
        <li>
          <Link to="/drummachine">DrumMachine</Link>
        </li>

        <li>
          <Link to="/markdownpreviewer">MarkdownPreviewer</Link>
        </li>
        <li>
          <Link to="/pomodoroclock">PomodoroClock</Link>
        </li>
      </ul>
    </nav>
  );
}
