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
import Apps from './test';

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
                  <Route path="/" element={<div>This is home page</div>}></Route>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute accessBy="non-authenticated">
                        <Login />
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute accessBy="authenticated">
                        <div>this is safe page</div>
                      </ProtectedRoute>
                    }
                  ></Route>
                  {/* <Route exact path="/" element={<p>Home</p>} /> */}
                  {/* <Route path="/messages" element={<p>message</p>} /> */}
                  {/* <Route path="/settings" element={<p>setting</p>} /> */}
                  {/* <Route path="/travel" element={<div>Add Travel</div>}></Route> */}
                  <Route path="/addDriverToVehicle" element={<AddDriverToVehicle />} />
                  <Route path="/addVeicle" element={<TableOfVehicles/>}></Route>
                  <Route exact path="/userDetails" element={<UserDetails />} />
                  <Route path='*' element={<NotFound />}/>
                  <Route
                    exact path="/addDriver"
                    element={
                      <ProtectedRoute accessBy="authenticated">
                        <Register myprops={"User"} />
                      </ProtectedRoute>
                    }
                  ></Route>



                  {/* <Route path="/addVeicle" element={<TableOfVehicles />}></Route> */}
                  {/* <Route path="/addDriverToVehicle" element={<AddDriverToVehicle/>}></Route> */}
                  <Route path="/profile" element={<Apps />}></Route>  

                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Layout></>) :
        (
          <Routes>
            <Route
              path="/"
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
            <Route path='*' element={<NotFound />}/>
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
