import {  Col, Row } from 'react-bootstrap';
import '../styles/Footer.css';
import { Facebook, Instagram, Twitter } from 'react-bootstrap-icons';

export default function Footer() {
  return (
    <div className='footer'>
      <Row className='d-flex justify-content-between align-items-start text-center'>
        <Col className='justify-content-center align-items-center' md={3}>
          <img className='footer-logo' src="https://c2zyebdn.cloudimg.io/s/cdn/x/https://divin2sy6ce0b.cloudfront.net/images/carelulu_logo_square_white.png"></img>
        </Col>
        <Col>
          <div className='footer-details'>
            <h5>FOR PARENTS</h5>
            <a>Parent Resources</a> <br />
            <a>How It Works</a> <br />
            <a>Testimonials</a> <br />
            <a>Terms of Use</a> <br />
            <a>Privacy Policy</a>
          </div>
        </Col>
        <Col>
          <div className='footer-details'>
            <h5>FOR PROVIDERS</h5>
            <a>Provider Resources</a> <br />
            <a>How It Works</a> <br />
            <a>Testimonials</a> <br />
            <a>Terms and Conditions</a> <br />
            <a>List Your Program</a>
          </div>
        </Col>

        <Col>
          <div className='footer-details'>
            <h5>MORE</h5>
            <a>About Us</a> <br />
            <a>Press</a> <br />
            <a>Jobs</a> <br />
            <a>Contact Us</a> <br />

          </div>
        </Col>
        <Col className='p-4' md={3}>
          <Row >
            <Col lg={2}>
              <a href='https://www.facebook.com/carelulu'> <Facebook size={30} color='#fff' /></a>
            </Col>
            <Col lg={2}>
              <a href='https://twitter.com/mycarelulu'>  <Twitter size={30} color='#fff' /></a>

            </Col>
            <Col lg={2}>
              <a href="https://www.instagram.com/mycarelulu/">
                <Instagram size={30} color='#fff' />
              </a>
            </Col>
          </Row>
          <Row>
            <Col lg={6} className='text-center justify-content-center align-items-center '>
              <a href='https://carelulu.zendesk.com/hc/en-us'>
              <button className='btn-help-center'>Help Center</button>
              </a>
              </Col>
          </Row>
        </Col>

      </Row>
    </div>
  )
}
