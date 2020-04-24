import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import RandomQuoteMachine from "./components/RandomQuoteMachine";
import Navbar from "./components/Navbar";
import Calculator from "./components/Calculator";
import MarkdownPreviewer from "./components/MarkdownPrev/MarkdownPreviewer.js";
import Drummachine from "./components/DrumMachine/Drummachine.js";
import PomodoroClock from "./components/PomodoroClock.js";

function App() {
  return (
    <div className="App">
      <i class="fa fa-free-code-camp" aria-hidden="true"></i>

      <Navbar />
      <Switch>
        <Route exact path="/" component={RandomQuoteMachine} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/markdownpreviewer" component={MarkdownPreviewer} />
        <Route path="/drummachine" component={Drummachine} />
        <Route path="/pomodoroclock" component={PomodoroClock} />
      </Switch>
    </div>
  );
}

export default App;
