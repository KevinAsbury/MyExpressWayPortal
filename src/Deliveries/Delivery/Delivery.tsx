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
    }

    state = {
        hidden: false,
        delivered: this.props.delivered
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
            return <input type="checkbox" checked={this.state.delivered} onClick={this.checkboxClick}/>
        } else {
            return null
        }
    }

    private showDriver() {
        if (this.props.role === roles.MANAGER) {
            return <input value={this.props.driver}></input> 
        }

        return null
    }

    private showDescription() {
        if (this.props.role === roles.MANAGER) {
            return <input value={this.props.description} style={{ width: "250px" }} />
        }
        return <p><b>{this.props.description}</b></p>
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

    private deleteClicked = () => {
        this.setState({
            hidden: true
        })
    }

    private insertBreak() {
        if (this.props.role === roles.MANAGER) {
            return <br />
        }
    }

    private checkboxClick = () => {
        let delivered = this.state.delivered
        this.setState({
            delivered: !delivered
        })
    }

    render() {
        return (
            <div className={this.deliveryStyle()}>
                { this.props.role === roles.MANAGER ? <div onClick={this.deleteClicked} className="orange-box">X</div> : null }
                { this.insertBreak() }
                { this.showDescription() }
                { this.insertBreak() }
                { this.showDriver() }
                { this.insertBreak() }
                <label>{this.showDelivery()}{this.deliveryStatus()}</label>
            </div>
        )
    }
}

export default Delivery