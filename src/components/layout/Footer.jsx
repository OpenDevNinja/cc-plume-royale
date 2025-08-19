import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { motion } from 'framer-motion';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

const Footer = () => {
    const links = [
        {
            title: 'Académies',
            items: [
                { name: 'Académie Enfant Royal', path: ROUTES.KIDS_ACADEMY },
                { name: 'Académie Famille Royale', path: ROUTES.FAMILY_ACADEMY }
            ]
        },
        {
            title: 'Ressources',
            items: [
                { name: 'Cahiers pédagogiques', path: ROUTES.WORKBOOKS },
                { name: 'Jeux éducatifs', path: ROUTES.GAMES },
                { name: 'Vidéos', path: ROUTES.VIDEOS }
            ]
        },
        {
            title: 'Entreprise',
            items: [
                { name: 'À propos', path: ROUTES.ABOUT },
                { name: 'Contact', path: ROUTES.CONTACT },
                { name: 'Carrières', path: ROUTES.CAREERS }
            ]
        },
        {
            title: 'Légal',
            items: [
                { name: 'Confidentialité', path: ROUTES.PRIVACY },
                { name: 'Conditions', path: ROUTES.TERMS },
                { name: 'Cookies', path: ROUTES.COOKIES }
            ]
        }
    ];

    const socialLinks = [
        { icon: <FiFacebook />, name: 'Facebook', url: '#' },
        { icon: <FiInstagram />, name: 'Instagram', url: '#' },
        { icon: <FiTwitter />, name: 'Twitter', url: '#' },
        { icon: <FiYoutube />, name: 'YouTube', url: '#' }
    ];

    return (
        <footer className="bg-gradient-to-b from-white to-indigo-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {links.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <Link
                                            to={item.path}
                                            className="text-gray-600 hover:text-indigo-600 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <div className="border-t border-gray-200 pt-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex justify-center md:order-2 space-x-6 mb-6 md:mb-0"
                        >
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                                    whileHover={{ y: -3 }}
                                >
                                    <span className="sr-only">{social.name}</span>
                                    <span className="text-xl">{social.icon}</span>
                                </motion.a>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="md:order-1"
                        >
                            <div className="flex flex-col items-center md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                                <Link to={ROUTES.HOME} className="flex items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src="/assets/images/logo.png"
                                        alt="C.C. Plume Royale"
                                    />
                                    <span className="ml-2 text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                        Plume Royale
                                    </span>
                                </Link>
                                <p className="text-center md:text-left text-gray-500 text-sm">
                                    &copy; {new Date().getFullYear()} C.C. Plume Royale. Tous droits réservés.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;