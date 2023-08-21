import React from 'react';
import AutoScalingText from './AutoScalingText'; // Make sure to import AutoScalingText if it's in a separate file

function CalculatorDisplay(props) {
  const { value, ...restProps } = props;

  const language = navigator.language || 'en-US';
  let formattedValue = parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6,
  });

  // Add back missing .0 in e.g. 12.0
  const match = value.match(/\.\d*?(0*)$/);

  if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];

  return (
    <div {...restProps} className="calculator-display">
      <AutoScalingText>{formattedValue}</AutoScalingText>
    </div>
  );
}

export default CalculatorDisplay;
