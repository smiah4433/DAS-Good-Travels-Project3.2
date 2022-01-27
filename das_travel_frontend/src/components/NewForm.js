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
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
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
      this.props.adddestination(data)
      this.setState({
        name: ''
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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" onChange={ (e) => this.handleChange(e) } value={this.state.name}/>
        <input type="submit" value="Add a reason to celebrate"/>
      </form>
    )
  }
}