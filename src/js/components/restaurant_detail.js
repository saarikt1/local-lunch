import React, { Component } from 'react'

class RestaurantDetail extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      name: 'Factory aka Lihamonttu',
      description: '',
      address: ''
    }
  }

  render() {
    return (
      <div className="details-form">
        <h1>{this.state.name}</h1>
        
        <label>
          Name:
          <input
            type="text"
            value={this.state.name}
            onChange={event => this.setState({name: event.target.value})} />
        </label>

        <label>
          Description:
          <textarea
            type="text"
            value={this.state.description}
            onChange={event => this.setState({description: event.target.value})} />
        </label>

        <label>
          Address:
          <input
            type="text"
            value={this.state.address}
            onChange={event => this.setState({address: event.target.value})} />
        </label>
      </div>
    )
  }
}

export default RestaurantDetail