// src/components/dashboard/WelcomeBanner.jsx
import PropTypes from 'prop-types'
import Button from '../common/Button'

const WelcomeBanner = ({ title, subtitle, action }) => {
    return (
        <div className="bg-primary-700 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{title}</h2>
                        {subtitle && (
                            <p className="mt-2 text-primary-100 max-w-lg">{subtitle}</p>
                        )}
                    </div>
                    {action && (
                        <div className="flex-shrink-0">
                            <Button
                                onClick={action.onClick}
                                variant="white"
                                size="lg"
                            >
                                {action.text}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

WelcomeBanner.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    action: PropTypes.shape({
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    })
}

export default WelcomeBanner