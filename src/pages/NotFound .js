import { Result } from 'antd';
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../common/AuthContext';


const NotFound = () =>{
  const { user } = useContext(AuthContext);
  return(
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={user ?( <Link to='/'>Back Home</Link>):(<Link to='/home'>Back Home</Link>)}
    />
  );
};
export default NotFound;