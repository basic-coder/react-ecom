import React from 'react'
import { Container } from 'react-bootstrap'
import Layout from '../../components/Layout'

const Home = (props) => {
    return (
        <>
           <Layout>
            <Container className="text-center">
                <h1 className="p-5 mt-2"> Welcome to Admin Dashboard</h1>
            </Container>
           </Layout>
        </>
    )
}

export default Home
