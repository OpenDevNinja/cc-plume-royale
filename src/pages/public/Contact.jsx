import { motion } from 'framer-motion';
import { FaHome, FaChevronRight, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaUser, FaPaperPlane, FaWhatsapp, FaTwitter, FaLinkedin, FaFacebook, FaHeadset, FaQuestionCircle, FaHandshake, FaRocket, FaStar, FaCalendarAlt, FaVideo, FaGlobe, FaComments } from 'react-icons/fa';
import { useState } from 'react';

// Composant Breadcrumbs intégré
const Breadcrumbs = ({ title, description, breadcrumbs = [] }) => (
    <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
            <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80"
                alt=""
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/70 to-indigo-900/80" />
        </div>

        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center space-x-2 mb-8"
                >
                    <button className="flex items-center text-white/80 hover:text-white transition-colors">
                        <FaHome className="w-4 h-4" />
                    </button>
                    {breadcrumbs.map((crumb, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="flex items-center space-x-2"
                        >
                            <FaChevronRight className="w-3 h-3 text-white/60" />
                            <span className="text-white font-medium">{crumb.label}</span>
                        </motion.div>
                    ))}
                </motion.nav>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-6xl font-bold text-white mb-6"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                        {title}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
                >
                    {description}
                </motion.p>
            </div>
        </div>
    </section>
);

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
        priority: 'normal'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactMethods = [
        {
            title: "Support Client",
            description: "Réponse sous 2h en moyenne",
            icon: <FaHeadset className="text-4xl" />,
            color: "from-blue-500 to-indigo-500",
            contact: "support@ccplumeroyal.com",
            availability: "24/7"
        },
        {
            title: "Équipe Commerciale",
            description: "Découvrez nos solutions sur-mesure",
            icon: <FaHandshake className="text-4xl" />,
            color: "from-green-500 to-emerald-500",
            contact: "commercial@ccplumeroyal.com",
            availability: "Lun-Ven 9h-18h"
        },
        {
            title: "Support Technique",
            description: "Aide technique et assistance",
            icon: <FaRocket className="text-4xl" />,
            color: "from-purple-500 to-pink-500",
            contact: "technique@ccplumeroyal.com",
            availability: "Lun-Sam 8h-20h"
        }
    ];

    const quickHelp = [
        {
            question: "Comment créer un compte enfant ?",
            answer: "Rendez-vous dans l'espace parent, cliquez sur 'Ajouter un enfant' et suivez les étapes guidées.",
            category: "Compte"
        },
        {
            question: "Mon enfant peut-il utiliser plusieurs appareils ?",
            answer: "Oui ! Un seul abonnement permet l'utilisation sur 3 appareils simultanément.",
            category: "Technique"
        },
        {
            question: "Comment annuler mon abonnement ?",
            answer: "Vous pouvez annuler à tout moment depuis votre espace parent, section 'Abonnement'.",
            category: "Facturation"
        },
        {
            question: "Les contenus sont-ils vraiment adaptés à l'âge ?",
            answer: "Absolument ! Tous nos contenus sont créés par des pédagogues et validés par des experts.",
            category: "Pédagogie"
        }
    ];

    const offices = [
        {
            city: "Paris",
            address: "42 Avenue des Champs-Élysées, 75008 Paris",
            phone: "+33 1 42 86 12 34",
            email: "paris@ccplumeroyal.com",
            hours: "Lun-Ven : 9h-18h",
            isHeadquarter: true
        },
        {
            city: "Lyon",
            address: "15 Rue de la République, 69002 Lyon",
            phone: "+33 4 78 92 45 67",
            email: "lyon@ccplumeroyal.com",
            hours: "Lun-Ven : 9h-17h",
            isHeadquarter: false
        },
        {
            city: "Toulouse",
            address: "8 Place du Capitole, 31000 Toulouse",
            phone: "+33 5 61 23 89 01",
            email: "toulouse@ccplumeroyal.com",
            hours: "Lun-Ven : 9h-17h",
            isHeadquarter: false
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulation d'envoi
        await new Promise(resolve => setTimeout(resolve, 2000));

        alert("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.");
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: 'general',
            message: '',
            priority: 'normal'
        });
        setIsSubmitting(false);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="bg-white">
            {/* Breadcrumbs */}
            <Breadcrumbs
                title="Contactez-nous"
                description="Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner"
                breadcrumbs={[
                    { label: "Accueil" },
                    { label: "Contact" }
                ]}
            />

            {/* Section Méthodes de contact */}
            <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Comment pouvons-nous <span className="text-indigo-600">vous aider ?</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Choisissez le canal qui correspond le mieux à votre besoin
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {contactMethods.map((method, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="relative group"
                            >
                                <div className={`absolute -inset-0.5 bg-gradient-to-br ${method.color} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500`} />
                                <div className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all h-full">
                                    <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${method.color} text-white mb-6 mx-auto`}>
                                        {method.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                                        {method.title}
                                    </h3>
                                    <p className="text-center text-gray-600 mb-4">
                                        {method.description}
                                    </p>
                                    <div className="text-center">
                                        <a
                                            href={`mailto:${method.contact}`}
                                            className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                                        >
                                            {method.contact}
                                        </a>
                                    </div>
                                    <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                                        <FaClock className="mr-2" />
                                        {method.availability}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Formulaire de contact */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className='py-16'
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Envoyez-nous <span className="text-indigo-600">un message</span>
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Remplissez ce formulaire et notre équipe vous répondra dans les plus brefs délais.
                                Tous les champs sont obligatoires pour garantir une réponse de qualité.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Votre nom complet
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaUser className="text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                                                placeholder="Jean Dupont"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Adresse email
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaEnvelope className="text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                                                placeholder="jean.dupont@exemple.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Numéro de téléphone (optionnel)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaPhone className="text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                                            placeholder="+155 6 12 34 56 78"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                            Sujet de votre message
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                                        >
                                            <option value="general">Question générale</option>
                                            <option value="technical">Problème technique</option>
                                            <option value="account">Gestion de compte</option>
                                            <option value="billing">Facturation</option>
                                            <option value="partnership">Partenariat</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                                            Priorité
                                        </label>
                                        <select
                                            id="priority"
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                                        >
                                            <option value="low">Faible</option>
                                            <option value="normal">Normale</option>
                                            <option value="high">Élevée</option>
                                            <option value="urgent">Urgente</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Votre message
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                                            <FaComments className="text-gray-400" />
                                        </div>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Décrivez votre demande en détail..."
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="privacy"
                                        name="privacy"
                                        type="checkbox"
                                        required
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                                        J'accepte la <a href="#" className="text-indigo-600 hover:text-indigo-800">politique de confidentialité</a>
                                    </label>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-xl transition-all transform hover:scale-[1.02]"
                                    >
                                        {isSubmitting ? (
                                            "Envoi en cours..."
                                        ) : (
                                            <>
                                                <FaPaperPlane className="mr-2" />
                                                Envoyer le message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-indigo-50 rounded-2xl p-8 lg:p-12"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Questions <span className="text-indigo-600">fréquentes</span>
                            </h3>

                            <div className="space-y-6">
                                {quickHelp.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ x: 5 }}
                                        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-full mr-4">
                                                <FaQuestionCircle className="text-indigo-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-1">
                                                    {item.question}
                                                </h4>
                                                <p className="text-gray-600 text-sm">
                                                    {item.answer}
                                                </p>
                                                <span className="inline-block mt-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-12">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">
                                    Vous préférez les réseaux sociaux ?
                                </h4>
                                <div className="flex space-x-4">
                                    <a href="#" className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
                                        <FaFacebook className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors">
                                        <FaTwitter className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors">
                                        <FaWhatsapp className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors">
                                        <FaLinkedin className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

           

            {/* Section CTA */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Vous avez besoin d'aide immédiate ?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Notre équipe de support est disponible 24/7 pour répondre à vos questions urgentes
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto">
                                <FaPhone className="mr-2" />
                                +33 800 123 456
                            </button>
                            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-indigo-600 transition-all transform hover:scale-105 flex items-center justify-center mx-auto">
                                <FaWhatsapp className="mr-2" />
                                Chat WhatsApp
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;