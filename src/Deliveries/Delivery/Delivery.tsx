import React, { Component } from "react"
import "./Delivery.css"
import roles from "../../enum-roles"
import axios from "../../axios_service"

type Props = {
  id: number
  description?: string
  driver: number
  delivered?: boolean
  role?: roles
  drivers?: any
  selectedToken: string
}

class Delivery extends Component<Props> {
  state = {
    // True will hide the delivery item
    hidden: false,
    // Delivered checkbox status
    delivered: this.props.delivered,
    // Item description
    description: this.props.description,
    // Driver id
    driver: this.props.driver,
  }

  // Display a delivery status message
  private deliveryStatus() {
    if (this.state.delivered) {
      return "Delivered"
    } else {
      return "Out for delivery"
    }
  }

  // Determine if the checkbox is displayed
  private showDelivery() {
    if (this.props.role === roles.MANAGER || this.props.role === roles.DRIVER) {
      return (
        <input
          type="checkbox"
          checked={this.state.delivered}
          onClick={() => this.checkboxClick(this.props.id)}
        />
      )
    } else {
      return null
    }
  }

  // Determine if the driver input is displayed
  private showDriver() {
    if (this.props.role === roles.MANAGER) {
      if (this.props.drivers !== null) {
        let driver = this.props.drivers[this.props.driver]
        if (driver !== undefined) {
          return (
            <input
              value={driver.id}
              onChange={(e) =>
                this.handleDriverChange(e.target.value, this.props.id)
              }
            ></input>
          )
        } else {
          return (
            <input
              onChange={(e) =>
                this.handleDriverChange(e.target.value, this.props.id)
              }
            ></input>
          )
        }
      }
    }

    if (this.props.role === roles.DRIVER) {
      if (this.props.drivers !== null) {
        let driver = this.props.drivers[this.props.driver]
        if (driver !== undefined) {
          return `${driver.fname + " " + driver.lname} `
        } else {
          return <p></p>
        }
      }
    }

    return null
  }

  // Change handler for when driver id changes
  // Needs input validation
  private handleDriverChange = (driver: string, id: number) => {
    this.setState({ driver: driver })
    const newDriverId = {
      driver_id: +driver,
    }
    axios.patch(`/deliveries/${id}`, newDriverId, {
      headers: {
        Authorization: `Bearer ${this.props.selectedToken}`,
      },
    })
  }

  // Determine if the driver input label should be shown
  private showDriverLabel() {
    if (this.props.role === roles.MANAGER) {
      return "Driver ID:"
    }

    if (this.props.role === roles.DRIVER) {
      if (this.props.drivers !== null) {
        let driver = this.props.drivers[this.props.driver]
        if (driver !== undefined) {
          return <b>Driver: </b>
        } else {
          return ""
        }
      }
    }
  }

  // Determine if the description input should be shown
  private showDescription() {
    if (this.props.role === roles.MANAGER) {
      return (
        <input
          value={this.state.description}
          style={{ width: "250px" }}
          onChange={(e) =>
            this.handleDescriptionChange(e.target.value, this.props.id)
          }
        />
      )
    }
    return (
      <p>
        <b>{this.props.description}</b>
      </p>
    )
  }

  // Handle changes to the description input
  private handleDescriptionChange = (description: string, id: number) => {
    this.setState({ description: description })
    const newDescription = {
      description: this.state.description,
    }
    axios.patch(`/deliveries/${id}`, newDescription, {
      headers: {
        Authorization: `Bearer ${this.props.selectedToken}`,
      },
    })
  }

  // Hide the delivery if the state is hidden
  private deliveryStyle() {
    if (this.state.hidden) {
      return "hide"
    }

    let result = ""

    if (this.state.delivered) {
      result = "Delivery delivered"
    } else {
      result = "Delivery"
    }

    return result
  }

  // Use axios to delete the delivery if the X button is clicked
  private deleteClicked = (id: number) => {
    axios
      .delete(`/deliveries/${id}`, {
        headers: {
          Authorization: `Bearer ${this.props.selectedToken}`,
        },
      })
      .then((response) => {
        this.setState({ hidden: true })
      })
  }

  // Instert a break between elements if called
  private insertBreak() {
    if (this.props.role === roles.MANAGER) {
      return <br />
    }
  }

  // Handle check box clicks
  private checkboxClick = (id: number) => {
    let delivered = this.state.delivered
    const updated = {
      delivered: !delivered,
    }
    axios
      .patch(`/deliveries/${id}`, updated, {
        headers: {
          Authorization: `Bearer ${this.props.selectedToken}`,
        },
      })
      .then((response) => {
        this.setState({ delivered: !delivered })
      })
  }

  // Render the components
  render() {
    return (
      <div className={this.deliveryStyle()}>
        {this.props.role === roles.MANAGER ? (
          <div
            onClick={() => this.deleteClicked(this.props.id)}
            className="orange-box"
          >
            X
          </div>
        ) : null}
        {this.insertBreak()}
        {this.showDescription()}
        {this.insertBreak()}
        {this.showDriverLabel()}
        {this.showDriver()}
        {this.insertBreak()}
        <label>
          {this.showDelivery()}
          {this.deliveryStatus()}
        </label>
      </div>
    )
  }
}

export default Delivery
