//Review is the child of Travel.js
import React, {Component} from 'react'

export default class Reviews extends Component {
    constructor(props){
        super(props)
        this.state = {
            review: ''
          }
    }
   
    handleSubmit = (event) => {
        event.preventDefault()
        // fetch to the backend
        fetch(this.props.baseUrl + '/reviews', {
          method: 'POST',
          body: JSON.stringify({name: this.state.review}),
          headers: {
            'Content-Type': 'application/json'
          },
        }).then( res => {
          return res.json()
        }).then( data => {
          //console.log(data)
          this.props.addReview(data)
          this.setState({
            review: ''
          })
        })
      }
    
      handleChange = (event) => {
        // console.log(event.target.value)
        this.setState({
          review: event.target.value
        })
      }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="review">Review: </label>
            <input type="text" placeholder="Review here." id="review" name="review" onChange={ (e) => this.handleChange(e) } value={this.state.review}/>
            <input type="submit" value="Add a review"/>
          </form>
        )
    }
}