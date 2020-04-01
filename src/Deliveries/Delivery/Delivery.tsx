import React, { Component } from 'react'
import './Delivery.css'
import roles from '../../enum-roles'

type Props = {
    description?: string,
    driver?: string,
    delivered?: boolean,
    role?: roles
}

class Delivery extends Component<Props> {
    constructor(props: Props) {
        super(props)
        console.log(`[Delivery constructor]: ${props}`)
    }

    private deliveryStatus() {
        if (this.props.delivered) {
            return "Delivered"
        }
            
        return "Out for delivery"
    }

    private showDriver() {
        if (this.props.role === roles.MANAGER) {
            return <p>Driver: {this.props.driver}</p>
        }

        return null
    }

    private deliveryStyle() {
        if (!this.props.delivered) {
            return 'Delivery'
        }
        
        return 'Delivery delivered'
    }

    private deliveryClickhandler() {

    }

    render() {
        return (
            <div className={this.deliveryStyle()}>
                <div className="orange-box">X</div>
                <p><b>{this.props.description}</b></p>
                { this.showDriver() }
                <p>{this.deliveryStatus()}</p>
            </div>
        )
    }
}

export default Delivery