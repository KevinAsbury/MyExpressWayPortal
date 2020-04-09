import React, { Component } from 'react'
import Delivery from './Delivery/Delivery'
import roles from '../enum-roles'

type delivery = {
    description?: string, 
    driver?: string, 
    delivered?: boolean
}

type Props = {
    deliveries?: delivery[],
    role: roles
}

class Deliveries extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render () {
        return (this.props.deliveries?.map((deliv: delivery) => {
            return (
                <Delivery 
                    description={deliv.description}
                    driver={deliv.driver}
                    delivered={deliv.delivered}
                    role={this.props.role}
                />
            )
        })) 
    }
}

export default Deliveries