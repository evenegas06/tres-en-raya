import React from "react";

const Square = ({children, isSelected, updateBoard, index}) => {
    // renderizado condicional 
    const className = `square ${isSelected ? 'is-selected' : ''}`;

    const handleClick = () => {
        updateBoard(index);
        console.log('handle');
    }
    
    return (
        <div
            onClick={handleClick}
            className={className}
        >
            {children}
        </div>
    );
}

export default Square;