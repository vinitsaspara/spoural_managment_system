import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Games from "./components/Games";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import GameDetails from "./components/GameDetails";
import Members from "./components/admin/Members";
import MemberAdd from "./components/admin/MemberAdd";
import MemberDetails from "./components/admin/MemberDetails";
import GameController from "./components/admin/GameController";
import AdminGameDetails from "./components/admin/AdminGameDetails";
import AdminCreateGame from "./components/admin/AdminCreateGame";
import Faculty from "./faculty/Faculty";
import StudentCoordinator from "./studentCoordinator/StudentCoordinator";
import ViweAppliedStudent from "./studentCoordinator/ViweAppliedStudent";
import ViweSelectedStudent from "./faculty/ViweSelectedStudent";
import AllSelectedStudent from "./faculty/AllSelectedStudent";
import AdminHome from "./components/admin/AdminHome";
import FacultyHome from "./faculty/FacultyHome";
import StudentCoordinatorHome from "./studentCoordinator/StudentCoordinatorHome";
import GameSchedule from "./components/admin/GameSchedule";
import AddSchedule from "./components/admin/AddSchedual";
import Prectice from "./studentCoordinator/Prectice";
import CreatePracticeSchedule from "./studentCoordinator/CreatePracticeSchedule";
import ApprovePracticeTime from "./faculty/ApprovePracticeTime";
import PrecticeStudent from "./components/ui/PrecticeStudent";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/games", element: <Games /> },
      { path: "/details/:id", element: <GameDetails /> },
      { path: "/browse", element: <Browse /> },
      { path: "/profile", element: <Profile /> },
      { path: "/practice", element: <PrecticeStudent /> },


      { path: "/admin/members", element: <Members /> },
      { path: "/admin/members/add", element: <MemberAdd /> },
      { path: "/admin/member/details", element: <MemberDetails /> },
      { path: "/admin/game", element: <GameController /> },
      { path: "/admin/game/details/:id", element: <AdminGameDetails /> },
      { path: "/admin/game/create", element: <AdminCreateGame /> },

      // Faculty URLs
      { path: "/faculty", element: <Faculty /> },
      { path: "/faculty/viewselectedStudent/:id", element: <ViweSelectedStudent /> },
      { path: "/faculty/allplayer", element: <AllSelectedStudent /> },

      // Student Coordinator URLs
      { path: "/studentCoordinator", element: <StudentCoordinator /> },
      { path: "/viweAppliedStudent/:id", element: <ViweAppliedStudent /> },
      { path: "/createPracticeSchedule/:gameId", element: <CreatePracticeSchedule /> },
    ],
  },
  // Admin URLs
  { path: "/admin", element: <AdminHome /> },
  { path: "/admin/members", element: <Members /> },
  { path: "/admin/members/add", element: <MemberAdd /> },
  { path: "/admin/member/details", element: <MemberDetails /> },
  { path: "/admin/game", element: <GameController /> },
  { path: "/admin/game/details/:id", element: <AdminGameDetails /> },
  { path: "/admin/game/create", element: <AdminCreateGame /> },
  { path: "/admin/schedual", element: <GameSchedule/>},
  { path: "/admin/addschedual", element: <AddSchedule/>},

  // Faculty URLs
  { path: "/facultyhome", element: <FacultyHome /> },
  { path: "/faculty", element: <Faculty /> },
  { path: "/faculty/viewselectedStudent/:id", element: <ViweSelectedStudent /> },
  { path: "/faculty/allplayer", element: <AllSelectedStudent /> },
  { path: "/faculty/practice", element: <ApprovePracticeTime/>},

  // Student Coordinator URLs
  { path: "/studentcoordinatorhome", element: <StudentCoordinatorHome /> },
  { path: "/studentCoordinator", element: <StudentCoordinator /> },
  { path: "/viweAppliedStudent/:id", element: <ViweAppliedStudent /> },
  { path: "/studentCoordinator/practice", element: <Prectice />},
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
