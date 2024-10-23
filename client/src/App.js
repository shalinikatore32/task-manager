import './App.css';
import Signup from './components/SignUp';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './nav/Nav';
import Login from './components/Login';
import Dashboard from './dashboard-components/Dashoard';
import UserDashboard from './dashboard-components/UserDashboard';
import CreateTask from './dashboard-components/CreateTask';
import ViewTask from './dashboard-components/ViewTask';
import ManageTask from './dashboard-components/ManageTask';
import Logout from './components/Logout';
import PageNotFound from './components/PageNotFound';
import { Consumer } from './store-token/UseAuth';
import AssignTask from './dashboard-components/AssignTask';
import LoginSignup from './components/Login';
import TeamPage from './dashboard-components/TeamPage';
import Notifications from './dashboard-components/Notification';

function App() {
  const { isLoggedin } = Consumer();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={isLoggedin ? <Dashboard /> : <Login />} />
        <Route path="/login" element={<LoginSignup />} />
        
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<PageNotFound />} />
        

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index path="user-dashboard" element={<UserDashboard />} />
          <Route path='create-team' element={<TeamPage/>}/>
          <Route path="create-task" element={<CreateTask />} />
          
          <Route path="manage-task" element={<ManageTask />} />
          <Route path='assign-task' element={<AssignTask/>}/>
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
