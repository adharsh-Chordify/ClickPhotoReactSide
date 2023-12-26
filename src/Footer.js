import React from 'react';
import './footer.css'

function Footer() {
  return (
    <div>
      <footer className="footer-section mt-5">
        <div className="container">
          <div className="footer-cta pt-5 pb-5">
            <div className="row">
              {/* <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="cta-text">
                    <h4>Find us</h4>
                    <span>1xxxx</span>
                  </div>
                </div>
              </div> */}
              <div className="col-xl-6 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-phone"></i>
                  <div className="cta-text">
                    <h4>Call us</h4>
                    <span> +91 853296547</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="far fa-envelope-open"></i>
                  <div className="cta-text">
                    <h4>Mail us</h4>
                    <span>admin@clickpicture.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <a href="">
                      <img
                        src="https://i.postimg.cc/Jhf4M34p/christmas-2012-new-2856-removebg-preview.png"
                        className="img-fluid"
                        alt="logo"
                        width={180}
                        height={155}
                      />
                    </a>
                  </div>
                  <div className="footer-text">
                    <p>
                    Passionate about capturing life's moments, our photo application celebrates the art of visual storytelling. With a vision to empower creativity, we provide a canvas where memories are painted with pixels, fostering a community where every click is a unique narrative. From candid snapshots to artistic compositions, our platform is where imagination meets innovation, inspiring individuals to frame the world through their lens. Join us in this vibrant journey, where each photo shared is a brushstroke in the masterpiece of human experiences
                    </p>
                  </div>
                  <div className="footer-social-icon">
                    <span>Follow us</span>
                    <a href="#">
                      <i className="fab fa-facebook-f facebook-bg"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter twitter-bg"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-google-plus-g google-bg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
               
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Subscribe</h3>
                  </div>
                  <div className="footer-text mb-25">
                    <p>
                      Don’t miss to subscribe to our new feeds, kindly fill
                      the form below.
                    </p>
                  </div>
                  <div className="subscribe-form">
                    <form action="#">
                      <input type="text" placeholder="Email Address" /><br></br>
                    <button className='btn btn-success' style={{border:"none"}}>Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 text-center text-lg-left">
                <div className="copyright-text">
                  <p className='text-center'>
                    Copyright &copy; 2023, All Right Reserved{' '}
                    <a href=""></a>
                  </p>
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;