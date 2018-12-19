import React, { Component } from 'react';

class Home extends Component {
    render() {
        return(
            <div>
              <section id="intro" className="intro-section">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <h1 className="main-image"><img src="images/logo.png" /></h1>
                      <p>Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div >
        );
    }
}

export default Home;