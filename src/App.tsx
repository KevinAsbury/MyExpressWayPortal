import React, { Component } from 'react'
import './App.css'
import Hub from './Hub/Hub'
import Deliveries from './Deliveries/Deliveries'
import Drivers from './Drivers/Drivers'
import roles from './enum-roles'
import axios from './axios_service'

type delivery = {
  description: string, 
  driver_id: number, 
  delivered: boolean,
  id: number
}

type driver = {
  id: number,
  fname: string,
  lname: string
}

interface IState {
  deliveries: delivery[],
  role: roles,
  drivers: driver[],
  showDriverList: boolean,
  driverToken: string,
  managerToken: string,
  selectedToken: string
}

class App extends Component<IState> {
    state = {
      // Deliveries array, filled by axios in componentDidMount()
      deliveries: [], 
      // The current role changed by role buttons
      role: roles.PUBLIC,
      // Drivers array, filled by axios in componentDidMount()
      drivers: [],
      // True if the driver list is to be displayed
      showDriverList: false,
      // The driver Auth0 token
      driverToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qTTJSVE5CUmtZd1FqRTRNRVV6UkRkRE5qTXhPRE5FTVRKRk1UWkJNREpFTlVRMlJUazNNUSJ9.eyJpc3MiOiJodHRwczovL2thLWRldi5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTQ1MTU5ODk0NjM5OTE1MTA1MTYiLCJhdWQiOlsibXlleHByZXNzd2F5IiwiaHR0cHM6Ly9rYS1kZXYuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU4ODg2NzU5OCwiZXhwIjoxNTg4OTUzOTk4LCJhenAiOiJaS0wzRDNSall1azFlQndiR2k3WTNYUkZkc2xzRXdJdiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJwZXJtaXNzaW9ucyI6WyJnZXQ6ZGVsaXZlcmllcyIsInBhdGNoOmRlbGl2ZXJpZXMiXX0.cM7Ryknyu0O_kVqfL85mA-A58R2Lz0Y4iimQeS-t9iHnf63xTfaeYmO3aXnsnCXRUAmMUwKhip6pVpzjza5jozml8XruhHsPist6aXole7SoWiLmVZXNmQ1MJJni1RUS8PUpcc65Ge6kKs0lovLyvoSN9wAbF8DXYAtWwBEMAb5pkrEuW8zuE5q7keRo9O882YLFYpcDJqyE-xRYOsYHiSxYvgzk9aY70oCTxKd0alKDz-Qdipp--c-V4mVa1AJb5qpye2jDDuyME-G8E9C59VIPzzPgDAbJpbpTG0o1vZqdmuw_F6bUwuQsU6z4sQXwR0PVXGkI23P-l20sxq_K2A',
      // The manager Auth0 token
      managerToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qTTJSVE5CUmtZd1FqRTRNRVV6UkRkRE5qTXhPRE5FTVRKRk1UWkJNREpFTlVRMlJUazNNUSJ9.eyJpc3MiOiJodHRwczovL2thLWRldi5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTUxODI3NzUzNDI4ODIyMTE1MDEiLCJhdWQiOlsibXlleHByZXNzd2F5IiwiaHR0cHM6Ly9rYS1kZXYuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU4ODg2NjcyNSwiZXhwIjoxNTg4OTUzMTI1LCJhenAiOiJaS0wzRDNSall1azFlQndiR2k3WTNYUkZkc2xzRXdJdiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJwZXJtaXNzaW9ucyI6WyJkZWxldGU6ZGVsaXZlcmllcyIsImRlbGV0ZTpkcml2ZXJzIiwiZ2V0OmRlbGl2ZXJpZXMiLCJnZXQ6ZHJpdmVycyIsInBhdGNoOmRlbGl2ZXJpZXMiLCJwYXRjaDpkcml2ZXJzIiwicG9zdDpkZWxpdmVyaWVzIiwicG9zdDpkcml2ZXJzIl19.t5495-0IA7dpo0ffuJSZyWWaCw_W2uRNxN6uVZNiuVH6BplkudgbD0uJor9aSCaN3na7Y9GzAOoa2ptBpEuBCzX7fUsuQ5XYDXGZ70s-bdlHojJL0dIV8DkyuoN7l5-kUVUIvV6KiLFHoMTPBdEMcC_Psk_56vtrpTyhMV_I18UB4A1Xf0OiKkK-6NzqzWqla3Kt4B7iiaTB2L9ST_eTlIvwtOr4vdsqvIqi9EseJVn4Jb7rsYQ-iK6MBGxbORyFaCI0iPM16OCLolU16qDOVVzPUXD5Juagqzq87aP2VQU6dO0GsXSEwyjmQ9wyAQPxAY7tm9BnY4OQ5KwUCyHiFw',
      // The currently selected token, changed by role buttons
      selectedToken: ''
  }

  componentDidMount() {
    // Collect the delivery information from the backend
    axios.get('/deliveries')
      .then(response => {
        // Store the response in the state
        this.setState({deliveries: response.data})
      })

    // Collect the driver information from the backend using a manager token
    axios.get('/drivers', {
      headers: {
        'Authorization': `Bearer ${this.state.managerToken}`
      }
    })
      .then(response => {
        // Store the response in the state
        this.setState({drivers: response.data})
      })
  }

  // Set the role to the driver, select the driver token, and hide the driver list
  driverRoleClicked = () => {
    this.setState({
      selectedToken: this.state.driverToken,
      role: roles.DRIVER,
      showDriverList: false
    })
  }

  // Set the role to the manager, select the manager token, and hide the driver list
  managerRoleClicked = () => {
    this.setState({
      selectedToken: this.state.managerToken,
      role: roles.MANAGER,
      showDriverList: false
    })
  }

  // Set the role to a public user, clear the selected token, and hide the driver list
  publicRoleClicked = () => {
    this.setState({
      selectedToken: '',
      role: roles.PUBLIC,
      showDriverList: false
    })
  }

  // Set the role to a manager to access the driver list
  driverListClicked = () => {
    this.setState({
      selectedToken: this.state.managerToken,
      role: roles.MANAGER,
      showDriverList: true
    })
  }

  // Creates a copy of the current deliveries array and adds a new delivery. Sets the new delivery array in the sate.
  newDelivery = (description: string, driver: number, id: number) => {
    // Create a copy of the deliveries array so as not to alter original
    let newDeliveries = [...this.state.deliveries]
    // Push the new delivery information to the new array
    newDeliveries.push({ description: description, driver_id: driver, delivered: false, id: id })
    // Set the state to the new array
    this.setState({ deliveries: newDeliveries })
  }

  // Save the new token in the state
  driverTokenChanged = (token: string) => {
    this.setState({ driverToken: token })
  }

  // Save the new token in the state
  managerTokenChanged = (token: string) => {
    this.setState({ managerToken: token })
  }

  // Render the hub which contains the title, token input, and role selection buttons.
  // Render the delivery list OR the driver list.
  render() {
    return (
      <div className="App">
        <Hub 
          role={this.state.role} 
          driverClicked={this.driverRoleClicked} 
          managerClicked={this.managerRoleClicked}
          publicClicked={this.publicRoleClicked}
          driverListClicked={this.driverListClicked}
          newDelivery={this.newDelivery} 
          driverToken={this.state.driverToken}
          managerToken={this.state.managerToken}
          selectedToken={this.state.selectedToken} 
          driverTokenChanged={this.driverTokenChanged}
          managerTokenChanged={this.managerTokenChanged} 
          showDriverList={this.state.showDriverList} >
        </Hub>
        { this.state.showDriverList ? <Drivers 
          drivers={this.state.drivers} 
          role={this.state.role} /> : <Deliveries 
          drivers={this.state.drivers}
          deliveries={this.state.deliveries}
          role={this.state.role}
          selectedToken={this.state.selectedToken} />}
      </div>
    )
  }
}

export default App;
