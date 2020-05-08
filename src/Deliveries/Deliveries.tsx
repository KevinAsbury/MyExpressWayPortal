import React, { Component } from "react"
import Delivery from "./Delivery/Delivery"
import roles from "../enum-roles"

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

interface IProps {
  deliveries?: delivery[]
  role: roles
  selectedToken: string
  drivers: driver[]
}

class Deliveries extends Component<IProps> {
  // renders a list of the Delivery component from the driver list that is provided by App.tsx
  render() {
    return this.props.deliveries?.map((deliv: delivery) => {
      return (
        <Delivery
          key={deliv.id}
          id={deliv.id}
          description={deliv.description}
          driver={deliv.driver_id}
          delivered={deliv.delivered}
          role={this.props.role}
          drivers={this.props.drivers}
          selectedToken={this.props.selectedToken}
        />
      )
    })
  }
}

export default Deliveries
