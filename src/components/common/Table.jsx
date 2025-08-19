// src/components/common/Table.jsx
import PropTypes from 'prop-types'

const Table = ({ columns = [], data = [], isLoading = false, className = '' }) => {
    if (isLoading) {
        return (
            <div className={`flex justify-center items-center py-12 ${className}`}>
                <Loader />
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className={`py-12 ${className}`}>
                <EmptyState
                    title="Aucune donnée disponible"
                    description="Aucun enregistrement n'a été trouvé"
                />
            </div>
        )
    }

    return (
        <div className={`overflow-x-auto ${className}`}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.Header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {column.Cell ? column.Cell({ row: { original: row } }) : row[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            Header: PropTypes.string.isRequired,
            accessor: PropTypes.string,
            Cell: PropTypes.func
        })
    ),
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    className: PropTypes.string
}

export default Table