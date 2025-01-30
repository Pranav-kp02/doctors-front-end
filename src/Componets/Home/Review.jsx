import React from "react";

function Review() {
  return (
    <>
      <section className="py-5 mt-3">
        <div className="container">
          <div className="row ">
            <div className="col-12 py-3 dept-reltive">
              <div className="bg-holder bg-size appoiment-bg-img"></div>
              <h1 className="text-center dept-header">REVIEW</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section-bg">
        <div className="container main">
          <div className="bg-holder bg-size appoiment-bg"></div>
          <div className="row post-rel">
            <div className="col-lg-6 z-index-2 mb-5">
              <img
                className="w-100"
                src="	https://technext.github.io/live-doc/v1.0.0/assets/img/gallery/appointment.png"
                alt="..."
              />
            </div>
            <div className="col-lg-6 z-index-2">
              <form className="row g-3">
                <div className="col-md-6">
                  <label className="visually-hidden">Name</label>
                  <input
                    className="form-control form-livedoc-control"
                    id="inputName"
                    type="text"
                    placeholder="Name"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label visually-hidden">Email</label>
                  <input
                    className="form-control form-livedoc-control"
                    id="inputEmail"
                    type="email"
                    placeholder="Email"
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label visually-hidden">Message</label>
                  <textarea
                    className="form-control form-livedoc-messages"
                    id="validationTextarea"
                    placeholder="Message"
                    required="required"
                  ></textarea>
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button
                      className="btn btn-primary rounded-pill"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Review;
