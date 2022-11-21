import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Profile extends Component {
  state = {
    profileError: false,
    profile: '',
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const apiUrl = 'https://apis.ccbp.in/profile'
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profile: updatedProfileData, profileError: false})
    } else {
      this.setState({profileError: true})
    }
  }

  onClickRetry = () => this.getProfileDetails()

  render() {
    const {profile, profileError} = this.state
    return profileError ? (
      <div className="error-view">
        <button
          type="button"
          className="retry-button"
          onClick={this.onClickRetry()}
        >
          Retry
        </button>
      </div>
    ) : (
      <div className="profile-container">
        <img
          src={profile.profileImageUrl}
          alt="profile"
          className="profile-img"
        />
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-bio">{profile.shortBio}</p>
      </div>
    )
  }
}

export default Profile
