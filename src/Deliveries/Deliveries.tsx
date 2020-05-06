import React, { Component } from 'react'
import Delivery from './Delivery/Delivery'
import roles from '../enum-roles'
import axios from '../axios_service'

type delivery = {
    description: string, 
    driver_id: number, 
    delivered: boolean, 
    id: number
}

interface IProps {
    deliveries?: delivery[],
    role: roles
}

class Deliveries extends Component<IProps> {
    state = {
        drivers: null
    }
    componentDidMount() {
        axios.get('/drivers')
            .then(response => {
                this.setState({drivers: response.data})
            })
    }

    render () {
        return (this.props.deliveries?.map((deliv: delivery) => {
            return (
                <Delivery 
                    key={deliv.id}
                    id={deliv.id}
                    description={deliv.description}
                    driver={deliv.driver_id}
                    delivered={deliv.delivered}
                    role={this.props.role}
                    drivers={this.state.drivers}
                />
            )
        })) 
    }
}

export default Deliveries