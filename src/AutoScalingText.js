import React, { useState, useEffect, useRef } from 'react';

function AutoScalingText(props) {
  const [scale, setScale] = useState(1);
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    const parentNode = node.parentNode;

    const availableWidth = parentNode.offsetWidth;
    const actualWidth = node.offsetWidth;
    const actualScale = availableWidth / actualWidth;

    if (scale === actualScale) return;

    if (actualScale < 1) {
      setScale(actualScale);
    } else if (scale < 1) {
      setScale(1);
    }
  }, [scale]);

  return (
    <div
      className="auto-scaling-text"
      style={{ transform: `scale(${scale},${scale})` }}
      ref={nodeRef}
    >
      {props.children}
    </div>
  );
}

export default AutoScalingText;
