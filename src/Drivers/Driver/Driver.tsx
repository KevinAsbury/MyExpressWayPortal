import React, { Component } from "react"

type IProps = {
  id: number
  fname: string
  lname: string
}

class Driver extends Component<IProps> {
  // render a driver
  render() {
    return (
      <div>
        {this.props.id}: {this.props.fname} {this.props.lname}
      </div>
    )
  }
}

export default Driver
