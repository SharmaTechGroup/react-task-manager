import axios from "axios";
import { useFormik } from "formik";
import moment from "moment/moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";


export function UserDashboard(){

    let navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(['username', 'userid']);

    const [appointments, setAppointments] = useState([{id:null, title:null, description:null, date:null, user_id:null}]);
    const [appointment, setAppointment] = useState({id:'', title:'', description:'', date:'', user_id:''});

    const LoadAppointments = useCallback(()=>{

        axios.get(`http://localhost:3000/appointments`)
        .then(response=>{
             setAppointments(response.data);
        })

    },[appointments])

    const filteredAppointments = useMemo(()=>{

            return appointments.filter(appointment=> appointment.user_id===cookies['userid']);

    },[cookies['userid'], appointments])


    useEffect(()=>{
        LoadAppointments();
    },[appointments])

    function handleSignout(){
        removeCookie('userid');
        removeCookie('username');
        navigate('/');
    }


    const frmNewTask = useFormik({
        initialValues: {
            title:'',
            description:'',
            date:'',
            user_id: cookies['userid']
        },
        onSubmit: (appointment)=>{
            axios.post(`http://localhost:3000/appointments`, appointment)
            .then(()=>{
                LoadAppointments();
            })
        },
        enableReinitialize: true
    })


    const frmEditTask = useFormik({
        initialValues: {
            id: appointment.id,
            title:appointment.title,
            description:appointment.description,
            date:appointment.date,
            user_id: appointment.user_id
        },
        onSubmit: (appointment)=>{
            axios.put(`http://localhost:3000/appointments/${appointment.id}`, appointment)
            .then(()=>{
                LoadAppointments();
            })
        },
        enableReinitialize: true
    })

    function handleEditClick(appointment){
        setAppointment(appointment)
    }

    function handleDeleteClick(appointment){
        let flag = confirm(`Are you sure want to Delete\n${appointment.title.toUpperCase()}`);
        if(flag===true){
            axios.delete(`http://localhost:3000/appointments/${appointment.id}`)
            .then(()=>{
                LoadAppointments();
            })
        }
    }

    function handleSearchChange(e){
        filteredAppointments.filter(appointment=> appointment.title.toLowerCase().includes(e.target.value.toLowerCase()));
    }


    return(
        <div className="row p-2">
            <div className="col-2 d-flex flex-column justify-content-between p-3" style={{height:'600px'}}>
                <div>
                    <div className="fs-1 fw-bold text-primary">Task Flow</div>
                <ul className="list-group">
                   <li className="list-group-item p-3 list-group-item-light"> <span className="bi bi-columns-gap text-capitalize fw-bold text-primary"> {cookies['username']} Dashboard </span> </li>
                   <li className="list-group-item p-3 my-3 list-group-item-light"> <button className="btn btn-primary w-100" data-bs-target="#newTask" data-bs-toggle="modal"> <span className="bi bi-plus-lg"></span> New</button> </li>
                   <li className="list-group-item p-3 my-3 list-group-item-light"> <span className="bi bi-check-circle"> Tasks  </span> </li>

                   <li className="list-group-item p-3 list-group-item-light"> <span className="bi bi-calendar-date"> Calendar  </span> </li>
                </ul>
                </div>
                <div>
                    <button onClick={handleSignout} className="btn btn-primary w-100"> Signout</button>
                </div>
            </div>
            <div className="col-10">
                <div className="bg-light p-5 mt-4">
                    <div>
                        <div className="position-relative">
                          <span className="bi position-absolute bi-search" style={{top:'5px', left:'10px'}}></span>  <input type="text" className="form-control ps-5" onChange={handleSearchChange} placeholder="search title" />
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {
                        filteredAppointments.map(appointment=>
                            <div key={appointment.id} className="card m-2 p-2" style={{width:'400px'}}>
                                <div className="card-header d-flex justify-content-between">
                                    <span className="text-uppercase fw-bold">{appointment.title}</span>
                                    <span><span className="bi bi-calendar-date"></span>  {moment(appointment.date).format('DD dddd, MMMM, YYYY')}</span>
                                </div>
                                <div className="card-body">
                                    <div>{appointment.description}</div>
                                </div>
                                <div className="card-footer">
                                    <button data-bs-target="#editTask" data-bs-toggle="modal" onClick={()=> handleEditClick(appointment)} className="btn btn-warning bi bi-pen-fill"></button>
                                    <button onClick={()=> handleDeleteClick(appointment)} className="btn btn-danger bi bi-trash-fill mx-2"></button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="modal fade" id="newTask">
               <form onSubmit={frmNewTask.handleSubmit}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>New Appointment</h3>
                            </div>
                            <div className="modal-body">
                                <dl>
                                    <dt>Title</dt>
                                    <dd><input type="text" name="title" onChange={frmNewTask.handleChange} className="form-control"/></dd>
                                    <dt>Description</dt>
                                    <dd>
                                        <textarea rows="4" name="description" onChange={frmNewTask.handleChange} cols="40" className="form-control"></textarea>
                                    </dd>
                                    <dt>Date</dt>
                                    <dd>
                                        <input type="date" name="date" onChange={frmNewTask.handleChange} className="form-control" />
                                    </dd>
                                </dl>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Add</button>
                                <button type="button" data-bs-dismiss="modal" className="btn mx-2 btn-warning">Cancel</button>
                            </div>
                        </div>
                    </div>
               </form>
            </div>



            <div className="modal fade" id="editTask">
               <form onSubmit={frmEditTask.handleSubmit}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Edit Appointment</h3>
                            </div>
                            <div className="modal-body">
                                <dl>
                                    <input type="hidden" name="id" value={frmEditTask.values.id} />
                                    <dt>Title</dt>
                                    <dd><input type="text" value={frmEditTask.values.title} name="title" onChange={frmEditTask.handleChange} className="form-control"/></dd>
                                    <dt>Description</dt>
                                    <dd>
                                        <textarea rows="4" value={frmEditTask.values.description} name="description" onChange={frmEditTask.handleChange} cols="40" className="form-control"></textarea>
                                    </dd>
                                    <dt>Date</dt>
                                    <dd>
                                        <input type="date" value={frmEditTask.values.date} name="date" onChange={frmEditTask.handleChange} className="form-control" />
                                    </dd>
                                </dl>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Add</button>
                                <button type="button" data-bs-dismiss="modal" className="btn mx-2 btn-warning">Cancel</button>
                            </div>
                        </div>
                    </div>
               </form>
            </div>


        </div>
    )
}