// src/components/educational/ResourceTabs.jsx
import { useState } from 'react'
import PropTypes from 'prop-types'
import Tab from '../common/Tab'
import ResourceGrid from './ResourceGrid'

const ResourceTabs = ({ resourcesBySubject = {} }) => {
    const [activeTab, setActiveTab] = useState(Object.keys(resourcesBySubject)[0] || '')

    const tabs = Object.entries(resourcesBySubject).map(([subject, resources]) => ({
        id: subject,
        label: subject,
        count: resources.length
    }))

    return (
        <div className="space-y-6">
            <Tab tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            <ResourceGrid resources={resourcesBySubject[activeTab] || []} />
        </div>
    )
}

ResourceTabs.propTypes = {
    resourcesBySubject: PropTypes.objectOf(PropTypes.array)
}

export default ResourceTabs