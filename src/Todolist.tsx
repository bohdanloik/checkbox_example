import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { AddItemForm } from './AddItemForm';
import {FilterValuesType} from './App';
import { EditableSpan } from './EditableSpan';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: string
    id: string
    key: string
    removeTodolist: (id: string) => void
}

export function Todolist(props: PropsType) {

 
   const addTask = (title: string) => {
        props.addTask(title, props.id)
   }





    const onAllClickHandler = () => props.changeFilter("all", props.id );
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const onRemoveTodolistHandler = () => props.removeTodolist(props.id);       
    
    
    return <div>
        <h3>{props.title} <button onClick={onRemoveTodolistHandler}>x</button></h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)

                    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked;
                        props.changeStatus(t.id, newIsDone, props.id)
                    }
                    
                    return <li key={t.id} className={t.isDone ? 'is-done' : '' }>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeCheckboxHandler}/>
                        <EditableSpan title={t.title}/>
                        {/* <span>{t.title}</span> */}
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button 
                className={props.filter === 'all' ? 'active-filter' : ''}
                onClick={onAllClickHandler}
            >All</button>
            <button 
                className={props.filter === 'active' ? 'active-filter' : ''}
                onClick={onActiveClickHandler}
            >Active</button>
            <button 
                className={props.filter === 'completed' ? 'active-filter' : ''} 
                onClick={onCompletedClickHandler}
            >Completed</button>
        </div>
    </div>
}
