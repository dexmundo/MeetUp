import React from 'react';

type Props = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    text: string
};

const Button = (props: Props) => {
    return (
        <button
            className='px-4 py-1 border rounded-lg bg-neutral-700 hover:bg-neutral-800'
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
};

export default Button;
