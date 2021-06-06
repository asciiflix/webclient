import React, { useState } from 'react'
import { FramePlayer } from './FramePlayer'

export const AsciiVideoPlayer: React.FC<{frames: string[][]}> = ({children, frames}) => {
    const [frameIndex, setFrame] = useState(0);
    function increaseFrame () {
        if (frameIndex < frames.length - 1){
            setFrame(frameIndex + 1);
        } else {
            setFrame(0);
        }
    }
    function play() {
        while(true) {
            increaseFrame();
        }
    }

    return (
        <div>
            <FramePlayer frameRows={frames[frameIndex]}/>
            <button onClick={increaseFrame}>Increase Frame</button>
        </div>
    );
}
