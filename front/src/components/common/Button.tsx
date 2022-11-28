import React, {MouseEventHandler} from "react";

interface ButtonProps{
    color?: string
    onClick: MouseEventHandler<HTMLButtonElement>
    isDisabled: boolean
    title: string
}

export function Button(props: ButtonProps)
{
   
    return (
        <div id="button" className={props.color ?? "row"}>
            <button
                onClick={props.onClick}
                disabled={props.isDisabled}
                >
                {props.title}
            </button>
        </div>
    )
}