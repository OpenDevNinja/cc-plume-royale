import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const ContactFormSection = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Partie Formulaire - Design Pro */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                >
                    <div className="p-8 sm:p-10">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Envoyez-nous un message</h3>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Prénom *
                                    </label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        name="first-name"
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        placeholder="Votre prénom"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom *
                                    </label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        name="last-name"
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                        placeholder="Votre nom"
                                    />
                                </div>
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
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="votre@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Sujet *
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    required
                                >
                                    <option value="">Sélectionnez un sujet</option>
                                    <option value="info">Demande d'information</option>
                                    <option value="support">Support technique</option>
                                    <option value="partnership">Partenariat</option>
                                    <option value="other">Autre</option>
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
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Décrivez votre demande..."
                                ></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                            >
                                <FiSend className="mr-2" />
                                Envoyer le message
                            </motion.button>
                        </form>
                    </div>
                </motion.div>

                {/* Partie Informations - Design Pro */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg overflow-hidden text-white"
                >
                    <div className="p-8 sm:p-10 h-full flex flex-col">
                        <h3 className="text-2xl font-bold mb-8">Nos coordonnées</h3>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-white/20 p-3 rounded-lg mr-5">
                                    <FiMail className="text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">Email</h4>
                                    <p className="text-indigo-100">contact@ccplumeroyale.com</p>
                                    <p className="text-indigo-100">support@ccplumeroyale.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-white/20 p-3 rounded-lg mr-5">
                                    <FiPhone className="text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">Téléphone</h4>
                                    <p className="text-indigo-100">+1 (844) 955-3998</p>
                                    <p className="text-indigo-100 text-sm mt-1">Lun-Ven : 9h-18h (EST)</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-white/20 p-3 rounded-lg mr-5">
                                    <FaWhatsapp className="text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">WhatsApp</h4>
                                    <p className="text-indigo-100">+1 (514) 123-4567</p>
                                    <p className="text-indigo-100 text-sm mt-1">Réponse rapide</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-white/20 p-3 rounded-lg mr-5">
                                    <FiMapPin className="text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-1">Adresse</h4>
                                    <p className="text-indigo-100">4295 Beaubien Est</p>
                                    <p className="text-indigo-100">Montréal, H1T 1S7, Canada</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-8 border-t border-white/20">
                            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Réseaux sociaux</h4>
                            <div className="flex space-x-4">
                                {['Facebook', 'Instagram', 'LinkedIn'].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href="#"
                                        whileHover={{ y: -3 }}
                                        className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                                    >
                                        <span className="sr-only">{social}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactFormSection;