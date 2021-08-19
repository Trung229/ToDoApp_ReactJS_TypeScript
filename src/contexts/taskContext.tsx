import React, { createContext, useState, ReactNode, useEffect } from "react";

interface TaskDefaultProps {
    children: ReactNode
}

interface UserContextDefaults {
    tasks:{
            task_id:number,
            task_name:string,
            status:string,
            user_id:number,
        }[],
    temp:string,    
    addTask:() => void,
    deleteTask:(id_task:number) => void,
    updateTask:(nameTask:string, task_id:number) => void,
    onChangeNameTask:(value:string)=>void,
    onChangeStatusTask:(value:string)=>void,
    onChangeNameTaskUpdate:(value:string)=>void,
    conFirmUpdate:()=>void,
}

const myTask = {
    tasks:[
        {
            task_id: 0,
            task_name: "test",
            status: "not done",
            user_id: 1,
        },
    ],
    temp:"",
    addTask:()=>{},
    deleteTask:()=>{},
    updateTask:()=>{},
    onChangeNameTask:()=>{},
    onChangeStatusTask:()=>{},
    onChangeNameTaskUpdate:()=>{},
    conFirmUpdate:()=>{}
}

export const TaskContext = createContext<UserContextDefaults>(myTask);

const TaskContextProvider = ({children}:TaskDefaultProps) => {  
    const [task, setTask] = useState([
        {task_id:1,task_name:"abc",status: "not done",user_id:2,},
        {task_id:2,task_name:"xyz",status: "done",user_id:2,},
        {task_id:3,task_name:"xyz",status: "done",user_id:2,},
    ]);
    const [nameTask, setNameTask] = useState("");
    const [statusTask, setStatusTask] = useState("");
    const [taskID, setIDTask] = useState(0);
    const [temp, setTempTask] = useState("");
    const [test, setTest] = useState(0);
    const addTask = () =>{
        const userAddTask = {
            task_id:task.length+1,
            task_name:nameTask,
            status: statusTask||"Done",
            user_id:2,
        }
        setTask([...task, userAddTask])
    }
    
    const updateTask = (nameTask:string,task_id:number) =>{
        setTempTask(nameTask);
        setIDTask(task_id);
    }


    const deleteTask =(id_task:number)=>{
        let newArr = task.filter((item) => item.task_id != id_task);
        setTask(newArr);
    }
    const onChangeNameTask = (e:any)=>{
        setNameTask(e.target.value);
    };

    const onChangeStatusTask = (e:any)=>{
        setStatusTask(e.target.value);
    };
    const onChangeNameTaskUpdate = (e:any)=>{
        setTempTask(e.target.value);
    }
    const conFirmUpdate = ()=>{
        console.log("hi");
        setTest(test + 1);
       let objIndex = task.findIndex((obj => obj.task_id == taskID));
       task[objIndex].task_name = temp;

    }
    const TaskDynamicData = {
        tasks:task,
        temp:temp,
        addTask,
        deleteTask,
        onChangeNameTask,
        onChangeStatusTask,
        updateTask,
        onChangeNameTaskUpdate,
        conFirmUpdate
    }
    return (
        <TaskContext.Provider value={TaskDynamicData}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider;