import React from 'react'
import PropTypes from 'prop-types'

const ProfileEducation = ({ education: { school, degree, from, to, fieldofstudy, current, description } }) =>
  <div>
    <h3 class="text-dark">{school}</h3>
    <p>
      {new Date(from).toLocaleDateString()} - {' '}
      {to === null ? 'Now' : new Date(to).toLocaleDateString()}
    </p>
    <p><strong>Degree: </strong> {degree}</p>
    {fieldofstudy && (<p><strong>Field Of Study: </strong> {fieldofstudy}</p>)}
    {description && (<p><strong>Description: </strong> {description}</p>)}
  </div>



ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
}

export default ProfileEducation