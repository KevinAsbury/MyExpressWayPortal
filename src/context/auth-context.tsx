import React from 'react'
import roles from '../enum-roles'

const authContext = React.createContext({
    role: roles.PUBLIC,
    login: () => {}
})

export default authContext