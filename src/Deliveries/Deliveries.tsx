import React, { Component } from 'react'
import Delivery from './Delivery/Delivery'
import roles from '../enum-roles'

type delivery = {
    description: string, 
    driver_id: string, 
    delivered: boolean, 
    id: number
}

interface IProps {
    deliveries?: delivery[],
    role: roles
}

class Deliveries extends Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }

    render () {
        return (this.props.deliveries?.map((deliv: delivery) => {
            return (
                <Delivery 
                    key={deliv.id}
                    description={deliv.description}
                    driver={deliv.driver_id}
                    delivered={deliv.delivered}
                    role={this.props.role}
                />
            )
        })) 
    }
}

export default Deliveries