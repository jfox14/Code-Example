import React from 'react'
import PropTypes from 'prop-types'
import ContactForm from  './contactForm';
import { Layout as AntLayout, Menu, Icon , Row, Col, Button} from 'antd';
const { Content } = AntLayout;

class Layout extends React.Component {

  render() {
    return (
        <AntLayout>
          <Content>
            <Row>
            <Col lg={12} sm={24} className='pretty-container'>

              <h2 className='pretty-container-title'>Meet Darwin</h2>
              <p className='pretty-container-detail'>Motivational speaker. Feline life coach. Inspirational apex predator. </p>
              <Button type="primary" icon="facebook" className='facebook-button' size="large" href="http://facebook.com" target="_blank">Facebook</Button>
              <Button type="primary" icon="twitter" className='twitter-button' size="large" href="http://twitter.com" target="_blank">Twitter</Button>
            </Col>
            <Col lg={12} sm={24} className='form-container'>
              <ContactForm />
          </Col>
        </Row>
          </Content>
        </AntLayout>
    );
  }
}


export default Layout
