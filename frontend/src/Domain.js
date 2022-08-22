import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// A component for rendering each db document in a simple bootstrap style
export default function DomainComp(props) {

  // A callback function for deleting the current document form the database
  const deleteIP = () => {
    props.func(props.data.domain);
  }

  return (
    <div className="App">
      <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{"width": "400px", backgroundColor: "white", marginTop: "15px"}}>
        <h4 className="card text-dark bg-light mb-1">{props.data.domain}</h4>
        <h4 className="card text-white bg-primary mb-1">IP: {props.data.internal_ip}</h4>
        <button className="deletebtn" onClick={deleteIP}>Delete</button>
      </div>
    </div>
  );
}
