import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { FaBookOpen, FaUsers, FaGraduationCap, FaLightbulb, FaChild, FaChartLine } from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';

const AboutSection = () => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            y: [0, -15, 0],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        });
    }, []);

    const stats = [
        {
            value: "1,200+",
            label: "Enfants actifs",
            icon: <FaChild className="text-5xl" />,
            color: "from-indigo-500 to-purple-500"
        },
        {
            value: "500+",
            label: "Ressources",
            icon: <FaBookOpen className="text-5xl" />,
            color: "from-amber-500 to-orange-500"
        },
        {
            value: "98%",
            label: "Satisfaction",
            icon: <FaLightbulb className="text-5xl" />,
            color: "from-emerald-500 to-teal-500"
        }
    ];

    const team = [
        {
            name: "Carine Capko",
            role: "Fondatrice & Pédagogue",
            bio: "15 ans d'expérience en éducation alternative, spécialiste des méthodes Montessori",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&q=80",
            specialty: "Pédagogie innovante"
        },
        {
            name: "Jean Dubois",
            role: "Directeur Technologie",
            bio: "Expert en edtech avec 10 ans d'expérience dans les plateformes éducatives",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&q=80",
            specialty: "Gamification"
        }
    ];

    return (
        <section className="relative py-24 bg-gradient-to-b from-white to-indigo-50 overflow-hidden">
            {/* Éléments décoratifs animés */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-32 -left-32 w-64 h-64 bg-purple-100 rounded-full opacity-10"
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Mission */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center px-6 py-2 bg-indigo-100 text-indigo-600 rounded-full mb-6">
                        <RiTeamFill className="mr-2" />
                        <span className="font-medium">Notre ADN</span>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">mission</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Révolutionner l'apprentissage pour les 9-10 ans à travers une approche ludique et personnalisée
                    </p>
                </motion.div>

                {/* Statistiques */}
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="relative group"
                        >
                            <div className={`absolute -inset-0.5 bg-gradient-to-br ${stat.color} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500`} />

                            <div className="relative bg-white p-8 rounded-xl h-full shadow-lg hover:shadow-xl transition-all">
                                <div className={`flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} text-white mb-6 mx-auto`}>
                                    {stat.icon}
                                </div>
                                <div className="text-4xl font-bold text-center text-gray-900 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-lg text-center text-gray-600">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div> */}

                {/* Histoire */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-8">
                            Notre <span className="text-indigo-600">histoire</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Fondée en 2020 par Carine Capko, une enseignante passionnée, <span className="font-semibold text-indigo-600">C.C. Plume Royale</span> est née d'une conviction profonde : chaque enfant mérite une éducation adaptée à son rythme et à ses passions.
                        </p>
                        <p className="text-lg text-gray-600 mb-6">
                            Après avoir constaté les limites du système traditionnel, notre équipe a imaginé une plateforme où <span className="font-semibold">technologie et pédagogie</span> s'unissent pour créer des expériences d'apprentissage mémorables.
                        </p>
                        <p className="text-lg text-gray-600">
                            Aujourd'hui, nous accompagnons des milliers d'enfants dans leur épanouissement éducatif avec une approche <span className="font-semibold">unique et innovante</span>.
                        </p>
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
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                                alt="Équipe éducative"
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
                        </div>

                        <motion.div
                            animate={controls}
                            className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border-2 border-indigo-100"
                        >
                            <div className="text-3xl font-bold text-indigo-600">2020</div>
                            <div className="text-gray-600 text-sm">Année de création</div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Approche pédagogique */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">approche</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Une méthodologie unique combinant les meilleures pratiques pédagogiques
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FaGraduationCap className="text-5xl" />,
                                title: "Personnalisation",
                                description: "Adaptation automatique au niveau et aux centres d'intérêt de chaque enfant",
                                color: "from-purple-500 to-indigo-500"
                            },
                            {
                                icon: <FaBookOpen className="text-5xl" />,
                                title: "Qualité",
                                description: "Contenu validé par notre comité pédagogique et des experts scientifiques",
                                color: "from-amber-500 to-orange-500"
                            },
                            {
                                icon: <FaChartLine className="text-5xl" />,
                                title: "Progrès Mesurables",
                                description: "Tableaux de bord détaillés pour suivre l'évolution des compétences",
                                color: "from-emerald-500 to-teal-500"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.03 }}
                                className="relative group"
                            >
                                <div className={`absolute -inset-0.5 bg-gradient-to-br ${item.color} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500`} />

                                <div className="relative bg-white p-8 rounded-xl h-full shadow-lg hover:shadow-xl transition-all">
                                    <div className={`flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${item.color} text-white mb-6 mx-auto`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-center text-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Équipe */}
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Rencontrez <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">notre équipe</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Des passionnés dédiés à la réussite éducative de votre enfant
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {team.map((person, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500" />

                                <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={person.image}
                                            alt={person.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {person.name}
                                        </h3>
                                        <p className="text-indigo-600 font-medium mb-3">
                                            {person.role}
                                        </p>
                                        <p className="text-gray-600 mb-4">
                                            {person.bio}
                                        </p>
                                        <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                                            {person.specialty}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mt-16 bg-gradient-to-r from-indigo-50 to-white rounded-2xl p-8 md:p-12 border border-indigo-100 relative overflow-hidden"
                    >
                        <div className="absolute -right-10 -top-10 text-indigo-100 text-9xl">
                            <FaUsers />
                        </div>
                        <div className="relative z-10 max-w-4xl mx-auto text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Rejoignez notre aventure éducative
                            </h3>
                            <p className="text-xl text-gray-600 mb-8">
                                Nous recrutons des talents passionnés par l'éducation innovante
                            </p>
                            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105">
                                Voir nos offres
                            </button>
                        </div>
                    </motion.div>
                </motion.div> */}
            </div>
        </section>
    );
};

export default AboutSection;