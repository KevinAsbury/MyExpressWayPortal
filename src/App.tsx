import React, { Component } from 'react';
import './App.css';
import Hub from './Hub/Hub'
import Deliveries from './Deliveries/Deliveries'
import roles from './enum-roles'

class App extends Component {
  constructor(props: any[]) {
    super(props)
    console.log (`[App Constructor]: ${props}`)
  }

  state = {
    deliveries: [
      { description: 'The softest white bread', driver: 'Brad Jones', delivered: false },
      { description: 'Hex bolt wrench', driver: 'Marty Wolf', delivered: false },
      { description: 'Better Homes and Gardens New Cookbook', driver: 'Clarence Jones', delivered: false },
      { description: 'Star Wars Episode VI', driver: 'Marty Wold', delivered: true},
      { description: 'Dungeon Masters Guide', driver: 'Mary Stewart', delivered: false }
    ],
    role: roles.PUBLIC
  }

  driverRoleClicked = () => {
    this.setState({
      role: roles.DRIVER
    })
  }

  managerRoleClicked = () => {
    this.setState({
      role: roles.MANAGER
    })
  }

  publicRoleClicked = () => {
    this.setState({
      role: roles.PUBLIC
    })
  }

  newDelivery = (description: string, driver: string) => {
    let newDeliveries = [...this.state.deliveries]
    newDeliveries.push({ description: description, driver: driver, delivered: false })
    this.setState({
      deliveries: newDeliveries
    })
  }

  render() {
    return (
      <div className="App">
        <Hub 
          role={this.state.role} 
          driverClicked={this.driverRoleClicked} 
          managerClicked={this.managerRoleClicked}
          publicClicked={this.publicRoleClicked}
          newDelivery={this.newDelivery} >
        </Hub>
        <Deliveries 
          deliveries={this.state.deliveries}
          role={this.state.role}/>
      </div>
    )
  }
}

export default App;
