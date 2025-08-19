// src/components/common/ProgressCircle.jsx
function ProgressCircle({
    value,
    size = 100,
    strokeWidth = 8,
    circleColor = 'text-gray-200',
    progressColor = 'text-primary-600',
    children,
    className = ''
}) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDashoffset = circumference - (value / 100) * circumference

    return (
        <div
            className={`relative inline-flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
        >
            <svg
                className="absolute top-0 left-0 transform -rotate-90"
                width={size}
                height={size}
            >
                <circle
                    className={circleColor}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className={progressColor}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <div className="relative text-center">
                {children}
            </div>
        </div>
    )
}

export default ProgressCircle