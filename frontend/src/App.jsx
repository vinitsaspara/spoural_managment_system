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
  }
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
