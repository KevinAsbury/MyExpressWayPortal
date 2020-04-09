import React, { Component } from 'react'
import styles from './Hub.module.css'
import roles from '../enum-roles'

type Props = {
    role: roles,
    driverClicked: () => void,
    managerClicked: () => void,
    publicClicked: () => void,
    newDelivery: (description: string, driver: string) => void
}

class Hub extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    state = {
        description: '',
        driver: ''
    }

    private showDeliveryInputLabel() {
        if (this.props.role === roles.MANAGER) {
        return <label>Description: {this.showDeliveryInput()}</label>
        }
    }

    private showDeliveryInput() {
        if (this.props.role === roles.MANAGER) {
            return <input 
                onChange={(event) => this.onChangeDescription(event.target.value)} 
                type="text" style={{ width: "250px" }} 
                value={this.state.description}/>
        }
        return null
    }

    private showDriverInputLabel() {
        if (this.props.role === roles.MANAGER) {
            return <label>Driver: {this.showDriverInput()}</label>
        }
    }

    private showDriverInput() {
        if (this.props.role === roles.MANAGER) {
            return <input 
                onChange={(event) => this.onChangeDriver(event.target.value)} 
                type="text" value={this.state.driver}/>
        }
    }

    private showSubmitButton() {
        if (this.props.role === roles.MANAGER) {
            return <button onClick={this.submitButtonClick}>Submit</button>
        }
    }

    private insertBreak() {
        if (this.props.role === roles.MANAGER) {
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
        if (this.state.description !== '' && this.state.driver !== '') {
            try {
                this.props.newDelivery(this.state.description, this.state.driver)
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
                <button onClick={this.props.publicClicked}>Public Role</button>
                <button onClick={this.props.driverClicked}>Driver Role</button>
                <button onClick={this.props.managerClicked}>Manager Role</button>
                { this.props.role === roles.MANAGER ? <hr style={{ width: "250px" }} /> : null }
                { this.props.role === roles.MANAGER ? <p><b>Create New Delivery:</b></p> : null }
                { this.insertBreak() }
                { this.showDeliveryInputLabel() }
                { this.insertBreak() }
                { this.showDriverInputLabel() }
                { this.showSubmitButton() }
                { this.props.role === roles.MANAGER ? <hr style={{ width: "250px" }} /> : null }
            </div>
        )
    }
}

export default Hub