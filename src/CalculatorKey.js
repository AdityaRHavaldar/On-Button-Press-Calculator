import React from 'react';

function CalculatorKey(props) {
  const { onPress, className, ...restProps } = props;

  return (
    <button className={`calculator-key ${className}`} onClick={onPress} {...restProps} />
  );
}

export default CalculatorKey;
