// src/components/educational/SubjectFilter.jsx
import PropTypes from 'prop-types'
import Select from '../common/Select'

const SUBJECTS = [
    { value: 'all', label: 'Toutes les matières' },
    { value: 'math', label: 'Mathématiques' },
    { value: 'french', label: 'Français' },
    { value: 'science', label: 'Sciences' },
    { value: 'history', label: 'Histoire' },
    { value: 'geography', label: 'Géographie' }
]

const SubjectFilter = ({ value, onChange, className = '' }) => {
    return (
        <Select
            options={SUBJECTS}
            value={value}
            onChange={onChange}
            label="Filtrer par matière"
            className={className}
        />
    )
}

SubjectFilter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default SubjectFilter