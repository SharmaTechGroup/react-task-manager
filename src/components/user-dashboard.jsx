import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";


export function UserDashboard(){

    let navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(['username', 'userid']);

    const [appointments, setAppointments] = useState([{title:null, description:null, date:null, user_id:null}]);

    function LoadAppointments(){
        axios.get(`http://localhost:3000/appointments`)
        .then(response=>{
             let user_appointments = response.data.filter(item=> item.user_id===cookies['userid']);
             setAppointments(user_appointments);
        })
    }

    useEffect(()=>{
        LoadAppointments();
    },[])

    function handleSignout(){
        removeCookie('userid');
        removeCookie('username');
        navigate('/');
    }

    return(
        <div className="row p-2">
            <div className="col-2 d-flex flex-column justify-content-between p-3" style={{height:'600px'}}>
                <div>
                    <div className="fs-1 fw-bold text-primary">Task Flow</div>
                <ul className="list-group">
                   <li className="list-group-item p-3 list-group-item-light"> <span className="bi bi-columns-gap text-capitalize fw-bold text-primary"> {cookies['username']} Dashboard </span> </li>
                   <li className="list-group-item p-3 my-3 list-group-item-light"> <button className="btn btn-primary w-100"> <span className="bi bi-plus-lg"></span> New</button> </li>
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
                    Filter, Search
                </div>
                <div className="d-flex flex-wrap">
                    {
                        appointments.map(appointment=>
                            <div className="card m-2 p-2 w-25">
                                <div className="card-header d-flex justify-content-between">
                                    <span className="text-uppercase fw-bold">{appointment.title}</span>
                                    <span><span className="bi bi-calendar-date"></span>  {appointment.date}</span>
                                </div>
                                <div className="card-body">
                                    <div>{appointment.description}</div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-warning bi bi-pen-fill"></button>
                                    <button className="btn btn-danger bi bi-trash-fill mx-2"></button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}