//this will create a new post to include the review.
import React, { Component } from 'react'
import Reviews from './Reviews'

export default class NewForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      location: '',
      img: '',
      description: '',
      likes: 0,
      reviews: '',
      tags: '',
      modalOpen: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.props.baseUrl)
    // fetch to the backend
    fetch(this.props.baseUrl + '/travels', {
      method: 'POST',
      body: JSON.stringify({
          name: this.state.name,
          img: this.state.img,
          location: this.state.location,
          description: this.state.description
        }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then( res => {
      return res.json()
    }).then( data => {
      //console.log(data)
      this.props.addTravel(data)
      this.setState({
        name: '',
        location: '',
        img: '',
        description: '',
        likes: 0,
        reviews: '',
        tags: '',

      })
    })
  }

  handleChangeName = (event) => {
    // console.log(event.target.value)
    this.setState({
      name: event.target.value,
    })
  }
  handleChangeLocation = (event) => {
    // console.log(event.target.value)
    this.setState({
      location: event.target.value,
    })
  }
  handleChangeImg = (event) => {
    // console.log(event.target.value)
    this.setState({
      img: event.target.value,
    })
  }
  handleChangeDescription = (event) => {
    // console.log(event.target.value)
    this.setState({
      description: event.target.value,
    })
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" placeholder="What's the name??" id="name" name="name" onChange={ (e) => this.handleChangeName(e) } value={this.state.name}/>
            <input type="submit" value="Add New Travel Post"/>
        </form>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="location">Location: </label>
            <input type="text" placeholder="Where?" id="location" name="location" onChange={ (e) => this.handleChangeLocation(e) } value={this.state.location}/>
            {/* <input type="submit" value="Add a new location!"/> */}
        </form>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="img">Image:</label>
            <input img="text" placeholder="Image Address here." id="img" name="img" onChange={ (e) => this.handleChangeImg(e) } value={this.state.img}/>
            {/* <input type="submit" value="Add an Image Address!"/> */}
        </form>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="description">Description: </label>
            <input type="text" placeholder="Description here." id="description" name="description" onChange={ (e) => this.handleChangeDescription(e) } value={this.state.description}/>
            {/* <input type="submit" value="Add Description"/> */}
        </form>
      
        <Reviews />
      </div>  

    )
  }
}

