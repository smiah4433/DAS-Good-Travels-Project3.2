import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar } from 'react-bootstrap'


function App() {
  return (
    <div className="Nav">
      <Navbar bg="info" varient="dark"
        sticky="top">
        
        <Nav>
          <Nav.Link href="Locations">Top Locations</Nav.Link>
          <Nav.Link href="Add">Add A Place</Nav.Link>
          <Nav.Link href="Explore">Explore More</Nav.Link>
          <Nav.Link href="SignIn">Sign In</Nav.Link>
          <Nav.Link href="SignUp">Sign Up</Nav.Link>
        </Nav>


      </Navbar>
      <div className = "content">
        This is a Content
      </div>
    </div>
  )

}


export default App;
