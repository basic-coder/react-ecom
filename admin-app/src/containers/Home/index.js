import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Layout from '../../components/Layout'
import './style.css'

const Home = (props) => {

    return (
        <>
           <Layout>
               <Container fluid>
                   <Row>
                       <Col md={2} className="sidebar">Sidebar</Col>
                       <Col md={2} style={{marginLeft: 'auto'}}>Container</Col>
                   </Row>
               </Container>
            {/*<Container className="text-center">
                <h1 className="p-5 mt-2"> Welcome to Admin Dashboard</h1>
            </Container>*/}
           </Layout>
        </>
    )
}

export default Home
