import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { FaGamepad, FaVideo, FaTrophy, FaRobot, FaBookOpen } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';

const KidsAcademySection = () => {
    const controls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            await controls.start({
                rotate: [0, 3, 0],
                transition: { duration: 6 }
            });
        };
        sequence();
    }, []);

    const features = [
        {
            icon: <FaGamepad className="text-5xl" />,
            title: "Univers Ludique",
            description: "Plus de 100 jeux éducatifs conçus par des experts",
            color: "from-purple-500 to-indigo-500",
            items: ["Mathématiques", "Lecture", "Sciences", "Logique"]
        },
        {
            icon: <FaVideo className="text-5xl" />,
            title: "Vidéos Interactives",
            description: "Contenu pédagogique captivant et personnalisé",
            color: "from-amber-500 to-orange-500",
            items: ["Histoires animées", "Expériences scientifiques", "Cours interactifs"]
        },
        {
            icon: <FaTrophy className="text-5xl" />,
            title: "Récompenses",
            description: "Système de motivation unique",
            color: "from-emerald-500 to-teal-500",
            items: ["Badges collectors", "Tableau des champions", "Certificats"]
        }
    ];

    return (
        <section className="relative py-24 overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
            {/* Éléments décoratifs animés */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-20 -left-20 w-64 h-64 bg-purple-100 rounded-full opacity-10"
            />

            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-100 rounded-full opacity-10"
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* En-tête avec animation */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center justify-center px-6 py-2 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                        <span className="font-medium">Nouveauté 2024</span>
                    </div>
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Académie Enfant Royal</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Un monde magique où l'apprentissage devient une aventure passionnante pour les 9-10 ans
                    </p>
                </motion.div>

                {/* Grille de fonctionnalités */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="relative group"
                        >
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500`} />

                            <div className="relative bg-white p-8 rounded-xl h-full shadow-lg hover:shadow-xl transition-all">
                                <div className={`flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${feature.color} text-white mb-6 mx-auto`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-center text-gray-600 mb-6">{feature.description}</p>
                                <ul className="space-y-2">
                                    {feature.items.map((item, i) => (
                                        <li key={i} className="flex items-center">
                                            <span className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Section CTA avec animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden shadow-2xl"
                >
                    <div className="p-12 text-center text-white relative">
                        {/* Éléments flottants */}
                        <motion.div
                            animate={controls}
                            className="absolute top-8 left-8 text-white/10"
                        >
                            <IoMdSchool className="text-6xl" />
                        </motion.div>
                        <motion.div
                            animate={controls}
                            className="absolute bottom-8 right-8 text-white/10"
                        >
                            <FaBookOpen className="text-6xl" />
                        </motion.div>

                        <h3 className="text-3xl font-bold mb-4 relative z-10">Espace 100% Sécurisé</h3>
                        <p className="text-indigo-100 mb-8 max-w-2xl mx-auto relative z-10">
                            Environnement sans publicité avec contrôle parental et suivi des progrès en temps réel
                        </p>
                        <div className="relative z-10">
                            <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg">
                                Démarrer l'aventure gratuitement
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default KidsAcademySection;