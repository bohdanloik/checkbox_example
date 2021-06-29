import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string
    title: string
    filter: string
}

function App() {
    const toDoListId1 = v1();
    const toDoListId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {
            id: toDoListId1,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: toDoListId2,
            title: 'What to learn',
            filter: 'all'
        }
    ])

    let [tasks, setTasks] = useState(
        {[toDoListId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [toDoListId2]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ]
    });

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter((ts) => ts.id != id);
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = { id: v1(), title: title, isDone: false };
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find((tl)=> tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    function changeStatus (id: string, isDone: boolean, todolistId: string) {
        let todolistTask = tasks[todolistId].find(t => t.id === id);
        if (todolistTask) {
            todolistTask.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function removeTodolist(id: string) {
        let updatedTodolists = todolists.filter((tl) => tl.id !== id);
        setTodolists(updatedTodolists)

    }

    function addTodolist (title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistsType = {id:newTodolistId, title: title, filter: 'all' };
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodolistId] : []
        })
    }
    function changeTaskTitle (title: string, taskId: string, todolistId:string) {
        let todolistTasks = tasks[todolistId];
        let updatedTask = todolistTasks.find(t => t.id === taskId);
        if (updatedTask) {
            updatedTask.title = title;
            setTasks({...tasks});
        }
    }
    return (
        <div className='App'>
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasks[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    } else if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id} 
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus} 
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                    />
                }) 
            }
        </div>
    )
}

export default App;
