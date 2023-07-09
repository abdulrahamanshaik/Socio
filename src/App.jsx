import './App.css'
import LeftSideBar from './components/Leftsidebar'
// import Navbar from './components/Navbar'
// import Post from './components/Post'
import Posts from './components/Posts'
import Profile from './components/Profile'
import PrimarySearchAppBar from './components/demo'

function App() {

  return (
    <>
    <PrimarySearchAppBar/>
    <div className='main'>
      <LeftSideBar/>
    <Posts/>
    <Profile/>
    </div>

{/* <Posts/> */}
{/* <Navbar/> */}
    </>
  )
}

export default App
