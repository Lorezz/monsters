import { useState, useEffect } from 'react';

export default function useMultiKeyPress() {
  const [keysPressed, setKeyPressed] = useState(new Set([]));

  function downHandler({ key }) {
    // console.log('keydown', key);
    setKeyPressed(keysPressed.add(key));
  }

  const upHandler = ({ key }) => {
    console.log('keyup', key);
    keysPressed.delete(key);
    setKeyPressed(keysPressed);
  };

  useEffect(() => {
    console.log('init keyboard');
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return Array.from(keysPressed);
}
