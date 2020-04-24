import React from "react";
import "./Drummachine.css";

const drums = [
  {
    key: "Q",
    drumPad: [
      {
        name: "Heater-1",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      },
      {
        name: "Chord-1",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
      },
    ],
  },
  {
    key: "W",
    drumPad: [
      {
        name: "Heater-2",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      },
      {
        name: "Chord-2",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
      },
    ],
  },
  {
    key: "E",
    drumPad: [
      {
        name: "Heater-3",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      },
      {
        name: "Chord-3",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
      },
    ],
  },
  {
    key: "A",
    drumPad: [
      {
        name: "Heater-4",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      },
      {
        name: "Shaker",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
      },
    ],
  },
  {
    key: "S",
    drumPad: [
      {
        name: "Clap",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      },
      {
        name: "Open-HH",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
      },
    ],
  },
  {
    key: "D",
    drumPad: [
      {
        name: "Open-HH",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      },
      {
        name: "Closed-HH",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
      },
    ],
  },
  {
    key: "Z",
    drumPad: [
      {
        name: "Kick-n-Hat",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      },
      {
        name: "Punchy-Kick",
        link: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
      },
    ],
  },
  {
    key: "X",
    drumPad: [
      {
        name: "Kick",
        link: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      },
      {
        name: "Side-Stick",
        link: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
      },
    ],
  },
  {
    key: "C",
    drumPad: [
      {
        name: "Closed-HH",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      },
      {
        name: "Snare",
        link: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
      },
    ],
  },
];

const Drum = (props) => {
  const { drum, bank, click, keyDown } = props;
  return (
    <div
      id={drum.drumPad[bank].name}
      className="drum-pad"
      onClick={(e) => click(drum.key)}
      onKeyDown={keyDown}
    >
      <span>{drum.key}</span>
      <audio id={drum.key} src={drum.drumPad[bank].link} className="clip" />
    </div>
  );
};

const Controls = (props) => {
  const { displayText, volume, handleToggle, handleVolume } = props;
  return (
    <div className="controls">
      <div className="toggle-container">
        <span>Bank</span>
        <label className="toggle">
          <input type="checkbox" onChange={handleToggle} />
          <span className="slider round" />
        </label>
      </div>
      <div id="display" className="display">
        <span>{displayText}</span>
      </div>
      <div className="slide-container">
        <span>Volume</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          className="slider"
          onChange={handleVolume}
        />
      </div>
    </div>
  );
};

class DrumMachine extends React.Component {
  state = {
    displayText: "",
    bank: 0,
    volume: 50,
  };

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleOnClick = (key) => {
    const drum = drums.find((drum) => drum.key === key);
    if (drum) this.playAudio(key, drum);
  };

  handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    const drum = drums.find((drum) => drum.key === key);
    if (drum) {
      const button = document.getElementById(key).parentNode;
      const keyframes = [{ opacity: 1 }, { opacity: 1 }];
      button.animate(keyframes, { duration: 300 });
      this.playAudio(key, drum);
    }
  };

  playAudio = (key, drum) => {
    const bank = this.state.bank;
    this.setState({ displayText: drum.drumPad[bank].name });
    document.getElementById(key).play();
  };

  handleToggle = () => {
    if (this.state.bank === 1) {
      this.setState({ bank: 0, displayText: "Heater Kit" });
    } else {
      this.setState({ bank: 1, displayText: "Smooth Piano Kit" });
    }
  };

  handleVolume = (e) => {
    const volume = e.target.value;
    this.setState({ volume, displayText: `Volume: ${volume}` });
    const clips = document.querySelectorAll(".clip");
    clips.forEach((clip) => (clip.volume = volume / 100));
  };

  render() {
    const bank = this.state.bank;
    return (
      <div className="App">
        <div id="drum-machine" className="DrumMachine">
          <div className="drum-container">
            {drums.map((drum, index) => (
              <Drum
                key={index}
                drum={drum}
                bank={bank}
                click={this.handleOnClick}
                keyDown={this.handleKeyDown}
              />
            ))}
          </div>
          <Controls
            displayText={this.state.displayText}
            volume={this.state.volume}
            handleToggle={this.handleToggle}
            handleVolume={this.handleVolume}
          />
        </div>
      </div>
    );
  }
}

export default DrumMachine;
