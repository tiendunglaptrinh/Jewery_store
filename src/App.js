import Homepage from "./pages/Homepage";
import { useEffect } from 'react';
import axios from 'axios'

function App() {

  useEffect(() =>{
    fetchApi()
  }, [])
  const fetchApi = async () =>{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
    console.log(process.env.REACT_APP_API_URL)
    console.log("res", res);
  }
  return (
    <div className="App">
      <Homepage/>   
      </div>
  );
}

export default App;
