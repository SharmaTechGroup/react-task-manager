import { UserLogin } from "./user-login";
import { UserRegister } from "./user-register";

export function TaskManagerHome(){
    return(
         <section className='d-flex justify-content-center align-items-center' style={{height:'450px'}}>
          <div>
            <div style={{width:'300px', height:'400px'}}>
                <ul className='nav nav-tabs'>
                  <li className='nav-item'> <a href='#register' data-bs-toggle='tab' className='nav-link active'> User Register </a> </li>
                  <li className='nav-item'> <a href='#login' data-bs-toggle='tab' className='nav-link'> User Login </a> </li>
                </ul>
                <div className='mt-3 tab-content'>
                  <div className='tab-pane p-3 active' id='register'>
                      <UserRegister />
                  </div>
                  <div className='tab-pane' id='login'>
                      <UserLogin displayTitle='d-none' />
                  </div>
                </div>
            </div>
          </div>
       </section>
    )
}