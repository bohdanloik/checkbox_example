import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] =useState(false)
    let [title, setTitle] =useState(props.value)

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title);
    }

    

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return editMode 
           ? <input value={title}  autoFocus onBlur={activateViewMode} onChange={onChangeHandler}/>
           : <span onDoubleClick={activateEditMode}>{props.value}</span>
}