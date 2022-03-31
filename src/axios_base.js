import axios from 'axios';


export default axios.create({
  baseURL:process.env.REACT_APP_LINK_API,
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  }
});