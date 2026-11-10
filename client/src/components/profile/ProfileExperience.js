import React from 'react'
import PropTypes from 'prop-types'

const ProfileExperience = ({ experience: { company, title, from, to, location, current, description } }) =>
  <div>
    <h3 class="text-dark">{company}</h3>
    <p>
      {new Date(from).toLocaleDateString()} - {' '}
      {to === null ? 'Now' : new Date(to).toLocaleDateString()}
    </p>
    <p><strong>Position: </strong> {title}</p>
    {location && (<p><strong>Location: </strong> {location}</p>)}
    {description && (<p><strong>Description: </strong> {description}</p>)}
  </div>



ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
}

export default ProfileExperience
