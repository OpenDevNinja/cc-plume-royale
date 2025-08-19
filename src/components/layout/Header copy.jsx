import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import Button from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const Header = ({ user, logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false); // Ferme le menu mobile après clic
        }
    };

    const navItems = [
        { name: 'Accueil', path: ROUTES.HOME, isLink: true },
        { name: 'Qui Sommes Nous ?', anchor: 'about-section', isLink: false },
        { name: 'Académie Enfant Royal', anchor: 'kids-academy', isLink: false },
        { name: 'Académie Famille Royale', anchor: 'family-academy', isLink: false },
        { name: 'Tarifs', anchor: 'pricing', isLink: false },
        { name: 'Contact', anchor: 'contact', isLink: false },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo avec animation */}
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Link to={ROUTES.HOME} className="flex items-center">
                            <img
                                className="h-10 w-auto"
                                src="/assets/images/logo.png"
                                alt="C.C. Plume Royale"
                            />
                           </Link>
                    </motion.div>

                    {/* Navigation Desktop */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.isLink ? (
                                    <Link
                                        to={item.path}
                                        className={`text-gray-700 hover:text-indigo-600 transition-colors font-medium ${location.pathname === item.path ? 'text-indigo-600 border-b-2 border-indigo-600' : ''}`}
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => scrollToSection(item.anchor)}
                                        className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                                    >
                                        {item.name}
                                    </button>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Boutons CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <UserDropdown user={user} logout={logout} />
                        ) : (
                            <>
                                <Link
                                    to={ROUTES.LOGIN}
                                    className="text-gray-700 hover:text-indigo-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50"
                                >
                                    Connexion
                                </Link>
                                <Button
                                    as={Link}
                                    to={ROUTES.REGISTER}
                                    variant="primary"
                                    size="md"
                                    className="hover:scale-105 transform transition-all shadow-lg"
                                >
                                    Inscription
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Menu Mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-indigo-600 focus:outline-none p-2 rounded-lg hover:bg-indigo-50"
                            aria-label="Menu mobile"
                        >
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile - Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-white shadow-xl"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-3">
                            {navItems.map((item) => (
                                <div key={item.name}>
                                    {item.isLink ? (
                                        <Link
                                            to={item.path}
                                            className={`block py-3 px-4 rounded-lg ${location.pathname === item.path ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                scrollToSection(item.anchor);
                                                setIsOpen(false);
                                            }}
                                            className="block w-full text-left py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-100"
                                        >
                                            {item.name}
                                        </button>
                                    )}
                                </div>
                            ))}
                            <div className="pt-4 border-t border-gray-200">
                                {user ? (
                                    <button
                                        onClick={logout}
                                        className="w-full text-left py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-100"
                                    >
                                        Déconnexion
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            to={ROUTES.LOGIN}
                                            className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-100 mb-2"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Connexion
                                        </Link>
                                        <Button
                                            as={Link}
                                            to={ROUTES.REGISTER}
                                            variant="primary"
                                            size="md"
                                            className="w-full"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Inscription
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

const UserDropdown = ({ user, logout }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 focus:outline-none"
                aria-expanded={isOpen}
                aria-label="Menu utilisateur"
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="py-1">
                            <Link
                                to="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                            >
                                Mon profil
                            </Link>
                            <Link
                                to="/dashboard"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                            >
                                Tableau de bord
                            </Link>
                            <button
                                onClick={logout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                            >
                                Déconnexion
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Header;