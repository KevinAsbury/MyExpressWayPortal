import React, { Component } from 'react'
import './App.css'
import Hub from './Hub/Hub'
import Deliveries from './Deliveries/Deliveries'
import roles from './enum-roles'
import axios from './axios_service'

interface IProps { 
}

type delivery = {
  description: string, 
  driver_id: number, 
  delivered: boolean,
  id: number
}

interface IState {
  deliveries: delivery[],
  role: roles
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {deliveries: [], role: roles.PUBLIC}
  }

  componentDidMount() {
    axios.get('/deliveries')
      .then(response => {
        this.setState({deliveries: response.data})
      })
  }

  driverRoleClicked = () => {
    this.setState({
      role: roles.DRIVER
    })
    // TODO: set the authorization token
    // axios.defaults.headers.common['Authorization'] = ''
  }

  managerRoleClicked = () => {
    this.setState({
      role: roles.MANAGER
    })
    // TODO: set the authorization token
    // axios.defaults.headers.common['Authorization'] = ''
  }

  publicRoleClicked = () => {
    this.setState({
      role: roles.PUBLIC
    })
    // TODO: set the authorization token
    // axios.defaults.headers.common['Authorization'] = ''
  }

  newDelivery = (description: string, driver: number, id: number) => {
      let newDeliveries = [...this.state.deliveries]
      newDeliveries.push({ description: description, driver_id: driver, delivered: false, id: id })
      this.setState({ deliveries: newDeliveries })
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
