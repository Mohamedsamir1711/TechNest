import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteEducation } from '../../actions/profile'

const Education = ({ education, deleteEducation }) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                {edu.from ? new Date(edu.from).toLocaleDateString() : 'N/A'} - {' '}
                {!edu.to || edu.current ? 'Now' : new Date(edu.to).toLocaleDateString()}
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteEducation(edu._id)}>Delete</button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h3 className="my-2">Education Credentials</h3>
            {education.length > 0 ? (
                <Fragment>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='hide-sm'>School</th>
                                <th className='hide-sm'>Degree</th>
                                <th className='hide-sm'>Years</th>
                            </tr>
                        </thead>
                        <tbody>{educations}</tbody>
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

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)