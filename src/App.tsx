import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string
    title: string
    filter: string
}

function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {
            id: v1(),
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: v1(),
            title: 'What to learn',
            filter: 'all'
        }
    ])

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }



    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find((tl)=> tl.id === todolistId)
        if(todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
       
    }


    function changeStatus (id: string, isDone: boolean) {
        let task = tasks.find( t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }



    // return (
    //     <div className="App">
    //         <Todolist title="What to learn"
    //                   tasks={tasksForTodolist}
    //                   removeTask={removeTask}
    //                   changeFilter={changeFilter}
    //                   addTask={addTask}
    //                   changeStatus={changeStatus} 
    //                   filter={filter}/>
    //     </div>
    // );

    return (
        <div className='App'>
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = tasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks.filter(t => t.isDone === true);
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
                    />
                }) 
            }
        </div>
    )
}

export default App;
