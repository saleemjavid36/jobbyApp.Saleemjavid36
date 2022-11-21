import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {eachJobItemDetails} = props
  const {
    jobDescription,
    companyLogo,
    location,
    packages,
    rating,
    title,
    eType,
    jobId,
  } = eachJobItemDetails
  return (
    <Link to={`/jobs/${jobId}`} className="Link1">
      <li className="job-item">
        <div className="logo-title-location-container">
          <div className="logo-title-container">
            <img
              src={companyLogo}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="title-heading">{title}</h1>
              <div className="rating-container">
                <BsStarFill className="rating-icon" />
                <p className="rating-heading">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container">
            <div className="location-employee-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="location-heading">{location}</p>
              </div>
              <div className="employee-type-container">
                <BsFillBriefcaseFill className="brief-case-icon" />
                <p className="employee-type-heading">{eType}</p>
              </div>
            </div>
            <p className="package-heading">{packages}</p>
          </div>
        </div>
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="description-text">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
