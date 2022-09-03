import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBBtn, MDBIcon } from "mdbreact";

const Main = () => {
  return (
    <div className="">
      <div className=" Intro">
        <MDBContainer>
          <MDBRow className="intro1 ">
            <MDBCol md="5" className="intro-text">
              <h1 className=" text-left font-weight-bold">
                Thinking About How to Aquire That Funds Immidiately to Boost
                Your Finances?
              </h1>
              <p className="text-lg-left grey-text font-weight-bolder ">
                Financial Stress Ends Here
                <a href="/signup" className="green-text font-weight-bold">
                  <MDBIcon fas icon="chart-line" className="pr-2 ml-2 " />
                  Get Started
                </a>
              </p>

              <a href="/" className="d-inline ">
                <img alt="appstore" src="/appstore.svg" width="150"></img>
              </a>
              <a href="/" className="d-inline ">
                <img alt="playstore" src="/playstore.png" width="150"></img>
              </a>
            </MDBCol>
            <MDBCol md="7" className="text-right">
              <img alt="sad" src="/sad.jpg" width="" height=""></img>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>

      <div className="head1">
        <MDBContainer className="">
          <section className="text-center my-5">
            <h2 className="h1-responsive font-weight-bold  my-5">
              WHY IS IT SO GREAT?
              {/* <MDBProgress className="my-2 text-center" material value={25} color="success" /> */}
            </h2>

            <h2 className="text-center">
              Join Thousands Of People Awaiting Their Payments in Less Than
              2weeks
            </h2>

            <MDBRow>
              <MDBCol md="3">
                <MDBIcon icon="home" size="3x" className="red-text" />
                <h5 className="font-weight-bold my-4">Mortgage Plan</h5>
                <p className="grey-text mb-md-0 mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores aperiam minima assumenda deleniti hic.
                </p>
              </MDBCol>
              <MDBCol md="3">
                <MDBIcon icon="car" size="3x" className="cyan-text" />
                <h5 className="font-weight-bold my-4">Vehicle Loan</h5>
                <p className="grey-text mb-md-0 mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores aperiam minima assumenda deleniti hic.
                </p>
              </MDBCol>
              <MDBCol md="3">
                <MDBIcon
                  icon="user-graduate"
                  size="3x"
                  className="orange-text"
                />
                <h5 className="font-weight-bold my-4">Student Loan</h5>
                <p className="grey-text mb-md-0 mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores aperiam minima assumenda deleniti hic.
                </p>
              </MDBCol>
              <MDBCol md="3">
                <MDBIcon
                  icon="money-check-alt"
                  size="3x"
                  className="green-text"
                />
                <h5 className="font-weight-bold my-4">Commercial Loan</h5>
                <p className="grey-text mb-md-0 mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores aperiam minima assumenda deleniti hic.
                </p>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBContainer>
      </div>

      <div className="section2">
        <MDBContainer className="section2-content">
          <MDBRow className="text-center">
            <MDBCol md="7" className="">
              <img
                alt="appj"
                src="/appj.png"
                width=""
                height=""
                className="img-fluid"
              ></img>
            </MDBCol>
            <MDBCol md="5" className="text-center">
              <h1 className=" text-center font-weight-bold">HOW IT WORKS </h1>
              <p className="text-center font-weight-bolder">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit maiores aperiam minima assumenda deleniti
                hic.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit maiores aperiam minima assumenda deleniti
                hic.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit maiores aperiam minima assumenda deleniti
                hic.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit maiores aperiam minima assumenda deleniti
                hic.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit maiores aperiam minima assumenda deleniti
                hic.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit maiores aperiam minima assumenda deleniti hic.
              </p>
              <MDBBtn color="light-green" rounded className="butt">
                Get Started
              </MDBBtn>
            </MDBCol>
          </MDBRow>

          <h1 className=" text-center  font-weight-bold">
            SIMPLE QUICK RELIABLE
            {/* <MDBProgress className="my-2 d-flex justify-content-center " material value={25} color="success" /> */}
          </h1>

          <MDBRow className="section3">
            <MDBCol md="4">
              <MDBRow className="mb-3">
                <MDBCol size="2">
                  <MDBIcon
                    icon="flag-checkered"
                    size="2x"
                    className="deep-purple-text"
                  />
                </MDBCol>
                <MDBCol size="10">
                  <h5 className="font-weight-bold mb-3">International</h5>
                  <p className="grey-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Reprehenderit maiores nam, aperiam minima assumenda deleniti
                    hic.
                  </p>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol size="2">
                  <MDBIcon
                    icon="flask"
                    size="2x"
                    className="deep-purple-text"
                  />
                </MDBCol>
                <MDBCol size="10">
                  <h5 className="font-weight-bold mb-3">Experimental</h5>
                  <p className="grey-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Reprehenderit maiores nam, aperiam minima assumenda deleniti
                    hic.
                  </p>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol size="2">
                  <MDBIcon
                    icon="glass-martini"
                    size="2x"
                    className="deep-purple-text"
                  />
                </MDBCol>
                <MDBCol size="10">
                  <h5 className="font-weight-bold mb-3">Relaxing</h5>
                  <p className="grey-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Reprehenderit maiores nam, aperiam minima assumenda deleniti
                    hic.
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol md="4" className="text-name">
              <img alt="loan" className="img-fluid" src="loan4.jpg" />
            </MDBCol>
            <MDBCol md="4">
              <MDBRow className="mb-3">
                <MDBCol size="2">
                  <MDBIcon
                    icon="heart"
                    size="2x"
                    className="deep-purple-text"
                  />
                </MDBCol>
                <MDBCol size="10">
                  <h5 className="font-weight-bold mb-3">Beloved</h5>
                  <p className="grey-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Reprehenderit maiores nam, aperiam minima assumenda deleniti
                    hic.
                  </p>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol size="2">
                  <MDBIcon icon="bolt" size="2x" className="deep-purple-text" />
                </MDBCol>
                <MDBCol size="10">
                  <h5 className="font-weight-bold mb-3">Rapid</h5>
                  <p className="grey-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Reprehenderit maiores nam, aperiam minima assumenda deleniti
                    hic.
                  </p>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol size="2">
                  <MDBIcon
                    icon="magic"
                    size="2x"
                    className="deep-purple-text"
                  />
                </MDBCol>
                <MDBCol size="10">
                  <h5 className="font-weight-bold mb-3">Magical</h5>
                  <p className="grey-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Reprehenderit maiores nam, aperiam minima assumenda deleniti
                    hic.
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>

      <div className="section4-main">
        <h2 className="text-center font-weight-bold head4">
          WHY CHOOSE US?
          {/* <MDBProgress className="my-2 text-center" material value={25} color="success" /> */}
        </h2>

        <MDBContainer className="section4">
          <MDBRow className="text-center">
            <MDBCol md="6">
              <h2 className="font-weight-bold">Accessible</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit maiores nam, aperiam minima assumenda deleniti
                hic.
              </p>
              <a href="/signup" className="green-text">
                <h5 className="font-weight-bolder mt-2 mb-3">
                  <MDBIcon fas icon="chart-line" className="pr-2" />
                  Take a step
                </h5>
              </a>
            </MDBCol>
            <MDBCol md="6">
              <img
                alt="access"
                src="/access.jpg"
                width="400"
                height="300"
                className="img-fluid"
              ></img>
            </MDBCol>

            <MDBCol md="6">
              <img
                alt="secure"
                src="/secure.jpg"
                width="400"
                height="350"
                className="img-fluid"
              ></img>
            </MDBCol>

            <MDBCol md="6">
              <h2 className="font-weight-bold">Secured</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit maiores nam, aperiam minima assumenda deleniti
                hic.
              </p>
              <a href="/signup" className="green-text">
                <h5 className="font-weight-bolder mt-2 mb-3">
                  <MDBIcon fas icon="chart-line" className="pr-2" />
                  Take a step
                </h5>
              </a>
            </MDBCol>

            <MDBRow className="column3">
              <MDBCol md="6" className="">
                <h2 className="font-weight-bold">Reliable</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reprehenderit maiores nam, aperiam minima assumenda deleniti
                  hic.
                </p>
                <a href="/signup" className="green-text">
                  <h5 className="font-weight-bolder mt-1 mb-0">
                    <MDBIcon fas icon="chart-line" className="pr-2" />
                    Take a step
                  </h5>
                </a>
              </MDBCol>
              <MDBCol md="6">
                <img
                  alt="happy"
                  src="/happy.jpg"
                  width="400"
                  height="350"
                  className="img-fluid"
                ></img>
              </MDBCol>
            </MDBRow>
          </MDBRow>
        </MDBContainer>
      </div>

      <div className="container-fluid section5">
        <MDBRow>
          <MDBCol md="5" className="imgSection text-center">
            <MDBIcon icon="shield-alt" className="light-green-text shield" />
          </MDBCol>
          <MDBCol md="7" className="text-center text-section">
            <h2 className="font-weight-bold light-green-text">
              Security and Regulation
            </h2>
            <p className="text-left font-weight-bolder">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reprehenderit maiores aperiam minima assumenda deleniti hic.Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit
              maiores aperiam minima assumenda deleniti hic.
            </p>
          </MDBCol>
        </MDBRow>

        <MDBContainer>
          <MDBRow className="Guide">
            <MDBCol md="6" className="Guide-text">
              <h2 className="font-weight-bold light-green-text">
                MEET AN EXPERT
              </h2>
              <p className="white-text font-weight-bolder">
                We match you with a financial expert who has experience with
                your situation. Chat with them about your goals, needs, fears,
                and everything in between. We also make it easy for you to
                connect your bank accounts to build a complete picture.
              </p>
              <blockquote className="grey-text quote">
                <i>
                  <b className="white-text font-weight-bold">“</b> Javolin gives
                  me a sense of security and support I didn't think was
                  possible. Having a personal expert that knows all my numbers
                  and is always available has become invaluable to me.
                  <b className="white-text font-weight-bold">“</b>
                </i>
              </blockquote>
              <hr className="quote-line" />
              <p className="white-text">Michael</p>
            </MDBCol>
            <MDBCol md="6" className="Guide-img">
              <img
                alt="guide"
                src="/guide.jpg"
                width="600"
                height="900"
                className="img-fluid"
              ></img>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>

      <MDBContainer className="testimony">
        <section className="test-section text-center my-5">
          <h2 className="h1-responsive font-weight-bold my-5">TESTIMONIAL</h2>

          <MDBRow className="text-center">
            <MDBCol md="4" className="mb-md-0 mb-5">
              <img
                alt="smile"
                src="smile.jpg"
                className="rounded-circle z-depth-1 img-fluid"
              />
              <h4 className="font-weight-bold dark-grey-text mt-4">
                Anna Deynah
              </h4>
              <h6 className="font-weight-bold green-text my-3">
                Product Manager
              </h6>
              <p className="font-weight-normal dark-grey-text">
                <MDBIcon className="fa fa-quote-left pr-2" />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                eos id officiis hic tenetur quae quaerat ad velit ab hic
                tenetur.
              </p>
              <div className="green-text">
                <MDBIcon icon="star" />
                <MDBIcon icon="star" />
                <MDBIcon icon="star" />
                <MDBIcon icon="star" />
                <MDBIcon far icon="star-half" />
              </div>
            </MDBCol>

            <MDBCol md="4" className="mb-md-0 mb-5">
              <img
                src="/is.jpg"
                alt="is"
                className="rounded-circle z-depth-1 img-fluid"
              />
              <h4 className="font-weight-bold dark-grey-text mt-4">John Doe</h4>
              <h6 className="font-weight-bold green-text my-3">Student</h6>
              <p className="font-weight-normal dark-grey-text">
                <MDBIcon className="fa fa-quote-left pr-2" />
                Ut enim ad minima veniam, quis nostrum exercitationem ullam
                corporis suscipit laboriosam, nisi ut aliquid commodi.
              </p>
              <div className="green-text">
                <MDBIcon icon="star" />
                <MDBIcon icon="star" />
                <MDBIcon icon="star" />
                <MDBIcon icon="star" />
                <MDBIcon icon="star" />
              </div>
            </MDBCol>
            <MDBCol md="4">
              <img
                src="down.jpg"
                alt="down"
                className="rounded-circle z-depth-1 img-fluid"
              />
              <h4 className="font-weight-bold dark-grey-text mt-4">
                Maria Kate
              </h4>
              <h6 className="font-weight-bold green-text my-3">
                Real Estate Developer
              </h6>
              <p className="font-weight-normal dark-grey-text">
                <MDBIcon className="fa fa-quote-left pr-2" />
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti.
              </p>
              <div className="green-text">
                <MDBIcon icon="star" />
                <MDBIcon icon="star" />
                <MDBIcon icon="star" />
                <MDBIcon icon="star" />
                <MDBIcon far icon="star" />
              </div>
              {/* </MDBTestimonial> */}
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className="final-section">
        <MDBContainer className="text-center final-content">
          <img
            alt="javolin"
            src="/javolin_logo.png"
            className="text-center img-fluid"
          ></img>
          <h1 className="text-center font-weight-bold">
            Our mission is to help every person build a healthy relationship
            with their money.
          </h1>
          <MDBBtn color="light-green" className="butt">
            Get A Loan Now
          </MDBBtn>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Main;
