import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'

interface Props {
    title: string
}

export const Transaction = () => {

    return (
        <h1>Transaction</h1>
    )
    /*
        This section will have the text and visuals required to explain the transfer process
        In addition to the aforementioned, there will also be a table that will display
        the funds coming in and out of UNICEF; this will pull information from the graphql API
        
    */
}