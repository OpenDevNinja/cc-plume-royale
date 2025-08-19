import { motion } from 'framer-motion';
import { FaGamepad, FaVideo, FaTrophy, FaRobot, FaBookOpen, FaHome, FaChevronRight, FaPlay, FaStar, FaUsers, FaClock, FaLightbulb, FaPuzzlePiece, FaCalculator, FaFlask, FaGlobe, FaPaintBrush, FaMusic, FaArrowRight, FaMedal, FaGem } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';
import { useState } from 'react';

// Composant Breadcrumbs intégré
const Breadcrumbs = ({ title, description, breadcrumbs = [] }) => (
    <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
            <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt=""
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-indigo-900/70 to-purple-900/80" />
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

const KidsAcademyPage = () => {
    const [activeCategory, setActiveCategory] = useState('math');

    const stats = [
        {
            value: "500+",
            label: "Jeux éducatifs",
            icon: <FaGamepad className="text-4xl" />,
            color: "from-purple-500 to-indigo-500"
        },
        {
            value: "1500+",
            label: "Enfants actifs",
            icon: <FaUsers className="text-4xl" />,
            color: "from-amber-500 to-orange-500"
        },
        {
            value: "100%",
            label: "Sans publicité",
            icon: <FaTrophy className="text-4xl" />,
            color: "from-emerald-500 to-teal-500"
        }
    ];

    const gameCategories = [
        {
            id: 'math',
            name: 'Mathématiques',
            icon: <FaCalculator className="text-3xl" />,
            color: 'from-blue-500 to-cyan-500',
            games: [
                {
                    title: "Mission Multiplication",
                    description: "Sauve la galaxie en résolvant les tables de multiplication",
                    difficulty: "Moyen",
                    duration: "15 min",
                    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    badges: ["Calculateur", "Héros Spatial"]
                },
                {
                    title: "Château des Fractions",
                    description: "Explore un château magique en apprenant les fractions",
                    difficulty: "Difficile",
                    duration: "20 min",
                    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    badges: ["Magicien", "Expert Fractions"]
                }
            ]
        },
        {
            id: 'reading',
            name: 'Lecture',
            icon: <FaBookOpen className="text-3xl" />,
            color: 'from-green-500 to-emerald-500',
            games: [
                {
                    title: "Aventures Littéraires",
                    description: "Crée tes propres histoires avec des personnages fantastiques",
                    difficulty: "Facile",
                    duration: "25 min",
                    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    badges: ["Conteur", "Créatif"]
                },
                {
                    title: "Détective Alphabet",
                    description: "Résous des mystères en utilisant tes compétences de lecture",
                    difficulty: "Moyen",
                    duration: "18 min",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    badges: ["Détective", "Lecteur Expert"]
                }
            ]
        },
        {
            id: 'science',
            name: 'Sciences',
            icon: <FaFlask className="text-3xl" />,
            color: 'from-purple-500 to-pink-500',
            games: [
                {
                    title: "Laboratoire Virtuel",
                    description: "Mène des expériences scientifiques en toute sécurité",
                    difficulty: "Difficile",
                    duration: "30 min",
                    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                    badges: ["Scientifique", "Expérimentateur"]
                }
            ]
        }
    ];

    const achievements = [
        {
            title: "Premier Pas",
            description: "Complète ton premier jeu",
            icon: <FaStar className="text-2xl" />,
            color: "from-yellow-400 to-orange-400",
            rarity: "Commun"
        },
        {
            title: "Marathon Mathématique",
            description: "Joue 10 jeux de maths en une semaine",
            icon: <FaMedal className="text-2xl" />,
            color: "from-blue-400 to-indigo-400",
            rarity: "Rare"
        },
        {
            title: "Génie Créatif",
            description: "Crée 5 histoires originales",
            icon: <FaGem className="text-2xl" />,
            color: "from-purple-400 to-pink-400",
            rarity: "Légendaire"
        }
    ];

    const features = [
        {
            title: "Apprentissage Adaptatif",
            description: "L'IA ajuste automatiquement la difficulté selon les progrès de votre enfant",
            icon: <FaRobot className="text-5xl" />,
            color: "from-indigo-500 to-purple-500"
        },
        {
            title: "Contenu Sécurisé",
            description: "Environnement 100% sûr sans publicité ni contenu inapproprié",
            icon: <IoMdSchool className="text-5xl" />,
            color: "from-green-500 to-emerald-500"
        },
        {
            title: "Suivi en Temps Réel",
            description: "Les parents peuvent suivre les progrès et les apprentissages",
            icon: <FaLightbulb className="text-5xl" />,
            color: "from-amber-500 to-orange-500"
        }
    ];

    return (
        <div className="bg-white">
            {/* Breadcrumbs */}
            <Breadcrumbs
                title="Académie Enfant Royal"
                description="Un monde magique où l'apprentissage devient une aventure passionnante pour les 9-10 ans"
                breadcrumbs={[
                    { label: "Accueil" },
                    { label: "Académie Enfant" }
                ]}
            />

            {/* Section Statistiques */}
            <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.05 }}
                                className="relative group"
                            >
                                <div className={`absolute -inset-0.5 bg-gradient-to-br ${stat.color} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500`} />
                                <div className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                                    <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} text-white mb-4 mx-auto`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl font-bold text-center text-gray-900 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-center text-gray-600">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Section Jeux par catégorie */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Explore nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">univers ludiques</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Découvre des centaines de jeux éducatifs conçus spécialement pour les 9-10 ans
                        </p>
                    </motion.div>

                    {/* Navigation catégories */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-gray-100 p-2 rounded-xl flex flex-wrap justify-center gap-2">
                            {gameCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${activeCategory === category.id
                                            ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                        }`}
                                >
                                    <span className="mr-2">{category.icon}</span>
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contenu des jeux */}
                    {gameCategories.map((category) => (
                        activeCategory === category.id && (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {category.games.map((game, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
                                    >
                                        <div className="h-48 relative overflow-hidden">
                                            <img
                                                src={game.image}
                                                alt={game.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className={`absolute top-4 right-4 bg-gradient-to-r ${category.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                                                {game.difficulty}
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <button className="w-full bg-white text-gray-900 py-2 rounded-lg font-bold flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                        <FaPlay className="mr-2" />
                                                        Jouer maintenant
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {game.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {game.description}
                                            </p>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="flex items-center text-gray-500">
                                                    <FaClock className="mr-1" />
                                                    {game.duration}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {game.badges.map((badge, badgeIndex) => (
                                                    <span
                                                        key={badgeIndex}
                                                        className={`bg-gradient-to-r ${category.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
                                                    >
                                                        <FaMedal className="inline mr-1" />
                                                        {badge}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )
                    ))}
                </div>
            </section>

            {/* Section Badges et Récompenses */}
            <section className="py-20 bg-gradient-to-b from-indigo-50 to-purple-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Système de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">récompenses</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Collectionne des badges uniques et débloquer de nouveaux défis au fur et à mesure de tes progrès
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, rotate: 2 }}
                                className="relative group"
                            >
                                <div className={`absolute -inset-0.5 bg-gradient-to-br ${achievement.color} rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500`} />
                                <div className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                                    <div className="text-center">
                                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${achievement.color} text-white mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                                            {achievement.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {achievement.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {achievement.description}
                                        </p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${achievement.color} text-white`}>
                                            {achievement.rarity}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Fonctionnalités */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Une expérience <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">sur-mesure</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Notre technologie avancée s'adapte à chaque enfant pour offrir une expérience d'apprentissage personnalisée
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="relative group"
                            >
                                <div className={`absolute -inset-0.5 bg-gradient-to-br ${feature.color} rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500`} />
                                <div className="relative bg-white p-8 rounded-xl h-full shadow-lg hover:shadow-xl transition-all">
                                    <div className={`flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${feature.color} text-white mb-6 mx-auto`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-center text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section CTA Aventure */}
            <section className="py-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 relative overflow-hidden">
                {/* Éléments décoratifs animés */}
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full"
                />
                <motion.div
                    animate={{
                        rotate: [360, 0],
                        scale: [1.2, 1, 1.2]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-20 -right-20 w-52 h-52 bg-purple-300/20 rounded-full"
                />

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="inline-block mb-6"
                        >
                            <FaGamepad className="text-6xl text-white/80" />
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            L'aventure commence maintenant !
                        </h2>
                        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                            Rejoins des milliers d'enfants qui apprennent en s'amusant dans notre univers magique et sécurisé
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:bg-purple-50 transition-all shadow-lg flex items-center justify-center"
                            >
                                <FaPlay className="mr-2" />
                                Commencer l'aventure
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-purple-600 transition-all flex items-center justify-center"
                            >
                                Voir la démo
                                <FaArrowRight className="ml-2" />
                            </motion.button>
                        </div>

                        {/* Badges de confiance */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                            className="mt-12 pt-8 border-t border-white/20"
                        >
                            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
                                <div className="flex items-center">
                                    <IoMdSchool className="text-2xl mr-2" />
                                    <span className="font-medium">Pédagogie validée</span>
                                </div>
                                <div className="flex items-center">
                                    <FaTrophy className="text-2xl mr-2" />
                                    <span className="font-medium">Sans publicité</span>
                                </div>
                                <div className="flex items-center">
                                    <FaUsers className="text-2xl mr-2" />
                                    <span className="font-medium">1500+ enfants</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default KidsAcademyPage;