import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [isCalculated, setCalculated] = useState(false);

  const isOperator = (data) => {
    return ["+", "-", "*", "/"].includes(data);
  };
  const handleExpression = (data) => {
    let exp = "";
    for (let i = 0; i < data.length - 1; i++) {
      exp += data[i];
      if (
        exp.length > 1 &&
        isOperator(exp[exp.length - 1]) &&
        isOperator(exp[exp.length - 2]) &&
        exp[exp.length - 1] !== "-"
      ) {
        if (exp[exp.length - 2] === "-" && isOperator(exp[exp.length - 3])) {
          exp =
            exp.substr(0, exp.length - 3) +
            exp[exp.length - 2] +
            exp[exp.length - 1];
        }
        exp = exp.substr(0, exp.length - 2) + exp[exp.length - 1];
      }
    }
    exp += data[data.length - 1];
    return exp;
  };
  const handleClear = () => {
    setDisplay("0");
  };
  const isOperatorPresent = () => {
    const operator = ["*", "/", "+", "-"];
    let flag = false;
    for (let i = 0; i < operator.length; i++) {
      if (display.includes(operator[i])) {
        flag = true;
      }
    }
    return flag;
  };
  const indexOperator = () => {
    const operator = ["*", "/", "+", "-"];
    const data = display.split("");
    let index = -1;
    for (let i = 0; i < data.length; i++) {
      if (operator.includes(data[i])) {
        index = i;
      }
    }
    return index;
  };
  const handleInput = (e) => {
    let data = e.target.textContent;

    setDisplay((prev) => {
      if (isCalculated && !["*", "/", "+", "-", "."].includes(data)) {
        setCalculated(false);
        return data;
      } else {
        setCalculated(false);
        if (prev === "0") {
          return data;
        }
        if (
          (data === "0" && display === "0") ||
          (data === "." && display.includes("."))
        ) {
          if (
            data === "." &&
            display.includes(".") &&
            isOperatorPresent() &&
            indexOperator() > display.lastIndexOf(".")
          ) {
            data = ".";
          } else {
            data = "";
          }
        }

        return prev + data;
      }
    });
  };

  const handleCalculation = (e) => {
    setDisplay(eval(handleExpression(display)));
    setCalculated(true);
  };

  return (
    <div className="App">
      <div id="calculator">
        <div id="display">{display}</div>
        <div className="item" id="clear" onClick={handleClear}>
          AC
        </div>
        <div className="item" id="decimal" onClick={handleInput}>
          .
        </div>
        <div className="item operator" id="multiply" onClick={handleInput}>
          *
        </div>
        <div className="item" id="one" onClick={handleInput}>
          1
        </div>
        <div className="item" id="two" onClick={handleInput}>
          2
        </div>
        <div className="item" id="three" onClick={handleInput}>
          3
        </div>
        <div className="item operator" id="add" onClick={handleInput}>
          +
        </div>
        <div className="item" id="four" onClick={handleInput}>
          4
        </div>
        <div className="item" id="five" onClick={handleInput}>
          5
        </div>
        <div className="item" id="six" onClick={handleInput}>
          6
        </div>
        <div className="item operator" id="subtract" onClick={handleInput}>
          -
        </div>
        <div className="item" id="seven" onClick={handleInput}>
          7
        </div>
        <div className="item" id="eight" onClick={handleInput}>
          8
        </div>
        <div className="item" id="nine" onClick={handleInput}>
          9
        </div>
        <div className="item operator" id="divide" onClick={handleInput}>
          /
        </div>
        <div className="item" id="zero" onClick={handleInput}>
          0
        </div>
        <div className="item" id="equals" onClick={handleCalculation}>
          =
        </div>
      </div>
    </div>
  );
};

export default Calculator;
