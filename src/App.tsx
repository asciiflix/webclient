import React, { useState } from 'react'
import { AsciiVideoPlayer } from './AsciiVideoPlayer/AsciiVideoPlayer'

function App() {
  const [frames] = useState([["XX0000", "XX0000"], ["00XX00", "00XX00"], ["0000XX", "0000XX"]]);
  return (
    <>
      <AsciiVideoPlayer frames={frames}/>
    </>
  );
}

export default App;

