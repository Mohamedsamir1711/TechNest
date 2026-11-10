import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteExperience } from '../../actions/profile'

const Experience = ({ experience, deleteExperience }) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                {exp.from ? new Date(exp.from).toLocaleDateString() : 'N/A'} - {' '}
                {!exp.to || exp.current ? 'Now' : new Date(exp.to).toLocaleDateString()}
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteExperience(exp._id)}>Delete</button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h3 className="my-2">Experience Credentials</h3>
            {experience.length > 0 ? (
                <Fragment>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-dark">Company</th>
                                <th className="text-dark">Title</th>
                                <th className="text-dark">Years</th>
                            </tr>
                        </thead>
                        <tbody>{experiences}</tbody>
                    </table>
                </Fragment>
            ) : (
                <Fragment>
                    <p>No experience credentials</p>
                </Fragment>
            )}
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience)
