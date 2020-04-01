import React, { Component } from 'react'
import styles from './Hub.module.css'
import roles from '../enum-roles'

type Props = {
    role: roles,
    driverClicked: any,
    managerClicked: any
}

class Hub extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <div className={styles.Hub}>
                <h1>My Express Way</h1>
                <h3>Delivery Management Portal</h3>
                {this.props.role === roles.PUBLIC ? 
                    <p><b>Debug - Select a role:</b></p>: null}
                {this.props.role === roles.PUBLIC || roles.MANAGER ? 
                    <button onClick={this.props.driverClicked}>Driver Role</button> : null}
                {this.props.role === roles.PUBLIC || roles.DRIVER ? 
                    <button onClick={this.props.managerClicked}>Manager Role</button> : null}
            </div>
        )
    }
}

export default Hub