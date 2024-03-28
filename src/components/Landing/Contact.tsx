export default function Contact() {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Contact</h2>
            <p>
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur
              ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
              quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
              Quia fugiat sit in iste officiis commodi quidem hic quas.
            </p>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6 info">
                  <i className="bx bx-map"></i>
                  <h4>Address</h4>
                  <p>
                    A108 Adam Street,
                    <br />
                    New York, NY 535022
                  </p>
                </div>
                <div className="col-lg-6 info">
                  <i className="bx bx-phone"></i>
                  <h4>Call Us</h4>
                  <p>
                    +1 5589 55488 55
                    <br />
                    +1 5589 22548 64
                  </p>
                </div>
                <div className="col-lg-6 info">
                  <i className="bx bx-envelope"></i>
                  <h4>Email Us</h4>
                  <p>
                    contact@example.com
                    <br />
                    info@example.com
                  </p>
                </div>
                <div className="col-lg-6 info">
                  <i className="bx bx-time-five"></i>
                  <h4>Working Hours</h4>
                  <p>
                    Mon - Fri: 9AM to 5PM
                    <br />
                    Sunday: 9AM to 1PM
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <form
                action="forms/contact.php"
                method="post"
                role="form"
                className="php-email-form"
                data-aos="fade-up"
              >
                <div className="form-group">
                  <input
                    placeholder="Your Name"
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    placeholder="Your Email"
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    placeholder="Subject"
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <textarea
                    placeholder="Message"
                    className="form-control"
                    name="message"
                    rows={5}
                    required
                  ></textarea>
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">
                    Your message has been sent. Thank you!
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/*  End Contact Section */}
    </>
  );
}
