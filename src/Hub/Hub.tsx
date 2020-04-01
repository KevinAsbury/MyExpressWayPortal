import React, { Component } from 'react'
import styles from './Hub.module.css'
import roles from '../enum-roles'

type Props = {
    role: roles,
    driverClicked: any,
    managerClicked: any,
    publicClicked: any
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
                <button onClick={this.props.publicClicked}>Public Role</button>
                <button onClick={this.props.driverClicked}>Driver Role</button>
                <button onClick={this.props.managerClicked}>Manager Role</button>
            </div>
        )
    }
}

export default Hub