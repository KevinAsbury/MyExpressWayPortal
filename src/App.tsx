import React, { Component } from "react"
import "./App.css"
import Hub from "./Hub/Hub"
import Deliveries from "./Deliveries/Deliveries"
import Drivers from "./Drivers/Drivers"
import roles from "./enum-roles"
import axios from "./axios_service"

interface IProps {}

type delivery = {
  description: string
  driver_id: number
  delivered: boolean
  id: number
}

type driver = {
  id: number
  fname: string
  lname: string
}

interface IState {
  deliveries: delivery[]
  role: roles
  drivers: driver[]
  showDriverList: boolean
  driverToken: string
  managerToken: string
  selectedToken: string
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      // Deliveries array, filled by axios in componentDidMount()
      deliveries: [],
      // The current role changed by role buttons
      role: roles.PUBLIC,
      // Drivers array, filled by axios in componentDidMount()
      drivers: [],
      // True if the driver list is to be displayed
      showDriverList: false,
      // The driver Auth0 token
      driverToken:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qTTJSVE5CUmtZd1FqRTRNRVV6UkRkRE5qTXhPRE5FTVRKRk1UWkJNREpFTlVRMlJUazNNUSJ9.eyJpc3MiOiJodHRwczovL2thLWRldi5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTQ1MTU5ODk0NjM5OTE1MTA1MTYiLCJhdWQiOlsibXlleHByZXNzd2F5IiwiaHR0cHM6Ly9rYS1kZXYuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU4ODk1NzcxNSwiZXhwIjoxNTg5MDQ0MTE1LCJhenAiOiJaS0wzRDNSall1azFlQndiR2k3WTNYUkZkc2xzRXdJdiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJwZXJtaXNzaW9ucyI6WyJnZXQ6ZGVsaXZlcmllcyIsInBhdGNoOmRlbGl2ZXJpZXMiXX0.sa38-Td7U43bgq3o3x883lDivZ0hgiiV7bI5HLuAodhpCcyXjSqf1x8FoP09YYWs8gJ_o7Vd-L5TXk-xEDNQ6pKWNFA_SWNfe3iAPJXU81XrcjeoPaGq6RCKcPapxMr8VrYjlaUm8I0xxQP575u1C09O9oIxFdQP5iwDJ6s1wIBpWp-CgkpOD3B6RZVcyJG1DARW93a_LulpWWygJh8_SAI6Zx_8bQDj5kBenQOXa3m-ieAiuwhdZLM8Cc248NOaoWJFbt-e7-YuP-bnsqcWQSCXXVD0IDTrx7yFnUexN7QHVAGppLQzm7R2ocpGoJ9v7u3cbAFys9CsFpA09trImw",
      // The manager Auth0 token
      managerToken:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qTTJSVE5CUmtZd1FqRTRNRVV6UkRkRE5qTXhPRE5FTVRKRk1UWkJNREpFTlVRMlJUazNNUSJ9.eyJpc3MiOiJodHRwczovL2thLWRldi5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTUxODI3NzUzNDI4ODIyMTE1MDEiLCJhdWQiOlsibXlleHByZXNzd2F5IiwiaHR0cHM6Ly9rYS1kZXYuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU4ODk1NzU1MCwiZXhwIjoxNTg5MDQzOTUwLCJhenAiOiJaS0wzRDNSall1azFlQndiR2k3WTNYUkZkc2xzRXdJdiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJwZXJtaXNzaW9ucyI6WyJkZWxldGU6ZGVsaXZlcmllcyIsImRlbGV0ZTpkcml2ZXJzIiwiZ2V0OmRlbGl2ZXJpZXMiLCJnZXQ6ZHJpdmVycyIsInBhdGNoOmRlbGl2ZXJpZXMiLCJwYXRjaDpkcml2ZXJzIiwicG9zdDpkZWxpdmVyaWVzIiwicG9zdDpkcml2ZXJzIl19.lvhhLmQHhE_-kveWip9tgOKNMemP1EgQ48J0bMVoCHLzN5U3Vmr0ZRIM5z8f2585iSLjulevhToTrcCXCeW5aCtwBViD7uSSGrBLKAU58_aGN2NYLmtMhB8ZVYobpMnn-ozEr-PHHyAGnJaggJYDlwtVLbfj9WMfnwHptZHbyIXSHuS5h8kZNwWSRAoTkW5fotBf5MVfqPxLGHu8O_lc5-CXrP8qqH_6mF4CSlL0w1kwfA_xvBmO1DMwyX0vJuxj68Gk-56Qb0uTM-G7ZpBSuJiMimgZ2nbya1aMJ_h5yXeNZAB9VJCt7FL5uJW2y-x4VaDfEx2BviloANua3APAlw",
      // The currently selected token, changed by role buttons
      selectedToken: "",
    }
  }

  componentDidMount() {
    // Collect the delivery information from the backend
    axios.get("/deliveries").then((response) => {
      this.setState({ deliveries: response.data })
    })
    
    // Collect the driver information from the backend using a manager token
    axios
      .get("/drivers", {
        headers: {
          Authorization: `Bearer ${this.state.managerToken}`,
        },
      })
      .then((response) => {
        this.setState({ drivers: response.data })
        console.log(response.data)
      })
  }

  // Set the role to the driver, select the driver token, and hide the driver list
  driverRoleClicked = () => {
    this.setState({
      selectedToken: this.state.driverToken,
      role: roles.DRIVER,
      showDriverList: false,
    })
  }

  // Set the role to the manager, select the manager token, and hide the driver list
  managerRoleClicked = () => {
    this.setState({
      selectedToken: this.state.managerToken,
      role: roles.MANAGER,
      showDriverList: false,
    })
  }

  // Set the role to a public user, clear the selected token, and hide the driver list
  publicRoleClicked = () => {
    this.setState({
      selectedToken: "",
      role: roles.PUBLIC,
      showDriverList: false,
    })
  }

  // Set the role to a manager to access the driver list
  driverListClicked = () => {
    this.setState({
      selectedToken: this.state.managerToken,
      role: roles.MANAGER,
      showDriverList: true,
    })
  }

  // Creates a copy of the current deliveries array and adds a new delivery. Sets the new delivery array in the sate.
  newDelivery = (description: string, driver: number, id: number) => {
    // Create a copy of the deliveries array so as not to alter original
    let newDeliveries = [...this.state.deliveries]
    // Push the new delivery information to the new array
    newDeliveries.push({
      description: description,
      driver_id: driver,
      delivered: false,
      id: id,
    })
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
          showDriverList={this.state.showDriverList}
        ></Hub>
        {this.state.showDriverList ? (
          <Drivers drivers={this.state.drivers} role={this.state.role} />
        ) : (
          <Deliveries
            drivers={this.state.drivers}
            deliveries={this.state.deliveries}
            role={this.state.role}
            selectedToken={this.state.selectedToken}
          />
        )}
      </div>
    )
  }
}

export default App
