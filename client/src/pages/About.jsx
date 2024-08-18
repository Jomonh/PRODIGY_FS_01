import Navbar from '../components/Navbar'
export default function About() {
  return (
    <div className='bg-primary d-flex flex-column' style={{minHeight:'100vh'}}>
        <Navbar/>
        <div className='h-100 d-flex align-items-center justify-content-center bg-success ' style={{minHeight:'88vh'}}>
            <h3>About Page</h3>
        </div>

    </div>
  )
}
