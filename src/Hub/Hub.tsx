import React, { Component } from 'react'
import styles from './Hub.module.css'
import roles from '../enum-roles'
import axios from '../axios_service'

type IProps = {
    role: roles,
    driverClicked: () => void,
    managerClicked: () => void,
    publicClicked: () => void,
    driverListClicked: () => void,
    newDelivery: (description: string, driver: number, id: number) => void,
    driverToken: string,
    managerToken: string,
    selectedToken: string,
    driverTokenChanged: (token: string) => void,
    managerTokenChanged: (token: string) => void,
    showDriverList: boolean
}

class Hub extends Component<IProps> {
    state = {
        description: '',
        driver: 0
    }

    // Determine if the label for delivery input should be shown
    private showDeliveryInputLabel() {
        if (this.props.role === roles.MANAGER && !this.props.showDriverList) {
            return <label>Description: {this.showDeliveryInput()}</label>
        }
    }

    // Determine if the delivery input should be shown
    private showDeliveryInput() {
        if (this.props.role === roles.MANAGER && !this.props.showDriverList) {
            return <input 
                onChange={(event) => this.onChangeDescription(event.target.value)} 
                type="text" style={{ width: "250px" }} 
                value={this.state.description}/>
        }
        return null
    }

    // Determine if the label for driver input should be shown
    private showDriverInputLabel() {
        if (this.props.role === roles.MANAGER && !this.props.showDriverList) {
            return <label>Driver: {this.showDriverInput()}</label>
        }
    }

    // Determine if the driver input should be shown
    private showDriverInput() {
        if (this.props.role === roles.MANAGER && !this.props.showDriverList) {
            return <input 
                onChange={(event) => this.onChangeDriver(event.target.value)} 
                type="text" value={this.state.driver}/>
        }
    }

    // Determine if the submit button should be shown
    private showSubmitButton() {
        if (this.props.role === roles.MANAGER && !this.props.showDriverList) {
            return <button onClick={this.submitButtonClick}>Submit</button>
        }
    }

    // Instert a break between componentents when called
    private insertBreak() {
        if (this.props.role === roles.MANAGER && !this.props.showDriverList) {
            return <br />
        }
    }

    // Save the new description to the state
    private onChangeDescription(description: string){
        this.setState({
            description: description
        })
    }

    // Save the new driver information to the state
    private onChangeDriver(driver: string){
        this.setState({
            driver: driver
        })
    }

    // POST the new delivery to the server when submit button clicked
    private submitButtonClick = () => {
        if (this.state.description !== '' && this.state.driver !== 0) {
            try {
                const newDelivery = {
                    description: this.state.description
                }
                const authHeader = {
                    headers: {
                        'Authorization': `Bearer ${this.props.selectedToken}`
                    }
                }
                axios.post('/deliveries', newDelivery, authHeader)
                    .then(response => {
                        this.props.newDelivery(this.state.description, this.state.driver, response.data.id)
                    })
            } finally {
                this.setState({
                    description: '',
                    driver: '0'
                })
            }
        }
    }

    // Render the elements of the hub
    // This could be broken up in to smaller components
    render() {
        return (
            <div className={styles.Hub}>
                <h1>My Express Way</h1>
                <h3>Delivery Management Portal</h3>
                <p>Manager Auth0 Token: <input 
                    type="text" 
                    value={this.props.managerToken} 
                    style={{ width: "250px" }}
                    onChange={(e) => this.props.managerTokenChanged(e.target.value)}/></p>
                <p>Driver Auth0 Token: <input 
                    type="text" 
                    value={this.props.driverToken}
                    style={{ width: "250px" }}
                    onChange={(e) => this.props.driverTokenChanged(e.target.value)}/></p>
                <button onClick={this.props.publicClicked}>Public Role</button>
                <button onClick={this.props.driverClicked}>Driver Role</button>
                <button onClick={this.props.managerClicked}>Manager Role</button>
                <button onClick={this.props.driverListClicked}>Driver List</button>
                { this.props.role === roles.MANAGER && !this.props.showDriverList ? <hr style={{ width: "250px" }} /> : null }
                { this.props.role === roles.MANAGER && !this.props.showDriverList ? <p><b>Create New Delivery:</b></p> : null }
                { this.insertBreak() }
                { this.showDeliveryInputLabel() }
                { this.insertBreak() }
                { this.showDriverInputLabel() }
                { this.showSubmitButton() }
                { this.props.role === roles.MANAGER && !this.props.showDriverList ? <hr style={{ width: "250px" }} /> : null }
            </div>
        )
    }
}

export default Hub