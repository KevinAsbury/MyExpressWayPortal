import React, { Component } from 'react'
import './Delivery.css'
import roles from '../../enum-roles'
import axios from '../../axios_service'

type Props = {
    id: number,
    description?: string,
    driver: number,
    delivered?: boolean,
    role?: roles,
    drivers?: any
}

class Delivery extends Component<Props> {
    state = {
        hidden: false,
        delivered: this.props.delivered,
        description: this.props.description,
    }

    private deliveryStatus() {
        if (this.state.delivered) {
            return "Delivered"
        } else {
            return "Out for delivery"
        }
    }

    private showDelivery() {
        if (this.props.role === roles.MANAGER || this.props.role === roles.DRIVER) {
            return <input type="checkbox" checked={this.state.delivered} onClick={() => this.checkboxClick(this.props.id)}/>
        } else {
            return null
        }
    }

    private showDriver() {
        if (this.props.role === roles.MANAGER) {
            let driver = this.props.drivers[this.props.driver]
            if (driver !== undefined) {
                return <input value={driver.id}></input> 
            } else {
                return <input value='0'></input>
            }
        }

        if (this.props.role === roles.DRIVER) {
            let driver = this.props.drivers[this.props.driver]
            if (driver !== undefined) {
                return `${driver.fname + ' ' + driver.lname} `
            } else {
                return <p></p>
            }
        }

        return null
    }

    private showDriverLabel() {
        if (this.props.role === roles.MANAGER) {
            return 'Driver ID:'
        }

        if (this.props.role === roles.DRIVER) {
            let driver = this.props.drivers[this.props.driver]
            if (driver !== undefined) {
                return <b>Driver: </b>
            } else {
                return ''
            }
        }
    }

    private showDescription() {
        if (this.props.role === roles.MANAGER) {
            return <input value={this.state.description} style={{ width: "250px" }} onChange={(e) => this.handleChange(e.target.value, this.props.id)} />
        }
        return <p><b>{this.props.description}</b></p>
    }

    private handleChange = (description: string, id: number) => {
        this.setState({ description: description})
        const newDescription = {
            description: this.state.description
        }
        axios.patch(`/deliveries/${id}`, newDescription)
    }

    private deliveryStyle() {
        if (this.state.hidden) {
            return 'hide'
        }

        let result = ''
        
        if (this.state.delivered) {
            result = 'Delivery delivered'
        } else {
            result = 'Delivery'
        }

        return result
    }

    private deleteClicked = (id:number) => {
        axios.delete(`/deliveries/${id}`)
            .then(response => {
                console.log(response.data)
                this.setState({hidden: true})
            })
    }

    private insertBreak() {
        if (this.props.role === roles.MANAGER) {
            return <br />
        }
    }

    private checkboxClick = (id: number) => {
        let delivered = this.state.delivered
        const updated = {
            delivered: !delivered
        }
        axios.patch(`/deliveries/${id}`, updated)
            .then(response => {
                this.setState({ delivered: !delivered })
                console.log(response.data)
            })
    }

    render() {
        return (
            <div className={this.deliveryStyle()}>
                { this.props.role === roles.MANAGER ? <div onClick={() => this.deleteClicked(this.props.id)} className="orange-box">X</div> : null }
                { this.insertBreak() }
                { this.showDescription() }
                { this.insertBreak() }
                { this.showDriverLabel() }
                { this.showDriver() }
                { this.insertBreak() }
                <label>{this.showDelivery()}{this.deliveryStatus()}</label>
            </div>
        )
    }
}

export default Delivery