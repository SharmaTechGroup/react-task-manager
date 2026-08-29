
import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  


  return (
    <div>
       <header className='p-3 d-flex justify-content-between bg-light'>
          <div>
            <span className='bi fs-3 bi-pencil-square fw-bold text-primary'> <Link to="/" className='text-decoration-none'>Task Flow</Link> </span>
          </div>
          <div>
             <span>Products</span>
             <span className='mx-4'>Pricing</span>
             <span>Preview</span>
          </div>
          <div>
            <button className='btn btn-primary'>Support</button>
            <Link to="/login" className='btn btn-warning mx-2'>Login</Link>
          </div>
       </header>
        <div style={{height:'500px'}} className='p-4 d-flex justify-content-center'>
           <Outlet />
        </div>
       <footer className='bg-light text-center p-2'>
          &copy; copyright 2026 Task Flow
       </footer>
    </div>
  )
}

export default App
