import React, { Component } from 'react'
import styles from './Hub.module.css'
import roles from '../enum-roles'
import axios from '../axios_service'

type Props = {
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

class Hub extends Component<Props> {
    state = {
        description: '',
        driver: 0
    }

    private showDeliveryInputLabel() {
        if (this.props.role === roles.MANAGER && !this.props.showDriverList) {
            return <label>Description: {this.showDeliveryInput()}</label>
        }
    }

    private showDeliveryInput() {
        if (this.props.role === roles.MANAGER && !this.props.showDriverList) {
            return <input 
                onChange={(event) => this.onChangeDescription(event.target.value)} 
                type="text" style={{ width: "250px" }} 
                value={this.state.description}/>
        }
        return null
    }

    private showDriverInputLabel() {
        if (this.props.role === roles.MANAGER && !this.props.showDriverList) {
            return <label>Driver: {this.showDriverInput()}</label>
        }
    }

    private showDriverInput() {
        if (this.props.role === roles.MANAGER && !this.props.showDriverList) {
            return <input 
                onChange={(event) => this.onChangeDriver(event.target.value)} 
                type="text" value={this.state.driver}/>
        }
    }

    private showSubmitButton() {
        if (this.props.role === roles.MANAGER && !this.props.showDriverList) {
            return <button onClick={this.submitButtonClick}>Submit</button>
        }
    }

    private insertBreak() {
        if (this.props.role === roles.MANAGER && !this.props.showDriverList) {
            return <br />
        }
    }

    private onChangeDescription(description: string){
        this.setState({
            description: description
        })
    }

    private onChangeDriver(driver: string){
        this.setState({
            driver: driver
        })
    }

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
                    driver: ''
                })
            }
        }
    }

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