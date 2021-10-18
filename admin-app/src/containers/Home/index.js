import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Layout from '../../components/Layout'
import './style.css'

const Home = (props) => {

    return (
        <>
           <Layout sidebar>
               
            {/*<Container className="text-center">
                <h1 className="p-5 mt-2"> Welcome to Admin Dashboard</h1>
            </Container>*/}
           </Layout>
        </>
    )
}

export default Home
