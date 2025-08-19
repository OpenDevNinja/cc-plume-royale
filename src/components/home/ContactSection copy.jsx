import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const ContactSection = () => {
    return (
        <section id="contact" className="relative py-28 overflow-hidden bg-gradient-to-b from-white to-indigo-50">
            {/* Éléments décoratifs animés */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-0 left-0 w-64 h-64 bg-purple-100 rounded-full opacity-10 -translate-x-32 -translate-y-32"
            />

            <motion.div
                animate={{
                    x: [0, -80, 0],
                    y: [0, 40, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-100 rounded-full opacity-10 translate-x-32 translate-y-32"
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* En-tête */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-5 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-6">
                        Nous contacter
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Parlez-nous de votre projet</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Notre équipe est à votre écoute pour répondre à toutes vos questions en moins de 24h.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Carte de contact élégante */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                    >
                        <div className="p-10">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">Coordonnées</h3>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-indigo-100 p-4 rounded-xl text-indigo-600 mr-6">
                                        <FiMail className="text-2xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-1">Email</h4>
                                        <p className="text-gray-600">contact@ccplumeroyale.com</p>
                                        <p className="text-gray-600">support@ccplumeroyale.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-indigo-100 p-4 rounded-xl text-indigo-600 mr-6">
                                        <FiPhone className="text-2xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-1">Téléphone</h4>
                                        <p className="text-gray-600">+1 (844) 955-3998</p>
                                        <p className="text-sm text-gray-500 mt-1">Lun-Ven : 9h-18h (EST)</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-indigo-100 p-4 rounded-xl text-indigo-600 mr-6">
                                        <FaWhatsapp className="text-2xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-1">Messagerie</h4>
                                        <p className="text-gray-600">+1 (514) 123-4567</p>
                                        <p className="text-sm text-gray-500 mt-1">Réponse en direct</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-indigo-100 p-4 rounded-xl text-indigo-600 mr-6">
                                        <FiMapPin className="text-2xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-1">Bureau</h4>
                                        <p className="text-gray-600">4295 Beaubien Est</p>
                                        <p className="text-gray-600">Montréal, H1T 1S7, Canada</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">Suivez-nous</h4>
                                <div className="flex space-x-4">
                                    {[
                                        { icon: <FaInstagram />, name: 'Instagram' },
                                        { icon: <FaFacebookF />, name: 'Facebook' },
                                        { icon: <FaLinkedinIn />, name: 'LinkedIn' }
                                    ].map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href="#"
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-12 h-12 bg-gray-50 hover:bg-indigo-50 rounded-xl flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-all"
                                        >
                                            <span className="sr-only">{social.name}</span>
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Formulaire sophistiqué */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                    >
                        <div className="p-10">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">Envoyez un message</h3>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom complet *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Votre nom"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="votre@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Sujet *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none transition-all"
                                        required
                                    >
                                        <option value="">Sélectionnez un sujet</option>
                                        <option>Demande d'information</option>
                                        <option>Support technique</option>
                                        <option>Partenariat</option>
                                        <option>Autre question</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="Décrivez votre demande..."
                                    ></textarea>
                                </div>

                                <div className="flex items-start">
                                    <input
                                        id="consent"
                                        name="consent"
                                        type="checkbox"
                                        required
                                        className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="consent" className="ml-3 text-sm text-gray-600">
                                        J'accepte que mes données soient utilisées pour traiter ma demande. *
                                    </label>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all mt-4"
                                >
                                    <FiSend className="mr-3" />
                                    Envoyer le message
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>

                {/* Carte interactive */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 rounded-2xl overflow-hidden shadow-xl border border-gray-200"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.789076490997!2d-73.6100799241366!3d45.53972597107288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91bd2c844b1bd%3A0x6e5a7a7d3b1a3b3d!2s4295%20Beaubien%20E%2C%20Montr%C3%A9al%2C%20QC%20H1T%201S7%2C%20Canada!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className="filter grayscale(30%) hover:grayscale(0%) transition-all duration-500"
                        title="Localisation C.C. Plume Royale"
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;