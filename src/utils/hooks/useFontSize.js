import { useState, useEffect } from 'react';


export default function useFontSize() {
const [size, setSize] = useState(() => {
    const savedFontSize = localStorage.getItem("fontSize");
    return savedFontSize ? parseInt(savedFontSize) : 20;
  });
  
  const [increaseCount, setIncreaseCount] = useState(() => {
    const savedIncreaseCount = localStorage.getItem("increaseCount");
    return savedIncreaseCount ? parseInt(savedIncreaseCount) : 0;
  });
  
  const [decreaseCount, setDecreaseCount] = useState(() => {
    const savedDecreaseCount = localStorage.getItem("decreaseCount");
    return savedDecreaseCount ? parseInt(savedDecreaseCount) : 0;
  });
  
  const maxCount = 3;
  
  useEffect(() => {
    localStorage.setItem("fontSize", size.toString());
  }, [size]);
  
  useEffect(() => {
    localStorage.setItem("increaseCount", increaseCount.toString());
  }, [increaseCount]);
  
  useEffect(() => {
    localStorage.setItem("decreaseCount", decreaseCount.toString());
  }, [decreaseCount]);
  
  const increaseFontSize = () => {
    if (increaseCount < maxCount) {
      setSize(prevSize => prevSize + 2);
      setIncreaseCount(prevCount => prevCount + 1);
      if (decreaseCount > 0) {
        setDecreaseCount(prevCount => prevCount - 1);
      }
    }
  };
  
  const decreaseFontSize = () => {
    if (decreaseCount < maxCount) {
      setSize(prevSize => prevSize - 2);
      setDecreaseCount(prevCount => prevCount + 1);
      if (increaseCount > 0) {
        setIncreaseCount(prevCount => prevCount - 1);
      }
    }
  };
  
  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
      setSize(parseInt(savedFontSize));
    }
  }, []);
  return { size, increaseFontSize, decreaseFontSize };
}