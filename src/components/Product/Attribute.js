import React from 'react';

function Attribute(props) {
    return (
        <div>
            <h1>{props.name}</h1>
            <p>Option: {props.option.map(opt => {return `${opt} `})}</p>
            <button type='button' onClick={() => {props.onDelete(props.id);}}>DELETE</button>
        </div>
    );
}

export default Attribute;

/*
<Attribute
    key={index}
    id={index}
    name={attribute.name}
    option={attribute.option}
    onDelete={deleteAttribute}
/>
 */