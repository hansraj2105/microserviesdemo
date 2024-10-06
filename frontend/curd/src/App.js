import logo from './logo.svg';
import './App.css';
import RoterConfig from "./compnents/configration/RoterConfig";
import LoginForm from "./compnents/users/LoginForm";
import {useEffect, useState} from "react";
import TableView from "./compnents/product/TableView";

function App() {
 const [islogedin,setlogin] = useState(false)
    useEffect(()=>{
        let item = localStorage.getItem("token");
        if(item!=undefined && item!=null && item.length>10)
            setlogin(true);
    })
    return (
        <div className = "App" >
            {islogedin?
                (<TableView stateChanger={setlogin} />)
            :
                (<LoginForm stateChanger={setlogin} />)}
        </div>
    );
}

export default App;