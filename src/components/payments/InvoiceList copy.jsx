// src/components/payments/InvoiceList.jsx
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Button from '../common/Button'

const InvoiceList = ({ invoices }) => {
    if (invoices.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">Aucune facture disponible</p>
            </div>
        )
    }

    return (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Numéro
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Montant
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Statut
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4">
                            <span className="sr-only">Télécharger</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {invoice.number}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {format(new Date(invoice.date), 'PP', { locale: fr })}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {invoice.amount} €
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${invoice.status === 'paid'
                                            ? 'bg-success-100 text-success-800'
                                            : 'bg-danger-100 text-danger-800'
                                        }`}
                                >
                                    {invoice.status === 'paid' ? 'Payé' : 'En attente'}
                                </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(invoice.downloadUrl, '_blank')}
                                >
                                    Télécharger
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

InvoiceList.propTypes = {
    invoices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            status: PropTypes.oneOf(['paid', 'pending']).isRequired,
            downloadUrl: PropTypes.string.isRequired
        })
    ).isRequired
}

export default InvoiceList