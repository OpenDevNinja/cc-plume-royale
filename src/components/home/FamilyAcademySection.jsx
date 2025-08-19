import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaUserGraduate, FaHandsHelping, FaChartLine, FaUsers } from 'react-icons/fa';
import { RiParentFill } from 'react-icons/ri';

const FamilyAcademySection = () => {
    const resources = [
        {
            icon: <FaChalkboardTeacher className="text-5xl" />,
            title: "Ateliers Experts",
            description: "Masterclasses avec des pédagogues renommés",
            stats: "12+ ateliers/mois",
            color: "from-purple-500 to-indigo-500"
        },
        {
            icon: <FaChartLine className="text-5xl" />,
            title: "Suivi Intelligent",
            description: "Analyses détaillées des progrès de votre enfant",
            stats: "10+ indicateurs",
            color: "from-amber-500 to-orange-500"
        },
        {
            icon: <FaHandsHelping className="text-5xl" />,
            title: "Communauté Privée",
            description: "Échangez avec d'autres parents engagés",
            stats: "5 000+ membres",
            color: "from-emerald-500 to-teal-500"
        }
    ];

    return (
        <section className="relative py-24 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
            {/* Éléments décoratifs animés */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-32 -right-32 w-64 h-64 bg-purple-100 rounded-full opacity-10"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full mb-6">
                            <RiParentFill className="mr-2" />
                            <span className="font-medium">Pour les parents</span>
                        </div>
                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Académie Famille Royale</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            L'espace privilégié pour les parents qui veulent s'impliquer activement dans l'éducation de leur enfant
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                "Accès à des rapports détaillés sur les progrès",
                                "Conseils personnalisés d'experts pédagogiques",
                                "Outils pour créer un environnement d'apprentissage optimal",
                                "Webinaires exclusives avec notre équipe éducative"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                    viewport={{ once: true }}
                                    className="flex items-start"
                                >
                                    <span className="flex-shrink-0 mt-1 mr-4 text-indigo-500 bg-indigo-100 p-2 rounded-full">
                                        <FaUserGraduate />
                                    </span>
                                    <span className="text-gray-700 mt-3">{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105">
                            Rejoindre l'académie
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                                alt="Famille apprenante"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
                        </div>

                        {/* Badge animé */}
                        <motion.div
                            animate={{
                                rotate: [0, 5, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border-2 border-indigo-100"
                        >
                            <div className="text-3xl font-bold text-indigo-600">98%</div>
                            <div className="text-gray-600 text-sm">de satisfaction</div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Fonctionnalités */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {resources.map((resource, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${resource.color} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500`} />

                            <div className="relative bg-white p-8 rounded-xl h-full shadow-lg hover:shadow-xl transition-all">
                                <div className={`flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${resource.color} text-white mb-6 mx-auto`}>
                                    {resource.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">{resource.title}</h3>
                                <p className="text-center text-gray-600 mb-4">{resource.description}</p>
                                <div className="text-center text-indigo-600 font-medium">
                                    {resource.stats}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                
            </div>
        </section>
    );
};

export default FamilyAcademySection;