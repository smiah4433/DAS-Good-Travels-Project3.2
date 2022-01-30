//Travel is the child of index.js and Sibling to Map.js
import React from 'react'
import '../Travel.css';
import Explore from './Explore'
import TopPlaces from './TopPlaces'
import NewForm from './NewForm'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Showcase from './Showcase'
import Destinations from './Destinations'
import Footer from './Footer'
import Login from './Login.js'
import SignUp from './SignUp'


let baseUrl = 'http://localhost:3003'

// class Travel extends Component {
//   constructor(props){
//     super(props)

//     this.state = {
//       travels:[],
//       modalOpen: false,
//       travelToBeEdited: {},
//       description:'',
//       name:'',
//       img: '',
//       location: ''
//     }
//   }

function Travel() {



// loginUser = (e) => {
//   e.preventDefault()
//   fetch(baseUrl + '/users/login', {
//     method: 'POST',
//     body: JSON.stringify({
//       username: e.target.username.value,
//       password: e.target.password.value
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     credentials: "include"
//   }).then(res => res.json())
//   .then(resJson => {
//     console.log(resJson)
//     this.getTravel()
//   })
// }


// register = (e) => {
//   e.preventDefault()
//   fetch(baseUrl + '/users/signup', {
//     method: 'POST',
//     body: JSON.stringify({
//       username: e.target.username.value,
//       password: e.target.password.value
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }).then(res => res.json())
//   .then(resJson => {
//     console.log(resJson)
//     // call getTravel to get all of the travels and refresh the page
//   })
// }


//   getTravel = () => { //goes back to homepage

//     fetch(baseUrl + '/travels', {
//       credentials: "include"
//     })
//     .then(res => {
//       if(res.status == 200) {
//         return res.json()
//       } else {
//         return []
//       }
//     }).then(data => {
//       // console.log(data)
//       this.setState({travels: data})
//     })
//   }

//   addTravel = (newTravel) => {
//     //update state with the new travel frm the NewForm Component

//     const copyTravels = [...this.state.travels]
//     copyTravels.push(newTravel)
//     this.setState({
//       travels: copyTravels
//     })
//   }

//   // toggleCelebrated = (travel) => {
//   //   // console.log(travel)
//   //   fetch(baseUrl + '/travels/' + travel._id, {
//   //     method: 'PUT',
//   //     body: JSON.stringify({celebrated: !travel.celebrated}),
//   //     headers: {
//   //       'Content-Type': 'application/json'
//   //     },
//   //     credentials: "include"
//   //   }).then(res => res.json())
//   //   .then(resJson => {
//   //     // console.log(resJson)
//   //     const copyTravels = [...this.state.travels]
//   //     const findIndex = this.state.travels.findIndex(
//   //       travel => travel._id === resJson.data._id)
//   //       copyTravels[findIndex].celebrated = resJson.data.celebrated
//   //       this.setState({
//   //         travels: copyTravels
//   //       })
//   //   })
//   // }

//   deleteTravel = (id) => { //This can either be bound to only our three usernames can delete or that you have to login to delete YOUR own posts.
//     console.log(id)
//     fetch(baseUrl + '/travels/' + id, {
//       method: 'DELETE',
//       credentials: "include"
//     }).then( res => {
//       console.log(res);
//       //if I checked for a 200 res code create.
//       if(res.status === 200) {
//         // console.log("here");
//         const findIndex =
//         this.state.travels.findIndex(travel  => travel._id === id)
//         const copyTravels = [...this.state.travels]
//         copyTravels.splice(findIndex, 1)
//         this.setState({
//           travels: copyTravels
//         })
//       }
//     })
//   }

//   addLike = (travel) => {
//     // console.log(travel);
//     fetch(baseUrl + '/travels/addLikes/' + travel._id, {
//       method: 'PATCH',
//       credentials: "include"
//     }).then (res => res.json())
//     // console.log(resJson);
//     .then(resJson => {
//       const copyTravels = [...this.state.travels]
//       const findIndex = this.state.travels.findIndex(travel => travel._id === resJson.data._id)
//       copyTravels[findIndex].likes = resJson.data.likes
//       this.setState({
//         travels : copyTravels
//       })
//     })
//   }

//   handleSubmit = (e) => {
//     e.preventDefault()

//     fetch(baseUrl + '/travels/' + this.state.travelToBeEdited._id,{
//       method: 'PUT',
//       body: JSON.stringify({
//         name: e.target.name.value,
//         description: e.target.description.value,
//         img: e.target.img.value,
//         location: e.target.location.value,
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       credentials: "include"
//     }).then(res => res.json())
//     .then(resJson => {
//       // console.log(resJson);
//       const findIndex = this.state.travels.findIndex(travel => travel._id === resJson.data._id)
//       const copyTravels = [...this.state.travels]
//       copyTravels[findIndex] = resJson.data
//       this.setState({
//         travels: copyTravels,
//         modalOpen: false
//       })
//     })
//   }

//   handleChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value
//     })
//   }

//   showEditForm = (travel) => {
//     // console.log('I was clicked!');
//     this.setState({
//       modalOpen:true,
//       name: travel.name,
//       description: travel.description,
//       travelToBeEdited: travel
//     })
//   }

  //Component lifecycle

  // componentDidMount() {
  //   this.getTravel()
  // }

return (
  <Router>
      <Header />

      <Switch>
        <Route path='/'>
          <Showcase />
          <Destinations />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        {/* <Route path='*'>
          <Error />
        </Route> */}
      </Switch>
      <Footer />
    </Router>
)




}

export default Travel;
