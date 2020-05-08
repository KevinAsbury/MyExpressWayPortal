import React, { Component } from 'react'
import './App.css'
import Hub from './Hub/Hub'
import Deliveries from './Deliveries/Deliveries'
import Drivers from './Drivers/Drivers'
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

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      deliveries: [], 
      role: roles.PUBLIC,
      drivers: [],
      showDriverList: false,
      driverToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qTTJSVE5CUmtZd1FqRTRNRVV6UkRkRE5qTXhPRE5FTVRKRk1UWkJNREpFTlVRMlJUazNNUSJ9.eyJpc3MiOiJodHRwczovL2thLWRldi5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTQ1MTU5ODk0NjM5OTE1MTA1MTYiLCJhdWQiOlsibXlleHByZXNzd2F5IiwiaHR0cHM6Ly9rYS1kZXYuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU4ODg2NzU5OCwiZXhwIjoxNTg4OTUzOTk4LCJhenAiOiJaS0wzRDNSall1azFlQndiR2k3WTNYUkZkc2xzRXdJdiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJwZXJtaXNzaW9ucyI6WyJnZXQ6ZGVsaXZlcmllcyIsInBhdGNoOmRlbGl2ZXJpZXMiXX0.cM7Ryknyu0O_kVqfL85mA-A58R2Lz0Y4iimQeS-t9iHnf63xTfaeYmO3aXnsnCXRUAmMUwKhip6pVpzjza5jozml8XruhHsPist6aXole7SoWiLmVZXNmQ1MJJni1RUS8PUpcc65Ge6kKs0lovLyvoSN9wAbF8DXYAtWwBEMAb5pkrEuW8zuE5q7keRo9O882YLFYpcDJqyE-xRYOsYHiSxYvgzk9aY70oCTxKd0alKDz-Qdipp--c-V4mVa1AJb5qpye2jDDuyME-G8E9C59VIPzzPgDAbJpbpTG0o1vZqdmuw_F6bUwuQsU6z4sQXwR0PVXGkI23P-l20sxq_K2A',
      managerToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qTTJSVE5CUmtZd1FqRTRNRVV6UkRkRE5qTXhPRE5FTVRKRk1UWkJNREpFTlVRMlJUazNNUSJ9.eyJpc3MiOiJodHRwczovL2thLWRldi5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTUxODI3NzUzNDI4ODIyMTE1MDEiLCJhdWQiOlsibXlleHByZXNzd2F5IiwiaHR0cHM6Ly9rYS1kZXYuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU4ODg2NjcyNSwiZXhwIjoxNTg4OTUzMTI1LCJhenAiOiJaS0wzRDNSall1azFlQndiR2k3WTNYUkZkc2xzRXdJdiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJwZXJtaXNzaW9ucyI6WyJkZWxldGU6ZGVsaXZlcmllcyIsImRlbGV0ZTpkcml2ZXJzIiwiZ2V0OmRlbGl2ZXJpZXMiLCJnZXQ6ZHJpdmVycyIsInBhdGNoOmRlbGl2ZXJpZXMiLCJwYXRjaDpkcml2ZXJzIiwicG9zdDpkZWxpdmVyaWVzIiwicG9zdDpkcml2ZXJzIl19.t5495-0IA7dpo0ffuJSZyWWaCw_W2uRNxN6uVZNiuVH6BplkudgbD0uJor9aSCaN3na7Y9GzAOoa2ptBpEuBCzX7fUsuQ5XYDXGZ70s-bdlHojJL0dIV8DkyuoN7l5-kUVUIvV6KiLFHoMTPBdEMcC_Psk_56vtrpTyhMV_I18UB4A1Xf0OiKkK-6NzqzWqla3Kt4B7iiaTB2L9ST_eTlIvwtOr4vdsqvIqi9EseJVn4Jb7rsYQ-iK6MBGxbORyFaCI0iPM16OCLolU16qDOVVzPUXD5Juagqzq87aP2VQU6dO0GsXSEwyjmQ9wyAQPxAY7tm9BnY4OQ5KwUCyHiFw',
      selectedToken: ''
    }
  }

  componentDidMount() {
    axios.get('/deliveries')
      .then(response => {
        this.setState({deliveries: response.data})
      })

    axios.get('/drivers', {
      headers: {
        'Authorization': `Bearer ${this.state.managerToken}`
      }
    })
      .then(response => {
        this.setState({drivers: response.data})
      })
  }

  driverRoleClicked = () => {
    this.setState({
      selectedToken: this.state.driverToken,
      role: roles.DRIVER,
      showDriverList: false
    })
  }

  managerRoleClicked = () => {
    this.setState({
      selectedToken: this.state.managerToken,
      role: roles.MANAGER,
      showDriverList: false
    })
  }

  publicRoleClicked = () => {
    this.setState({
      selectedToken: '',
      role: roles.PUBLIC,
      showDriverList: false
    })
  }

  driverListClicked = () => {
    this.setState({
      selectedToken: this.state.managerToken,
      role: roles.MANAGER,
      showDriverList: true
    })
  }

  newDelivery = (description: string, driver: number, id: number) => {
      let newDeliveries = [...this.state.deliveries]
      newDeliveries.push({ description: description, driver_id: driver, delivered: false, id: id })
      this.setState({ deliveries: newDeliveries })
  }

  driverTokenChanged = (token: string) => {
    this.setState({ driverToken: token })
  }

  managerTokenChanged = (token: string) => {
    this.setState({ managerToken: token })
  }

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
