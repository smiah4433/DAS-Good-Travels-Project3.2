// import logo from './logo.svg';
import './Map.css';
import React, {Component} from 'react'
// import NewForm from './NewForm'
// import Nav from './Nav'

let baseUrl = 'http://localhost:3003'

class Map extends Component {
  constructor(props){
    super(props)

    this.state = { //FIX STATE TO MATCH TRAVEL STUFF
      baseUrl: 'https://api.mapbox.com/styles/v1/',
      username: 'syed-miah4433',
      style_id: '',
      overlay: '',
      lon: ,
      lat: ,
      zoom: ,
      bbox: [],
      auto: '',
      width: ,
      height:


      apikey: `access_token=${process.env.REACT_APP_API_KEY}`,

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
    this.getHolidays()
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
    // call getHolidays to get all of the holidays and refresh the page
  })
}


  getMaps = () => {
    fetch(baseUrl + '/maps', {
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
      // this.setState({maps: data}) this deals with the API
    })
  }

  addHoliday = (newHoliday) => {
    //update state with the new holiday frm the NewForm Component

    const copyHolidays = [...this.state.holidays]
    copyHolidays.push(newHoliday)
    this.setState({
      holidays: copyHolidays
    })
  }

  toggleCelebrated = (holiday) => {
    // console.log(holiday)
    fetch(baseUrl + '/holidays/' + holiday._id, {
      method: 'PUT',
      body: JSON.stringify({celebrated: !holiday.celebrated}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    }).then(res => res.json())
    .then(resJson => {
      // console.log(resJson)
      const copyHolidays = [...this.state.holidays]
      const findIndex = this.state.holidays.findIndex(
        holiday => holiday._id === resJson.data._id)
        copyHolidays[findIndex].celebrated = resJson.data.celebrated
        this.setState({
          holidays: copyHolidays
        })
    })
  }

  deleteHoliday = (id) => {
    console.log(id)
    fetch(baseUrl + '/holidays/' + id, {
      method: 'DELETE',
      credentials: "include"
    }).then( res => {
      console.log(res);
      //if I checked for a 200 res code create.
      if(res.status === 200) {
        // console.log("here");
        const findIndex =
        this.state.holidays.findIndex(holiday  => holiday._id === id)
        const copyHolidays = [...this.state.holidays]
        copyHolidays.splice(findIndex, 1)
        this.setState({
          holidays: copyHolidays
        })
      }
    })
  }

  addLike = (holiday) => {
    // console.log(holiday);
    fetch(baseUrl + '/holidays/addLikes/' + holiday._id, {
      method: 'PATCH',
      credentials: "include"
    }).then (res => res.json())
    // console.log(resJson);
    .then(resJson => {
      const copyHolidays = [...this.state.holidays]
      const findIndex = this.state.holidays.findIndex(holiday => holiday._id === resJson.data._id)
      copyHolidays[findIndex].likes = resJson.data.likes
      this.setState({
        holidays : copyHolidays
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    fetch(baseUrl + '/holidays/' + this.state.holidayToBeEdited._id,{
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
      const findIndex = this.state.holidays.findIndex(holiday => holiday._id === resJson.data._id)
      const copyHolidays = [...this.state.holidays]
      copyHolidays[findIndex] = resJson.data
      this.setState({
        holidays: copyHolidays,
        modalOpen: false
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showEditForm = (holiday) => {
    // console.log('I was clicked!');
    this.setState({
      modalOpen:true,
      name: holiday.name,
      description: holiday.description,
      holidayToBeEdited: holiday
    })
  }

  //Component lifecycle

  componentDidMount() {
    this.getHolidays()
  }



  render () {
    return (
      <div className="Map">
        <Nav loginUser={this.loginUser}
        register={this.register} />
        <h1>Holiday Celebrate</h1>
        <NewForm baseUrl={baseUrl}
        addHoliday={this.addHoliday} />
        <table>
          <tbody>
            {this.state.holidays.map((holiday, i) => {
              return (
                <tr key={i}>
                  <td onDoubleClick= {() => this.toggleCelebrated(holiday)} className={ holiday.celebrated ? 'celebrated' :null}>{holiday.name}</td>
                  <td >{holiday.description}</td>
                  <td >{holiday.likes}</td>
                  <td onClick= {() => this.addLike(holiday)}>Like</td>
                  <td onClick= {() => this.showEditForm(holiday)}>Edit this Holiday</td>
                  <td onClick= {() => this.deleteHoliday(holiday._id)}>X</td>
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

export default Map;