import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AddItemFormPropsType = { 
        title: string
        onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
        onKeyPressHandler: (e: KeyboardEvent<HTMLInputElement>) => void
        addTask: () => void
        error: string | null

}

export const AddItemForm = (props: AddItemFormPropsType) => {

    return(
        <div>       
            <input value={props.title}
                onChange={props.onChangeHandler}
                onKeyPress={props.onKeyPressHandler}
            />
            <button onClick={props.addTask}>+</button>
            {props.error && <div className='error-message'>{props.error}</div>}
        </div>
    )
}