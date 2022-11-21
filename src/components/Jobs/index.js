import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'
import Header from '../Header'
import Profile from '../Profile'
import Filter from '../Filter'
import JobCard from '../JobCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class Jobs extends Component {
  state = {
    jobsList: '',
    employeList: [],
    salaryRangeList: [],
    employeType: '',
    salaryRangeType: '',
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {employeType, salaryRangeType, searchInput} = this.state
    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeType}&minimum_package=${salaryRangeType}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updattedData = data.jobs.map(eachJob => ({
        jobDescription: eachJob.job_description,
        companyLogo: eachJob.company_logo_url,
        location: eachJob.location,
        packages: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
        eType: eachJob.employment_type,
        jobId: eachJob.id,
      }))
      this.setState({
        jobsList: updattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onCheckEmployeType = checkBoxId => {
    const {employeList} = this.state
    if (employeList.includes(checkBoxId)) {
      const generalList = employeList.filter(each => each !== checkBoxId)
      const generalListJoin = generalList.join(',')
      this.setState(
        {employeType: generalListJoin, employeList: generalList},
        this.getJobsList,
      )
    } else {
      employeList.push(checkBoxId)
      const joinIds = employeList.join(',')
      this.setState({employeType: joinIds, employeList})
    }
  }

  onClickSalaryRangee = salaryId => {
    const {salaryRangeList} = this.state
    if (salaryRangeList.includes(salaryId)) {
      const removingSalaryId = salaryRangeList.filter(each => each !== salaryId)
      const joingRemaingIds = removingSalaryId.join(',')
      this.setState({
        salaryRangeType: joingRemaingIds,
        salaryRangeList: removingSalaryId,
      })
    } else {
      salaryRangeList.push(salaryId)
      const joingIds = salaryRangeList.join(',')
      this.setState(
        {salaryRangeType: joingIds, salaryRangeList},
        this.getJobsList,
      )
    }
  }

  onClickRetryJobs = () => this.getJobsList()

  renderFailureView = () => (
    <div className="zero-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="nojobs-img"
      />
      <h1 className="nojobs-heading">Oops!Something Went Wrong</h1>
      <p className="nojobs-description">
        We cannot seem to find the page <br />
        your are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetryJobs()}
      >
        Retry
      </button>
    </div>
  )

  zeroList = () => (
    <div className="zero-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="nojobs-img"
      />
      <h1 className="nojobs-heading">No Jobs Found</h1>
      <p className="nojobs-description">
        we could find any jobs.Try <br />
        other filters.
      </p>
    </div>
  )

  onSuccess = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.zeroList()
    }
    return jobsList.map(eachJobItem => {
      const {jobId} = eachJobItem
      return (
        <ul>
          <JobCard eachJobItemDetails={eachJobItem} key={jobId} />
        </ul>
      )
    })
  }

  loadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="blue" height={50} width={50} />
    </div>
  )

  renderJobsCardView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onSuccess()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value})

  searchButton = () => this.getJobsList()

  render() {
    const {
      employeType,
      salaryRangeType,
      searchInput,
      salaryRangeList,
      employeList,
    } = this.state
    console.log(salaryRangeList)
    console.log(employeList)
    return (
      <>
        <Header />
        <div className="jobs-section-container">
          <div className="all-jobs-content">
            <div className="search-input-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              <div className="search-icon-container">
                <BsSearch
                  size="25"
                  className="search-icon"
                  onClick={this.searchButton}
                />
              </div>
            </div>
            <Profile />
            <hr className="line" />
            <Filter
              employment={employmentTypesList}
              salaryRangesDetails={salaryRangesList}
              setActiveSalaryId={this.onClickSalaryRangee}
              setCheckBoxId={this.onCheckEmployeType}
              etypeValue={employeType}
              salaryValue={salaryRangeType}
            />
            {this.renderJobsCardView()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
