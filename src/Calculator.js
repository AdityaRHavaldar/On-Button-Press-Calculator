import React, { useState, useEffect } from 'react';
import CalculatorDisplay from './CalculatorDisplay'; // Make sure to import CalculatorDisplay if it's in a separate file
import CalculatorKey from './CalculatorKey'; // Make sure to import CalculatorKey if it's in a separate file
import CalculatorOperations from './CalculatorOperations'; // Assuming you have a separate file for CalculatorOperations

function Calculator() {
  const [state, setState] = useState({
    value: null,
    displayValue: '0',
    operator: null,
    waitingForOperand: false,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      let { key } = event;

      if (key === 'Enter') key = '=';

      if ((/\d/).test(key)) {
        event.preventDefault();
        inputDigit(parseInt(key, 10));
      } else if (key in CalculatorOperations) {
        event.preventDefault();
        performOperation(key);
      } else if (key === '.') {
        event.preventDefault();
        inputDot();
      } else if (key === '%') {
        event.preventDefault();
        inputPercent();
      } else if (key === 'Backspace') {
        event.preventDefault();
        clearLastChar();
      } else if (key === 'Clear') {
        event.preventDefault();
        if (state.displayValue !== '0') {
          clearDisplay();
        } else {
          clearAll();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [state]);

  const clearAll = () => {
    setState({
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false,
    });
  };

  const clearDisplay = () => {
    setState({
      ...state,
      displayValue: '0',
    });
  };

  const clearLastChar = () => {
    const { displayValue } = state;
    setState({
      ...state,
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0',
    });
  };

  const toggleSign = () => {
    const { displayValue } = state;
    const newValue = parseFloat(displayValue) * -1;
    setState({
      ...state,
      displayValue: String(newValue),
    });
  };

  const inputPercent = () => {
    const { displayValue } = state;
    const currentValue = parseFloat(displayValue);

    if (currentValue === 0) return;

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
    const newValue = parseFloat(displayValue) / 100;

    setState({
      ...state,
      displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
    });
  };

  const inputDot = () => {
    const { displayValue } = state;

    if (!(/\./).test(displayValue)) {
      setState({
        ...state,
        displayValue: displayValue + '.',
        waitingForOperand: false,
      });
    }
  };

  const inputDigit = (digit) => {
    const { displayValue, waitingForOperand } = state;

    if (waitingForOperand) {
      setState({
        ...state,
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      setState({
        ...state,
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit,
      });
    }
  };

  const performOperation = (nextOperator) => {
    const { value, displayValue, operator } = state;
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      setState({
        ...state,
        value: inputValue,
        operator: nextOperator,
        waitingForOperand: true,
      });
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = CalculatorOperations[operator](currentValue, inputValue);

      setState({
        ...state,
        value: newValue,
        displayValue: String(newValue),
        operator: nextOperator,
        waitingForOperand: true,
      });
    }
  };

  const { displayValue } = state;
  const clearDisplayFlag = displayValue !== '0';
  const clearText = clearDisplayFlag ? 'C' : 'AC';

  return (
    <div className="calculator">
      <CalculatorDisplay value={displayValue} />
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <CalculatorKey className="key-clear" onPress={clearDisplay}>{clearText}</CalculatorKey>
            <CalculatorKey className="key-sign" onPress={toggleSign}>±</CalculatorKey>
            <CalculatorKey className="key-percent" onPress={inputPercent}>%</CalculatorKey>
          </div>
          <div className="digit-keys">
            <CalculatorKey className="key-0" onPress={() => inputDigit(0)}>0</CalculatorKey>
            <CalculatorKey className="key-dot" onPress={inputDot}>●</CalculatorKey>
            <CalculatorKey className="key-1" onPress={() => inputDigit(1)}>1</CalculatorKey>
            <CalculatorKey className="key-2" onPress={() => inputDigit(2)}>2</CalculatorKey>
            <CalculatorKey className="key-3" onPress={() => inputDigit(3)}>3</CalculatorKey>
            <CalculatorKey className="key-4" onPress={() => inputDigit(4)}>4</CalculatorKey>
            <CalculatorKey className="key-5" onPress={() => inputDigit(5)}>5</CalculatorKey>
            <CalculatorKey className="key-6" onPress={() => inputDigit(6)}>6</CalculatorKey>
            <CalculatorKey className="key-7" onPress={() => inputDigit(7)}>7</CalculatorKey>
            <CalculatorKey className="key-8" onPress={() => inputDigit(8)}>8</CalculatorKey>
            <CalculatorKey className="key-9" onPress={() => inputDigit(9)}>9</CalculatorKey>
          </div>
        </div>
        <div className="operator-keys">
          <CalculatorKey className="key-divide" onPress={() => performOperation('/')}>÷</CalculatorKey>
          <CalculatorKey className="key-multiply" onPress={() => performOperation('*')}>×</CalculatorKey>
          <CalculatorKey className="key-subtract" onPress={() => performOperation('-')}>−</CalculatorKey>
          <CalculatorKey className="key-add" onPress={() => performOperation('+')}>+</CalculatorKey>
          <CalculatorKey className="key-equals" onPress={() => performOperation('=')}>=</CalculatorKey>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
