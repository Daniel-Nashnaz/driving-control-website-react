import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthContext from './common/AuthContext';
import ProtectedRoute from './common/ProtectedRoute';
import Login from './pages/Login';
import { Content } from 'antd/es/layout/layout';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Layout, theme } from 'antd';
import MainPage from './pages/MainPage';
import Register from './pages/Register';
import AddDriverToVehicle from './pages/AddDriverToVehicle';
import NotFound from './pages/NotFound ';
import TableOfVehicles from './pages/TableOfVehicles';
import UserDetails from './pages/UserDetails';
import SettigAlerts from './pages/SettingAlerts';
import LastTravelOfUsers from './pages/LastTravelOfUsers';
import UserDetailsOfTravels from './pages/InfoOfTravelsAboutUsers';
import StatisticsOfTrip from './pages/StatisticsOfTrip';
import UserProfile from './pages/Profile';
import AllInfromationAboutTrip from './pages/AllInformationAboutTrip';
import MessageList from './components/ShowAllMessage';
import TripsDashboard from './pages/TripsDashboard';
import MyChartComponent from './components/MyChartComponent ';
import AuthorizationRoute from './common/AuthorizationRoute';

function App() {

  const { user } = useContext(AuthContext);
  let role
  if (user) {
    role = user.roles.includes("ROLE_ADMIN");
  }
  const { token: { colorBgContainer } } = theme.useToken();
  return (
    <>
      {user ? (<>
        <Layout>
          <Navbar />
          <Layout>
            <Sidebar />
            <Layout
              style={{
                padding: '0 24px 24px',
              }}
            >
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: colorBgContainer,
                }}
              >
                <Routes>

                  {role && <>
                    <Route
                      path="/"
                      element={
                        <AuthorizationRoute accessBy="Admin">
                          <LastTravelOfUsers />
                        </AuthorizationRoute>
                      }
                    ></Route>
                    <Route exact path="/dashboard" element={<TripsDashboard />} />
                  </>}
                  {!role && <>
                    <Route exact path="/dashboard" element={<p>add graph of user</p>} />
                    <Route
                      path="/"
                      element={
                        <AuthorizationRoute accessBy="User">
                          <UserDetailsOfTravels />
                        </AuthorizationRoute>
                      }
                    ></Route>
                  </>}
                  <Route exact path="/user/:id/:fullName" element={<UserDetailsOfTravels />} />
                  <Route exact path="/tripsummary/:tripId" element={<StatisticsOfTrip />} />
                  <Route exact path="/allInfromation/:tripId" element={<AllInfromationAboutTrip />} />
                  <Route path="/infoAboutDriver/:userId" element={<MyChartComponent />} />

                  {/* <Route path="/travel" element={<div>Add Travel</div>}></Route> */}

                  <Route path="/addDriverToVehicle" element={
                    <AuthorizationRoute accessBy="Admin">
                      <AddDriverToVehicle />
                    </AuthorizationRoute>} />

                  <Route path="/addVeicle" element={
                    <AuthorizationRoute accessBy="Admin">
                      <TableOfVehicles />
                    </AuthorizationRoute>
                  }></Route>

                  <Route exact path="/userDetails" element={
                    <AuthorizationRoute accessBy="Admin">
                      <UserDetails />
                    </AuthorizationRoute>} />

                  <Route
                    exact path="/addDriver"
                    element={
                      <AuthorizationRoute accessBy="Admin">
                        <Register myprops={"User"} />
                      </AuthorizationRoute>
                    }
                  ></Route>
                  <Route
                    exact path="/settingAlerts"
                    element={
                      <AuthorizationRoute accessBy="Admin">
                        <SettigAlerts />
                      </AuthorizationRoute>
                    }
                  ></Route>


                  <Route path="/allmessagesSend" element={
                    <AuthorizationRoute accessBy="Admin">
                      <MessageList />
                    </AuthorizationRoute>}></Route>

                  <Route path="/profile" element={<UserProfile />}></Route>

                  <Route path='*' element={<NotFound />} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Layout></>) :
        (
          <Routes>
            <Route
              path="/home"
              element={
                <ProtectedRoute accessBy="non-authenticated">
                  <MainPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <ProtectedRoute accessBy="non-authenticated">
                  <Login />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <ProtectedRoute accessBy="non-authenticated">
                  <Register myprops={"Admin"} />
                </ProtectedRoute>
              }
            ></Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        )}
    </>
  );


  /*  {
      loggedIn && (
  
        {!loggedIn && (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register myprops={"Admin"} />} />
          </Routes>
        )
    }*/

}

export default App;
