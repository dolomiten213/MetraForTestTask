import React from "react";

export function Radio(props: any)
{
    return (
        <div className="row">
            <label>{props.description}</label>
            <input
                type="radio"
                placeholder={props.placeholder}
                name={props.placeholder}
                value={props.value}
                onChange={x => props.onChange(props.value)}/>
        </div>
    )
}