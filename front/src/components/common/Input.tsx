import React from "react";

export function Input(props: any)
{
    return (
        <div className={props.isBad ? "row error" : "row"}>
            {/*<label>{props.description}</label>*/}
            <input
                disabled={props.isDisabled}
                type={props.type}
                placeholder={props.placeholder}
                name={props.placeholder}
                value={props.value}
                onChange={x => props.onChange(x.target.value)}/>
        </div>
    )
}