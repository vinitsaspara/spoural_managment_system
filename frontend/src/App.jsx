import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the protected route
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
      {
        path: "/schedule",
        element: <GameSchedule />
      },

      // Admin Protected Routes
      {
        path: "/admin",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/members",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Members />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/members/add",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <MemberAdd />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/member/details",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <MemberDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/game",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <GameController />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/game/details/:id",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminGameDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/game/create",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminCreateGame />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/addschedule",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AddSchedule />
          </ProtectedRoute>
        ),
      },

      // Faculty Protected Routes
      {
        path: "/facultyhome",
        element: (
          <ProtectedRoute allowedRoles={["Faculty"]}>
            <FacultyHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/faculty",
        element: (
          <ProtectedRoute allowedRoles={["Faculty"]}>
            <Faculty />
          </ProtectedRoute>
        ),
      },
      {
        path: "/faculty/viewselectedStudent/:id",
        element: (
          <ProtectedRoute allowedRoles={["Faculty"]}>
            <ViweSelectedStudent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/faculty/allplayer",
        element: (
          <ProtectedRoute allowedRoles={["Faculty"]}>
            <AllSelectedStudent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/faculty/practice",
        element: (
          <ProtectedRoute allowedRoles={["Faculty"]}>
            <ApprovePracticeTime />
          </ProtectedRoute>
        ),
      },

      // Student Coordinator Protected Routes
      {
        path: "/studentcoordinatorhome",
        element: (
          <ProtectedRoute allowedRoles={["StudentCoordinator"]}>
            <StudentCoordinatorHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/studentCoordinator",
        element: (
          <ProtectedRoute allowedRoles={["StudentCoordinator"]}>
            <StudentCoordinator />
          </ProtectedRoute>
        ),
      },
      {
        path: "/viweAppliedStudent/:id",
        element: (
          <ProtectedRoute allowedRoles={["StudentCoordinator"]}>
            <ViweAppliedStudent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/createPracticeSchedule/:gameId",
        element: (
          <ProtectedRoute allowedRoles={["StudentCoordinator"]}>
            <CreatePracticeSchedule />
          </ProtectedRoute>
        ),
      },
      {
        path: "/studentCoordinator/practice",
        element: (
          <ProtectedRoute allowedRoles={["StudentCoordinator"]}>
            <Prectice />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
