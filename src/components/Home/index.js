import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="responsive-container">
      <h1 className="home-section-title">Find The Job That Fits Your Life</h1>
      <p className="home-section-description">
        Millions of people are searching for jobs, salary information,company
        reviews. Find the job that fits your abilities and potential
      </p>
      <Link to="jobs">
        <button className="home-section-button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
