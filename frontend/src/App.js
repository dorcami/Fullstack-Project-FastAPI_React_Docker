// Imports
import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import DomainComp from './Domain';

// Main function for the component
function App() {

  // Variables (states) declaration
  const [DB_Domains, setDB_Domains] = useState("")
  const [HostIP, setHostIP] = useState({})
  const [domain_to_search, setDomain] = useState("")
  
  // Functions declaration
  
  // Get all data from db
  const getDBdata = async () =>{
    let resp = await axios.get('http://0.0.0.0:8000/api/ips')
    setDB_Domains(resp.data)
    }

  // Get host's local and public ip
  const getHostIP = async () =>{
    let resp = await axios.get('http://0.0.0.0:8000/api/host')
    setHostIP(resp.data)
    }
  
  //  Create an ip request for the entered domain and store it in the db
  const searchForDomainsIP = async (domain) => {
    let resp = await axios.post('http://0.0.0.0:8000/api/ips/',{
      "domain": domain,
      "internal_ip": ""
    })
    setDB_Domains([...DB_Domains, resp.data])
  }

  const DeleteIP = async (domain) =>{
    let resp = await axios.delete('http://0.0.0.0:8000/api/ips/'+domain)
    console.log(resp)
    if(resp){
      console.log("now will delete it from the list")
      let temp = DB_Domains.filter(x => x["domain"] !== domain)
      setDB_Domains(temp)
    }
  }

  // Run these functions only once, when the component initializes
  useEffect(() => {
    getDBdata()
    getHostIP()
  },[])


  return (
    <div className="App container">
      <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{"width": "400px", backgroundColor: "white", marginTop: "15px"}}>
        <h1 className="card text-white bg-primary mb-1">Fullstack challenge</h1>
        {
          HostIP && (
            <div className='hostIP'>
            <h5>Your local IP is {HostIP.local_ip}</h5>
            <h5>Your public IP is {HostIP.public_ip}</h5>
            </div>
          )
        }
        <h5 className="card text-white bg-dark mb-1">Add new domain</h5>
        <span className="card-text">
          <input className="form-control mb-2" placeholder="Domain" onChange={(e) => setDomain(e.target.value)}/>
          <button className="btn btn-outline-primary mx-2 mb-2" onClick={() => searchForDomainsIP(domain_to_search)}>
            Enter
          </button>
        </span>

      </div>
      {
        DB_Domains && (DB_Domains.map((element, index) => {
          return <DomainComp key={index} data={element} func={DeleteIP}/>
        }))
      }
    </div>
  );
}

export default App;
