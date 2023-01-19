import React from "react";

const Square = ({children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`;

    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default Square;