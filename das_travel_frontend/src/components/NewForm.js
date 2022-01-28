//this will create a new post to include the review.
import React, { Component } from 'react'

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
      body: JSON.stringify({name: this.state.name}),
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

  handleChange = (event) => {
    // console.log(event.target.value)
    this.setState({
      name: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" onChange={ (e) => this.handleChange(e) } value={this.state.name}/>
            <input type="submit" value="Add a new location!"/>
        </form>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="img">Image:</label>
            <input image="text" id="img" name="img" onChange={ (e) => this.handleChange(e) } value={this.state.img}/>
            <input type="submit" value="Add an Image!"/>
        </form>
      </div>  

    )
  }
}

