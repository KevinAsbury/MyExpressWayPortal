import React, { Component } from 'react'
import roles from '../enum-roles'
import Driver from './Driver/Driver'

type driver = {
    id: number,
    fname: string,
    lname: string
}

interface IProps {
    drivers?: driver[],
    role: roles
}


class Drivers extends Component<IProps> {
    // Render a list of driver components
    render () {
        return (this.props.drivers?.map((driv: driver) => {
            return (
                <Driver id={driv.id} fname={driv.fname} lname={driv.lname}/>
            )
        }
        ))
    }
}

export default Drivers