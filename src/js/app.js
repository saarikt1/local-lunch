import React, { Component } from 'react';
import { render } from 'react-dom';
import RestaurantDetail from './components/restaurant_detail'
import Purecss from 'purecss'

import '../css/style.css'

export default class Hello extends Component {
  render() {
    return (
      <div>
        <RestaurantDetail />
      </div>
    );
  }
}

render(<Hello />, document.getElementById('app'));