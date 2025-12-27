const Contact = () => {
  return (


    <>

      <div className="container-fluid p-0">
      <div className="gmap_canvas">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.459175710123!2d80.4445077736819!3d16.299465933236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a75000da0bc4f%3A0x222f6fdae249ee32!2si%20DESIGN%20WEB%20TECHNOLOGIES!5e0!3m2!1sen!2sin!4v1735888154348!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>
    </div>
    
    <div className="container-fluid py-5 contact-promo-bg">
      <div className="container">
        <div className="row g-4">

          {/* Card 1 */}
          <div className="col-lg-3 col-md-6">
            <div className="contact-card">
              <span className="contact-bg-icon fa-solid fa-chart-line"></span>
              <i className="fa-solid fa-chart-line service-icon text-danger"></i>
              <h5 className="mt-3">Email</h5>
              <span>idwt365@gmail.com</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-lg-3 col-md-6">
            <div className="contact-card">
              <span className="contact-bg-icon fa-solid fa-magnifying-glass-chart"></span>
              <i className="fa-solid fa-magnifying-glass-chart service-icon text-primary"></i>
              <h5 className="mt-3">Contact</h5>
              <span>+91-9652051213</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-lg-3 col-md-6">
            <div className="contact-card">
              <span className="contact-bg-icon fa-solid fa-bullseye"></span>
              <i className="fa-solid fa-bullseye service-icon text-warning"></i>
              <h5 className="mt-3">Location</h5>
              <span>REG: Gujjanagundla, Guntur
Working: Naaz Center, Guntur</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-lg-3 col-md-6">
            <div className="contact-card">
              <span className="contact-bg-icon fa-solid fa-lock"></span>
              <i className="fa-solid fa-lock service-icon text-success"></i>
              <h5 className="mt-3">Timings</h5>
              <span>Mon-Sat 10 AM - 6 PM
Mail & Call Support - 8hrs
(Within Working Hours)</span>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  

    

    
  );
};

export default Contact;
