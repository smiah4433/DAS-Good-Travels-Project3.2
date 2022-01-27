//Travel is the child of index.js and Sibling to Map.js
import React, {Component} from 'react'
import '../Travel.css';
import Explore from './Explore'
import TopPlaces from './TopPlaces'



let baseUrl = 'http://localhost:3003'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      travels:[],
      modalOpen: false,
      travelToBeEdited: {},
      description:'',
      name:'',

    }
  }



loginUser = (e) => {
  e.preventDefault()
  fetch(baseUrl + '/users/login', {
    method: 'POST',
    body: JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include"
  }).then(res => res.json())
  .then(resJson => {
    console.log(resJson)
    this.getTravel()
  })
}


register = (e) => {
  e.preventDefault()
  fetch(baseUrl + '/users/signup', {
    method: 'POST',
    body: JSON.stringify({
      username: e.target.username.value,
      password: e.target.password.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(resJson => {
    console.log(resJson)
    // call getTravel to get all of the travels and refresh the page
  })
}


  getTravel = () => { //goes back to homepage

    fetch(baseUrl + '/travels', {
      credentials: "include"
    })
    .then(res => {
      if(res.status == 200) {
        return res.json()
      } else {
        return []
      }
    }).then(data => {
      // console.log(data)
      this.setState({travels: data})
    })
  }

  addHoliday = (newHoliday) => {
    //update state with the new travel frm the NewForm Component

    const copyHolidays = [...this.state.travels]
    copyHolidays.push(newHoliday)
    this.setState({
      travels: copyHolidays
    })
  }

  toggleCelebrated = (travel) => {
    // console.log(travel)
    fetch(baseUrl + '/travels/' + travel._id, {
      method: 'PUT',
      body: JSON.stringify({celebrated: !travel.celebrated}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    }).then(res => res.json())
    .then(resJson => {
      // console.log(resJson)
      const copyHolidays = [...this.state.travels]
      const findIndex = this.state.travels.findIndex(
        travel => travel._id === resJson.data._id)
        copyHolidays[findIndex].celebrated = resJson.data.celebrated
        this.setState({
          travels: copyHolidays
        })
    })
  }

  deleteHoliday = (id) => { //This can either be bound to only our three usernames can delete or that you have to login to delete YOUR own posts. 
    console.log(id)
    fetch(baseUrl + '/travels/' + id, {
      method: 'DELETE',
      credentials: "include"
    }).then( res => {
      console.log(res);
      //if I checked for a 200 res code create. 
      if(res.status === 200) {
        // console.log("here");
        const findIndex = 
        this.state.travels.findIndex(travel  => travel._id === id)
        const copyHolidays = [...this.state.travels]
        copyHolidays.splice(findIndex, 1)
        this.setState({
          travels: copyHolidays
        })
      }
    })
  }

  addLike = (travel) => {
    // console.log(travel);
    fetch(baseUrl + '/travels/addLikes/' + travel._id, {
      method: 'PATCH',
      credentials: "include"
    }).then (res => res.json())
    // console.log(resJson);
    .then(resJson => {
      const copyHolidays = [...this.state.travels]
      const findIndex = this.state.travels.findIndex(travel => travel._id === resJson.data._id)
      copyHolidays[findIndex].likes = resJson.data.likes
      this.setState({
        travels : copyHolidays
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    fetch(baseUrl + '/travels/' + this.state.travelToBeEdited._id,{
      method: 'PUT',
      body: JSON.stringify({
        name: e.target.name.value,
        description: e.target.description.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    }).then(res => res.json())
    .then(resJson => {
      // console.log(resJson);
      const findIndex = this.state.travels.findIndex(travel => travel._id === resJson.data._id)
      const copyHolidays = [...this.state.travels]
      copyHolidays[findIndex] = resJson.data
      this.setState({
        travels: copyHolidays,
        modalOpen: false
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showEditForm = (travel) => {
    // console.log('I was clicked!');
    this.setState({
      modalOpen:true,
      name: travel.name,
      description: travel.description,
      travelToBeEdited: travel
    })
  }

  //Component lifecycle

  componentDidMount() {
    this.getTravel()
  }



  render () {
    return (
      <div className="App">
        {/* <Nav loginUser={this.loginUser}
        register={this.register} />
        <h1>Holiday Celebrate</h1>
        <NewForm baseUrl={baseUrl}
        addHoliday={this.addHoliday} /> */}
        <table>
          <tbody>
            {this.state.travels.map((travel, i) => {
              return (
                <tr key={i}>
                  <td onDoubleClick= {() => this.toggleCelebrated(travel)} className={ travel.celebrated ? 'celebrated' :null}>{travel.name}</td>
                  <td >{travel.description}</td>
                  <td >{travel.likes}</td>
                  <td onClick= {() => this.addLike(travel)}>Like</td>
                  <td onClick= {() => this.showEditForm(travel)}>Edit this Holiday</td>
                  <td onClick= {() => this.deleteHoliday(travel._id)}>X</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {
          this.state.modalOpen && 
          <form onSubmit={this.handleSubmit}>
            <label>Name: </label>
            <input name="name" value={this.state.name} onChange={this.handleChange} /><br/>
            <label>Description: </label>
            <input name="description" value={this.state.description} onChange={this.handleChange} /><br/>

            <button>Submit</button>

          </form>
        }
      </div>
    );
  }
  
}

export default App;
