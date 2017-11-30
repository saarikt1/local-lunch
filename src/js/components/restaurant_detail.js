import React, { Component } from 'react'

class RestaurantDetail extends Component {
  constructor(props) {
    super(props)

    this.state = { name: ''}
  }

  render() {
    return (
      <div className="details-form">
        <h1>This is the details view!</h1>
        <input
          className="restaurant-name"
          value={this.state.name}
          onChange={event => this.setState({name: event.target.value})} />
      </div>
    )
  }
}

export default RestaurantDetail