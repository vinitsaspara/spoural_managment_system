import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Games from './components/Games'
import Browse from './components/Browse'
import Profile from './components/Profile'
import GameDetails from './components/GameDetails'
import Members from './components/admin/Members'
import MemberAdd from './components/admin/MemberAdd'
import MemberDetails from './components/admin/MemberDetails'
import GameController from './components/admin/GameController'
import AdminGameDetails from './components/admin/AdminGameDetails'
import AdminCreateGame from './components/admin/AdminCreateGame'
import Faculty from './faculty/Faculty'
import StudentCoordinator from './studentCoordinator/StudentCoordinator'
import ViweAppliedStudent from './studentCoordinator/ViweAppliedStudent'
import ViweSelectedStudent from './faculty/ViweSelectedStudent'
import AllSelectedStudent from './faculty/AllSelectedStudent'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element : <Home/>
  },
  {
    path: '/login',
    element : <Login/>
  },
  {
    path: '/signup',
    element : <Signup/>
  },
  // in the navbar games link
  {
    path : '/games',
    element : <Games/>
  },
  // game details -> in every card
  {
    path : '/details/:id',
    element : <GameDetails/>
  },
  {
    path : '/browse',
    element : <Browse/>
  },
  {
    path : '/profile',
    element : <Profile/>
  },


  // Admin url starts
  {
    path : '/admin/members',
    element : <Members/>
  },
  {
    path : '/admin/members/add',
    element : <MemberAdd/>
  },
  {
    path : '/admin/member/details',
    element : <MemberDetails/>
  },
  {
    path : '/admin/game',
    element : <GameController/>
  },
  {
    path : '/admin/game/details/:id',
    element : <AdminGameDetails/>
  },
  {
    path : '/admin/game/create',
    element : <AdminCreateGame/>
  },

  // faculty url start

  {
    path : '/faculty',
    element : <Faculty/>
  },
  {
    path : '/faculty/viewselectedStudent/:id',
    element : <ViweSelectedStudent/>
  },
  {
    path : '/faculty/allplayer',
    element : <AllSelectedStudent/>
  },


  // studentCoordinator url start

  {
    path : '/studentCoordinator',
    element : <StudentCoordinator/>
  },
  {
    path : '/viweAppliedStudent/:id',
    element : <ViweAppliedStudent/>
  },


])

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
