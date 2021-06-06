import React from 'react'

export const FramePlayer: React.FC<{frameRows: string[]}> = ({children, frameRows}) => {
    return (
        <div>{
            frameRows.map((row) => {
            return <p>{ row }</p>;
            })
        }</div>
    );
}