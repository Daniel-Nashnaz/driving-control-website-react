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
import Map from './pages/Map';

function App() {

  const { user } = useContext(AuthContext);
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
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute accessBy="authenticated">
                        <Map/>
                      </ProtectedRoute>
                    }
                  ></Route>
                   <Route exact path="/travel" element={<LastTravelOfUsers/>} />
                   <Route exact path="/user/:id/:fullName" element={<UserDetailsOfTravels/>} />
                   <Route exact path="/tripsummary/:tripId"  element={<StatisticsOfTrip/>}/>
                   <Route exact path="/allInfromation/:tripId" element={<AllInfromationAboutTrip/>} />
                  {/* <Route path="/settings" element={<p>setting</p>} /> */}
                  {/* <Route path="/travel" element={<div>Add Travel</div>}></Route> */}
                  <Route path="/addDriverToVehicle" element={<AddDriverToVehicle />} />
                  <Route path="/addVeicle" element={<TableOfVehicles />}></Route>
                  <Route exact path="/userDetails" element={<UserDetails />} />
                  <Route
                    exact path="/addDriver"
                    element={
                      <ProtectedRoute accessBy="authenticated">
                        <Register myprops={"User"} />
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    exact path="/settingAlerts"
                    element={
                      <ProtectedRoute accessBy="authenticated">
                        <SettigAlerts />
                      </ProtectedRoute>
                    }
                  ></Route>


                  {/* <Route path="/addVeicle" element={<TableOfVehicles />}></Route> */}
                  {/* <Route path="/addDriverToVehicle" element={<AddDriverToVehicle/>}></Route> */}
                  <Route path="/profile" element={<UserProfile/>}></Route>

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
