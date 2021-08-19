import React, { useEffect, useContext, useRef } from 'react';
import { UserContext } from '../contexts/userContext';
import { TaskContext } from '../contexts/taskContext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useParams,
} from "react-router-dom";

export const Main = () => {
    const { userInfo: { name, picture } } = useContext(UserContext);
    const { tasks,temp, addTask, deleteTask,updateTask, onChangeNameTask, onChangeStatusTask,onChangeNameTaskUpdate, conFirmUpdate } = useContext(TaskContext);
    return (
        <div className="container">
             <Link to="/" type="button" className="btn btn-outline-warning" style={{position:"absolute", left:10, top:10}}>Log out</Link>
            <h1>Welcome back {name}</h1>
            <img src={picture} className="rounded" alt="Cinque Terre" />
            <form className="form-inline justify-content-around" style={{ paddingLeft: 250, paddingTop: 20 }}>
                <span>Add Task</span>
                <div className="form-group mx-sm-3 mb-2" style={{ width: 500 }}>
                    <label className="sr-only">Password</label>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => { onChangeNameTask(e) }} type="text" className="form-control w-100" id="inputPassword2" placeholder="Enter your task" />
                </div>
                <select onChange={(e: any) => onChangeStatusTask(e)} className="form-control" id="sel1" name="sellist1">
                    <option value="done" selected>done</option>
                    <option value="not done">not done</option>
                    <option value="Cancel">Cancel</option>
                </select>
                <button onClick={() => { addTask() }} type="button" className="btn btn-primary mb-2">Add task</button>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name Task</th>
                        <th scope="col">Status</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks && tasks.map((item, i) => {
                        return (
                            <tr>
                                <th scope="row">
                                    <span>{i + 1}</span>
                                </th>
                                <td>
                                    <span>{item.task_name}</span>
                                </td>
                                <td>
                                    <span>
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-outline-info mr-3" data-toggle="modal" data-target="#myModal" onClick={()=>{updateTask(item.task_name, item.task_id)}}>Update</button>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => { deleteTask(item.task_id) }}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Modal Header</h4>
                        </div>
                        <div className="modal-body">
                            <div style={{textAlign: "left"}}>Name task</div>
                            <div className="input-group mb-3">
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement> | any)=>{onChangeNameTaskUpdate(e)}} value={temp} type="text" className="form-control" placeholder="Enter task" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Link to="/main" type="button" className="btn btn-primary" onClick={() => {conFirmUpdate()}} data-dismiss="modal">Save changes</Link>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}