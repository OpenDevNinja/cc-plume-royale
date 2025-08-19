import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FaStar, FaDownload, FaEye, FaShoppingCart, FaHeart, FaShare,
    FaBookOpen, FaFileDownload, FaPlay, FaLock, FaCheck, FaArrowRight,
    FaCreditCard, FaPaypal, FaApplePay, FaGooglePay, FaShieldAlt,
    FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt,
    FaSpinner, FaCheckCircle, FaExclamationTriangle, FaBox, FaHome, FaChevronRight,
    FaTimes
} from 'react-icons/fa';
import { resourcesData } from '../../data/resources_data';

// Composant Breadcrumbs pour la page de détails
const DetailBreadcrumbs = ({ resource }) => {
    const subject = resourcesData.subjects.find(s => s.id === resource.subject);
    const level = resourcesData.levels.find(l => l.id === resource.level);

    return (
        <nav className="flex items-center text-sm text-gray-600 mb-8">
            <a href="/" className="flex items-center hover:text-purple-600 transition-colors">
                <FaHome className="mr-2" />
                Accueil
            </a>
            <FaChevronRight className="mx-2 text-gray-400" />
            <a href="/resources" className="hover:text-purple-600 transition-colors">
                Ressources
            </a>
            <FaChevronRight className="mx-2 text-gray-400" />
            <span className="text-purple-600 font-medium">{subject?.name}</span>
            <FaChevronRight className="mx-2 text-gray-400" />
            <span className="text-gray-900">{resource.title}</span>
        </nav>
    );
};

// Composant d'aperçu PDF simulé
const PDFPreview = ({ resource }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPages = Math.min(5, Math.floor(resource.pages / 4)); // Aperçu limité

    const previewPages = [
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ];

    return (
        <div className="bg-gray-100 rounded-xl p-6 h-[500px] flex flex-col shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-900 text-lg">Aperçu gratuit</h4>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                        Page {currentPage} sur {maxPages}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg bg-white shadow-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => setCurrentPage(Math.min(maxPages, currentPage + 1))}
                            disabled={currentPage === maxPages}
                            className="p-2 rounded-lg bg-white shadow-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 relative bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                    src={previewPages[currentPage - 1]}
                    alt={`Page ${currentPage}`}
                    className="w-full h-full object-contain"
                />

                {/* Watermark d'aperçu */}
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="bg-white/90 px-6 py-3 rounded-full text-gray-600 font-medium shadow-lg">
                        <FaEye className="inline mr-2" />
                        Aperçu gratuit - {resource.title}
                    </div>
                </div>
            </div>

            {currentPage === maxPages && (
                <div className="mt-6 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg text-center">
                    <div className="flex items-center justify-center">
                        <FaLock className="text-purple-600 mr-3 text-xl" />
                        <p className="text-purple-700 font-medium">
                            <strong>{resource.pages - maxPages * 4}+ pages supplémentaires</strong> disponibles après achat
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

// Composant de paiement
const PaymentModal = ({ resource, isOpen, onClose, onSuccess }) => {
    const [paymentStep, setPaymentStep] = useState('method'); // method, details, processing, success
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'France',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) newErrors.email = 'Email requis';
        if (!formData.firstName) newErrors.firstName = 'Prénom requis';
        if (!formData.lastName) newErrors.lastName = 'Nom requis';

        if (paymentMethod === 'card') {
            if (!formData.cardNumber) newErrors.cardNumber = 'Numéro de carte requis';
            if (!formData.expiryDate) newErrors.expiryDate = 'Date d\'expiration requise';
            if (!formData.cvv) newErrors.cvv = 'CVV requis';
            if (!formData.cardName) newErrors.cardName = 'Nom sur la carte requis';
        }

        if (resource.isPhysical) {
            if (!formData.address) newErrors.address = 'Adresse requise';
            if (!formData.city) newErrors.city = 'Ville requise';
            if (!formData.postalCode) newErrors.postalCode = 'Code postal requis';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = async () => {
        if (!validateForm()) return;

        setIsProcessing(true);
        setPaymentStep('processing');

        // Simulation du paiement
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentStep('success');
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 3000);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-gray-900">
                                {paymentStep === 'success' ? 'Paiement réussi !' : 'Finaliser l\'achat'}
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Progress bar */}
                        {paymentStep !== 'success' && (
                            <div className="mt-4 flex items-center">
                                <div className={`flex items-center ${paymentStep === 'method' ? 'text-purple-600' : 'text-green-600'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${paymentStep === 'method' ? 'border-purple-600 bg-purple-100' : 'border-green-600 bg-green-100'}`}>
                                        {paymentStep !== 'method' ? <FaCheck /> : '1'}
                                    </div>
                                    <span className="ml-2 font-medium">Méthode</span>
                                </div>
                                <div className="flex-1 mx-4 h-1 bg-gray-200 rounded">
                                    <div className={`h-1 rounded transition-all duration-500 ${paymentStep !== 'method' ? 'w-full bg-green-500' : 'w-0 bg-purple-500'}`} />
                                </div>
                                <div className={`flex items-center ${paymentStep === 'details' ? 'text-purple-600' : paymentStep === 'processing' ? 'text-green-600' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${paymentStep === 'processing' ? 'border-green-600 bg-green-100' : paymentStep === 'details' ? 'border-purple-600 bg-purple-100' : 'border-gray-300'}`}>
                                        {paymentStep === 'processing' ? <FaCheck /> : '2'}
                                    </div>
                                    <span className="ml-2 font-medium">Paiement</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6">
                        {/* Étape 1: Choix de la méthode */}
                        {paymentStep === 'method' && (
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-6">
                                    Choisissez votre méthode de paiement
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {[
                                        { id: 'card', name: 'Stripe', icon: <FaCreditCard />, desc: '' },
                                        { id: 'paypal', name: 'PayPal', icon: <FaPaypal />, desc: 'Paiement sécurisé PayPal' },
                                        { id: 'apple', name: 'Apple Pay', icon: <FaApplePay />, desc: 'Paiement avec Touch ID' },
                                        { id: 'google', name: 'Google Pay', icon: <FaGooglePay />, desc: 'Paiement Google sécurisé' }
                                    ].map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setPaymentMethod(method.id)}
                                            className={`p-4 border-2 rounded-xl text-left transition-all ${paymentMethod === method.id
                                                ? 'border-purple-500 bg-purple-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="flex items-center mb-2">
                                                <span className="text-2xl mr-3">{method.icon}</span>
                                                <span className="font-medium">{method.name}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{method.desc}</p>
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setPaymentStep('details')}
                                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
                                >
                                    Continuer
                                </button>
                            </div>
                        )}

                        {/* Étape 2: Détails de paiement */}
                        {paymentStep === 'details' && (
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-6">
                                    Informations de facturation
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="votre@email.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                            placeholder="06 12 34 56 78"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prénom *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Jean"
                                        />
                                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="Dupont"
                                        />
                                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                    </div>
                                </div>

                                {/* Adresse de livraison si produit physique */}
                                {resource.isPhysical && (
                                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <h5 className="font-medium text-blue-900 mb-4 flex items-center">
                                            <FaMapMarkerAlt className="mr-2" />
                                            Adresse de livraison
                                        </h5>

                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Adresse *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                                    placeholder="12 rue de la République"
                                                />
                                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Ville *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.city}
                                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                                        placeholder="Paris"
                                                    />
                                                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Code postal *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.postalCode}
                                                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                                                        placeholder="75001"
                                                    />
                                                    {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Informations de carte si nécessaire */}
                                {paymentMethod === 'card' && (
                                    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                        <h5 className="font-medium text-gray-900 mb-4 flex items-center">
                                            <FaCreditCard className="mr-2" />
                                            Informations de carte
                                        </h5>

                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Numéro de carte *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.cardNumber}
                                                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                                                    placeholder="1234 5678 9012 3456"
                                                />
                                                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Date d'expiration *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.expiryDate}
                                                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                                                        placeholder="MM/AA"
                                                    />
                                                    {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        CVV *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.cvv}
                                                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                                                        placeholder="123"
                                                    />
                                                    {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nom sur la carte *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.cardName}
                                                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                                                    placeholder="Jean Dupont"
                                                />
                                                {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Résumé de commande */}
                                <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                    <h5 className="font-medium text-purple-900 mb-3">Résumé de votre commande</h5>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">{resource.title}</span>
                                        <span className="font-bold text-purple-600">{resource.price}€</span>
                                    </div>
                                    {resource.isPhysical && (
                                        <div className="flex justify-between items-center mt-2 text-sm">
                                            <span className="text-gray-600">Frais de port</span>
                                            <span className="text-gray-600">Gratuit</span>
                                        </div>
                                    )}
                                    <hr className="my-2 border-purple-200" />
                                    <div className="flex justify-between items-center font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-purple-600">{resource.price}€</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setPaymentStep('method')}
                                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Retour
                                    </button>
                                    <button
                                        onClick={handlePayment}
                                        disabled={isProcessing}
                                        className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                                    >
                                        <FaShieldAlt className="mr-2" />
                                        Payer {resource.price}€
                                    </button>
                                </div>

                                <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                                    <FaShieldAlt className="mr-2" />
                                    Paiement sécurisé SSL 256 bits
                                </div>
                            </div>
                        )}

                        {/* Étape 3: Traitement */}
                        {paymentStep === 'processing' && (
                            <div className="text-center py-12">
                                <div className="mb-6">
                                    <FaSpinner className="text-6xl text-purple-600 animate-spin mx-auto" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                    Traitement du paiement...
                                </h4>
                                <p className="text-gray-600">
                                    Veuillez patienter, ne fermez pas cette fenêtre
                                </p>
                            </div>
                        )}

                        {/* Étape 4: Succès */}
                        {paymentStep === 'success' && (
                            <div className="text-center py-12">
                                <div className="mb-6">
                                    <FaCheckCircle className="text-6xl text-green-500 mx-auto" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                    Paiement réussi !
                                </h4>
                                <p className="text-gray-600 mb-6">
                                    {resource.isPhysical
                                        ? 'Votre commande sera expédiée sous 24-48h. Un email de confirmation vous a été envoyé.'
                                        : 'Votre ressource est maintenant disponible au téléchargement.'
                                    }
                                </p>

                                {!resource.isPhysical && (
                                    <button className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center mx-auto">
                                        <FaFileDownload className="mr-2" />
                                        Télécharger maintenant
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// Composant principal de la page de détails
const ResourceDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [resource, setResource] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [relatedResources, setRelatedResources] = useState([]);

    useEffect(() => {
        const foundResource = resourcesData.resources.find(r => r.id === id);
        if (!foundResource) {
            navigate('/resources');
            return;
        }

        setResource(foundResource);

        // Trouver des ressources similaires
        const related = resourcesData.resources
            .filter(r => r.id !== id && (r.subject === foundResource.subject || r.level === foundResource.level))
            .slice(0, 4);
        setRelatedResources(related);
    }, [id, navigate]);

    if (!resource) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <FaSpinner className="animate-spin text-4xl text-purple-600" />
            </div>
        );
    }

    const subject = resourcesData.subjects.find(s => s.id === resource.subject);
    const difficulty = resourcesData.difficulties.find(d => d.id === resource.difficulty);
    const type = resourcesData.types.find(t => t.id === resource.type);
    const level = resourcesData.levels.find(l => l.id === resource.level);

    const handlePurchaseSuccess = () => {
        setShowPayment(false);
        // Ici vous pourriez mettre à jour l'état global, déclencher un téléchargement, etc.
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header avec breadcrumbs */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-8">
                    <DetailBreadcrumbs resource={resource} />
                </div>
            </header>

            {/* Contenu principal */}
            <main className="container mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Section principale */}
                    <div className="flex-1">
                        {/* En-tête de la ressource */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-1/3">
                                    <img
                                        src={resource.image}
                                        alt={resource.title}
                                        className="w-full rounded-xl shadow-md"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                                        <span className={`px-3 py-1 rounded-full text-sm text-white ${subject?.color}`}>
                                            {subject?.icon} {subject?.name}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm ${difficulty?.color}`}>
                                            {difficulty?.name}
                                        </span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                            {level?.name}
                                        </span>
                                        {resource.isPhysical && (
                                            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                                                <FaBox className="inline mr-1" />
                                                Version physique
                                            </span>
                                        )}
                                    </div>

                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {resource.title}
                                    </h1>

                                    <div className="flex items-center gap-4 text-gray-600 mb-4">
                                        <span>Par {resource.author}</span>
                                        <span>•</span>
                                        <span>{resource.publisher}</span>
                                        <span>•</span>
                                        <span>{resource.pages} pages</span>
                                    </div>

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex items-center">
                                            <div className="flex text-yellow-400 mr-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={i < Math.floor(resource.rating) ? '' : 'text-gray-300'} />
                                                ))}
                                            </div>
                                            <span className="text-gray-600">
                                                {resource.rating} ({resource.reviewsCount} avis)
                                            </span>
                                        </div>
                                        <span className="text-gray-500">
                                            <FaDownload className="inline mr-1" />
                                            {resource.downloadCount} téléchargements
                                        </span>
                                    </div>

                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        {resource.description}
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setIsWishlisted(!isWishlisted)}
                                            className={`p-3 rounded-full transition-colors ${isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                                }`}
                                        >
                                            <FaHeart className={isWishlisted ? 'fill-current' : ''} />
                                        </button>

                                        <button className="p-3 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                                            <FaShare />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation des onglets */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                            <div className="flex border-b border-gray-200">
                                {[
                                    { id: 'overview', label: 'Aperçu', icon: <FaEye /> },
                                    { id: 'preview', label: 'Prévisualisation', icon: <FaBookOpen /> },
                                    { id: 'contents', label: 'Sommaire', icon: <FaFileDownload /> },
                                    { id: 'reviews', label: 'Avis', icon: <FaStar /> }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 flex items-center justify-center px-4 py-4 font-medium transition-colors ${activeTab === tab.id
                                            ? 'text-purple-600 border-b-2 border-purple-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        <span className="mr-2">{tab.icon}</span>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Contenu des onglets */}
                            <div className="p-6">
                                {activeTab === 'overview' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                                Description détaillée
                                            </h3>
                                            <p className="text-gray-700 mb-6 leading-relaxed">
                                                {resource.description}
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-3 text-lg">Caractéristiques</h4>
                                                <ul className="space-y-3 text-gray-600">
                                                    <li className="flex items-center">
                                                        <FaBookOpen className="mr-3 text-purple-600" />
                                                        {resource.pages} pages au format PDF haute qualité
                                                    </li>
                                                    <li className="flex items-center">
                                                        <FaCalendarAlt className="mr-3 text-purple-600" />
                                                        Accès pendant {resource.accessDuration} jours après achat
                                                    </li>
                                                    <li className="flex items-center">
                                                        <FaFileDownload className="mr-3 text-purple-600" />
                                                        Téléchargement immédiat après paiement
                                                    </li>
                                                    {resource.isPhysical && (
                                                        <li className="flex items-center">
                                                            <FaBox className="mr-3 text-purple-600" />
                                                            Version physique livrée sous 48h (frais de port inclus)
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-3 text-lg">Fonctionnalités clés</h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {resource.features.map((feature, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                                                        >
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-3 text-lg">Mots-clés</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {resource.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'preview' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <PDFPreview resource={resource} />

                                        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                                            <div className="flex items-center">
                                                <FaLock className="text-blue-600 mr-3 text-xl" />
                                                <div>
                                                    <h4 className="font-medium text-blue-900">
                                                        Aperçu limité
                                                    </h4>
                                                    <p className="text-blue-700">
                                                        Cette prévisualisation ne montre que les premières pages.
                                                        Achetez maintenant pour accéder au contenu complet.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'contents' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                                            Table des matières
                                        </h3>

                                        <div className="space-y-3">
                                            {resource.tableOfContents.map((chapter, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                                >
                                                    <div className="flex items-center">
                                                        <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm mr-3">
                                                            {index + 1}
                                                        </span>
                                                        <span className="font-medium text-gray-900">{chapter}</span>
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        Page {Math.floor((index + 1) * (resource.pages / resource.tableOfContents.length))}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                                            <div className="flex items-center">
                                                <FaLock className="text-purple-600 mr-3" />
                                                <p className="text-purple-700 font-medium">
                                                    Le contenu détaillé de chaque chapitre est disponible après l'achat
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'reviews' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="mb-8">
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                                Avis clients
                                            </h3>

                                            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                                                <div className="text-center bg-white p-6 rounded-xl shadow-sm">
                                                    <div className="text-5xl font-bold text-purple-600 mb-2">{resource.rating}</div>
                                                    <div className="flex text-yellow-400 justify-center mb-3">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar key={i} className={i < Math.floor(resource.rating) ? '' : 'text-gray-300'} />
                                                        ))}
                                                    </div>
                                                    <div className="text-gray-600">{resource.reviewsCount} avis</div>
                                                </div>

                                                <div className="flex-1 w-full">
                                                    {[5, 4, 3, 2, 1].map((stars) => {
                                                        const percentage = stars === 5 ? 75 : stars === 4 ? 20 : stars === 3 ? 3 : stars === 2 ? 1 : 1;
                                                        return (
                                                            <div key={stars} className="flex items-center gap-3 mb-2">
                                                                <span className="text-sm w-6">{stars}</span>
                                                                <FaStar className="text-yellow-400" />
                                                                <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                                                                    <div
                                                                        className="bg-yellow-400 h-2.5 rounded-full"
                                                                        style={{ width: `${percentage}%` }}
                                                                    />
                                                                </div>
                                                                <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {[
                                                {
                                                    name: "Marie L.",
                                                    rating: 5,
                                                    date: "Il y a 2 semaines",
                                                    comment: "Excellente ressource ! Les exercices sont bien conçus et progressifs. Mon fils a beaucoup progressé grâce à ce cahier.",
                                                    helpful: 12
                                                },
                                                {
                                                    name: "Pierre M.",
                                                    rating: 5,
                                                    date: "Il y a 1 mois",
                                                    comment: "Très bien structuré, les explications sont claires. Je recommande vivement pour les enseignants et les parents.",
                                                    helpful: 8
                                                },
                                                {
                                                    name: "Sophie D.",
                                                    rating: 4,
                                                    date: "Il y a 1 mois",
                                                    comment: "Bon contenu pédagogique. Quelques exercices pourraient être plus variés mais dans l'ensemble c'est très bien.",
                                                    helpful: 5
                                                }
                                            ].map((review, index) => (
                                                <div key={index} className="p-6 border border-gray-200 rounded-xl bg-white">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium">
                                                                {review.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">{review.name}</span>
                                                                <div className="flex text-yellow-400 text-sm">
                                                                    {[...Array(review.rating)].map((_, i) => (
                                                                        <FaStar key={i} />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="text-sm text-gray-500">{review.date}</span>
                                                    </div>
                                                    <p className="text-gray-700 mb-4">{review.comment}</p>
                                                    <div className="flex items-center gap-4">
                                                        <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
                                                            <FaCheck className="mr-2" />
                                                            Utile ({review.helpful})
                                                        </button>
                                                        <button className="text-sm text-gray-600 hover:text-gray-900">
                                                            Signaler
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8 text-center">
                                            <button className="px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors">
                                                Voir tous les avis
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Ressources similaires */}
                        {relatedResources.length > 0 && (
                            <div className="mt-12">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ressources similaires</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {relatedResources.map((related) => (
                                        <div key={related.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={related.image}
                                                    alt={related.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">
                                                    <a href={`/resources/${related.id}`} className="hover:text-purple-600 transition-colors">
                                                        {related.title}
                                                    </a>
                                                </h4>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-lg font-bold text-purple-600">{related.price}€</span>
                                                    <a href={`/resources/${related.id}`} className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                                                        Voir détails →
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar d'achat */}
                    <div className="w-full lg:w-96">
                        <div className="sticky top-6 space-y-6">
                            <div className="bg-white rounded-xl shadow-xl p-6">
                                <div className="text-center mb-4">
                                    {resource.originalPrice && (
                                        <div className="flex items-center justify-center gap-3 mb-3">
                                            <span className="text-gray-400 line-through text-xl">
                                                {resource.originalPrice}€
                                            </span>
                                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                                                -{Math.round((1 - resource.price / resource.originalPrice) * 100)}%
                                            </span>
                                        </div>
                                    )}
                                    <div className="text-4xl font-bold text-purple-600 mb-3">
                                        {resource.price}€
                                    </div>
                                    <p className="text-gray-600">
                                        {resource.isPhysical ? 'Version numérique + physique' : 'Version numérique uniquement'}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setShowPayment(true)}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center"
                                    >
                                        <FaShoppingCart className="mr-3" />
                                        Acheter maintenant
                                    </button>

                                    <button
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        className={`w-full px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center ${isWishlisted
                                            ? 'bg-red-50 text-red-600 border border-red-200'
                                            : 'border border-purple-600 text-purple-600 hover:bg-purple-50'
                                            }`}
                                    >
                                        <FaHeart className={`mr-3 ${isWishlisted ? 'fill-current' : ''}`} />
                                        {isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                                    </button>
                                </div>

                                <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                                    <div className="flex items-center text-green-700 mb-3">
                                        <FaCheckCircle className="mr-3 text-xl" />
                                        <span className="font-bold">Garanties incluses</span>
                                    </div>
                                    <ul className="text-sm text-green-600 space-y-2">
                                        <li className="flex items-start">
                                            <FaCheck className="mr-2 mt-1 flex-shrink-0" />
                                            Téléchargement immédiat après paiement
                                        </li>
                                        <li className="flex items-start">
                                            <FaCheck className="mr-2 mt-1 flex-shrink-0" />
                                            Support client 24/7 par email et chat
                                        </li>
                                        <li className="flex items-start">
                                            <FaCheck className="mr-2 mt-1 flex-shrink-0" />
                                            Satisfait ou remboursé sous 30 jours
                                        </li>
                                        {resource.isPhysical && (
                                            <li className="flex items-start">
                                                <FaCheck className="mr-2 mt-1 flex-shrink-0" />
                                                Livraison gratuite en France métropolitaine
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-xl p-6">
                                <h4 className="font-bold text-gray-900 mb-4">Informations techniques</h4>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Format :</span>
                                        <span className="font-medium">PDF haute qualité (imprimable)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Taille du fichier :</span>
                                        <span className="font-medium">{Math.round(resource.pages * 0.5)} MB</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Langue :</span>
                                        <span className="font-medium">Français</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Dernière mise à jour :</span>
                                        <span className="font-medium">{new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Compatibilité :</span>
                                        <span className="font-medium">Tous appareils (PC, Mac, Tablette)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-xl p-6">
                                <h4 className="font-bold text-gray-900 mb-4">Besoin d'aide ?</h4>
                                <p className="text-gray-600 mb-4">
                                    Notre équipe est disponible pour répondre à toutes vos questions sur cette ressource.
                                </p>
                                <button className="w-full px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                                    Contactez-nous
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal de paiement */}
            <PaymentModal
                resource={resource}
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                onSuccess={handlePurchaseSuccess}
            />
        </div>
    );
};

export default ResourceDetailPage;