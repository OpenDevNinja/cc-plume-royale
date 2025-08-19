import { motion } from 'framer-motion';
import { FaBookOpen, FaUsers, FaGraduationCap, FaLightbulb, FaChild, FaChartLine, FaHome, FaChevronRight, FaAward, FaHeart, FaRocket, FaStar, FaHandsHelping, FaGlobe, FaLeaf, FaCode, FaPaintBrush, FaShieldAlt } from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';
import { useState } from 'react';

// Composant Breadcrumbs intégré
const Breadcrumbs = ({ title, description, breadcrumbs = [] }) => (
    <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
            <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
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

const AboutPage = () => {
    const [activeValue, setActiveValue] = useState(0);

    const stats = [
        {
            value: "2020",
            label: "Année de création",
            icon: <FaRocket className="text-4xl" />,
            color: "from-indigo-500 to-purple-500"
        },
        {
            value: "3000+",
            label: "Familles accompagnées",
            icon: <FaUsers className="text-4xl" />,
            color: "from-emerald-500 to-teal-500"
        },
        {
            value: "500+",
            label: "Ressources créées",
            icon: <FaBookOpen className="text-4xl" />,
            color: "from-amber-500 to-orange-500"
        },
        {
            value: "99%",
            label: "Satisfaction parents",
            icon: <FaStar className="text-4xl" />,
            color: "from-pink-500 to-rose-500"
        }
    ];

    const values = [
        {
            title: "Bienveillance Éducative",
            description: "Au cœur de notre approche se trouve la bienveillance. Nous créons un environnement sécurisant où chaque enfant peut apprendre à son rythme sans jugement ni pression.",
            icon: <FaHeart className="text-6xl" />,
            color: "from-pink-500 to-red-500",
            features: ["Respect du rythme", "Encouragement positif", "Estime de soi", "Confiance"]
        },
        {
            title: "Innovation Pédagogique",
            description: "Nous révolutionnons l'éducation en combinant les meilleures pratiques pédagogiques avec la technologie moderne pour créer des expériences d'apprentissage uniques et mémorables.",
            icon: <FaLightbulb className="text-6xl" />,
            color: "from-yellow-500 to-orange-500",
            features: ["IA adaptive", "Gamification", "Réalité augmentée", "Parcours personnalisés"]
        },
       
        {
            title: "Excellence Qualité",
            description: "Tous nos contenus sont créés par des experts pédagogiques et validés par notre comité scientifique pour garantir la plus haute qualité éducative possible.",
            icon: <FaAward className="text-6xl" />,
            color: "from-blue-500 to-indigo-500",
            features: ["Contenu expertisé", "Validation scientifique", "Mise à jour continue", "Standards élevés"]
        },
        {
            title: "Impact Responsable",
            description: "Nous nous engageons pour un impact positif durable, en sensibilisant les enfants aux enjeux environnementaux et sociaux à travers nos contenus éducatifs.",
            icon: <FaLeaf className="text-6xl" />,
            color: "from-green-500 to-emerald-500",
            features: ["Éco-responsabilité", "Inclusion", "Diversité", "Citoyenneté"]
        }
    ];

    const timeline = [
        {
            year: "2020",
            title: "Naissance du projet",
            description: "Carine Capko fonde C.C. Plume Royale avec la vision de révolutionner l'éducation des 9-10 ans",
            icon: <FaRocket />
        },
        {
            year: "2021",
            title: "Premiers contenus",
            description: "Lancement de nos premières ressources pédagogiques et jeux éducatifs",
            icon: <FaBookOpen />
        },
        {
            year: "2022",
            title: "Communauté grandissante",
            description: "1000 familles nous font confiance et rejoignent notre aventure éducative",
            icon: <FaUsers />
        },
        {
            year: "2023",
            title: "Innovation technologique",
            description: "Intégration de l'IA adaptive pour personnaliser l'apprentissage de chaque enfant",
            icon: <FaCode />
        },
        {
            year: "2024",
            title: "Reconnaissance officielle",
            description: "Certification qualité et partenariats avec des institutions éducatives",
            icon: <FaAward />
        },
        {
            year: "2025",
            title: "Expansion internationale",
            description: "Ouverture vers de nouveaux marchés et développement de contenus multilingues",
            icon: <FaGlobe />
        }
    ];

    const team = [
        {
            name: "Carine Capko",
            role: "Fondatrice & CEO",
            bio: "Pédagogue passionnée avec 15 ans d'expérience en éducation alternative. Spécialiste des méthodes Montessori et Freinet, elle a développé une approche unique combinant tradition et innovation.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            specialty: "Pédagogie innovante",
            achievements: ["Diplôme Montessori", "15 ans d'expérience", "Auteure de 3 livres"]
        },
        {
            name: "Dr. Jean Dubois",
            role: "Directeur Pédagogique",
            bio: "Docteur en Sciences de l'Éducation, expert en psychologie cognitive de l'enfant. Il supervise la création de tous nos contenus pédagogiques pour garantir leur efficacité.",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            specialty: "Psychologie cognitive",
            achievements: ["Doctorat Paris V", "20+ publications", "Expert UNESCO"]
        },
        {
            name: "Sophie Martin",
            role: "Responsable Innovation",
            bio: "Ingénieure en informatique spécialisée en EdTech, elle développe nos outils technologiques et supervise l'intégration de l'intelligence artificielle dans nos programmes.",
            image: "https://images.unsplash.com/photo-1494790108755-2616c4b36159?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            specialty: "Technologies éducatives",
            achievements: ["Master MIT", "10 ans EdTech", "5 brevets"]
        },
        {
            name: "Thomas Leroy",
            role: "Designer Créatif",
            bio: "Designer UX/UI passionné par l'éducation, il crée des interfaces intuitives et attrayantes qui rendent l'apprentissage ludique et accessible pour les enfants.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            specialty: "Design éducatif",
            achievements: ["École des Beaux-Arts", "Red Dot Award", "Interface Award"]
        }
    ];

    const certifications = [
        {
            name: "Certification Qualité ISO",
            description: "Nos processus respectent les standards internationaux de qualité",
            icon: <FaShieldAlt className="text-3xl" />
        },
        {
            name: "Conformité RGPD",
            description: "Protection totale des données personnelles de nos utilisateurs",
            icon: <FaShieldAlt className="text-3xl" />
        },
        {
            name: "Label EdTech France",
            description: "Reconnaissance officielle de notre innovation pédagogique",
            icon: <FaAward className="text-3xl" />
        },
        {
            name: "Partenaire UNESCO",
            description: "Collaboration pour l'éducation de qualité pour tous",
            icon: <FaGlobe className="text-3xl" />
        }
    ];

    return (
        <div className="bg-white">
            {/* Breadcrumbs */}
            <Breadcrumbs
                title="À Propos de Nous"
                description="Découvrez l'histoire, la mission et l'équipe passionnée qui révolutionne l'éducation des enfants"
                breadcrumbs={[
                    { label: "Accueil" },
                    { label: "À Propos" }
                ]}
            />

            {/* Section Mission et Vision */}
            <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center px-6 py-2 bg-indigo-100 text-indigo-600 rounded-full mb-6">
                                <RiTeamFill className="mr-2" />
                                <span className="font-medium">Notre Mission</span>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-8">
                                Révolutionner l'<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">éducation</span> de demain
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Chez <span className="font-semibold text-indigo-600">C.C. Plume Royale</span>, nous croyons que chaque enfant possède un potentiel unique qui ne demande qu'à être révélé. Notre mission est de créer des expériences d'apprentissage exceptionnelles qui éveillent la curiosité, développent la confiance et préparent les enfants à devenir les citoyens éclairés de demain.
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Nous combinons les dernières avancées en neurosciences cognitives, les meilleures pratiques pédagogiques et les technologies les plus innovantes pour offrir une éducation personnalisée, bienveillante et efficace.
                            </p>
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-2xl text-white">
                                <h3 className="text-xl font-bold mb-3">Notre Vision 2030</h3>
                                <p className="text-indigo-100">
                                    Démocratiser l'accès à une éducation de qualité mondiale et accompagner 100 000 enfants vers l'excellence académique et l'épanouissement personnel.
                                </p>
                            </div>
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
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Mission éducative"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
                            </div>

                            <motion.div
                                animate={{
                                    y: [0, -10, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg border-2 border-indigo-100"
                            >
                                <div className="text-2xl font-bold text-indigo-600">2020</div>
                                <div className="text-gray-600 text-sm">Depuis</div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Statistiques */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="relative group"
                            >
                                <div className={`absolute -inset-0.5 bg-gradient-to-br ${stat.color} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500`} />
                                <div className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
                                    <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} text-white mb-4 mx-auto`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-600">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Section Valeurs */}
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
                            Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">valeurs</span> fondamentales
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Découvrez les principes qui guident chacune de nos actions et décisions
                        </p>
                    </motion.div>

                    {/* Navigation des valeurs */}
                    <div className="flex justify-center mb-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {values.map((value, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveValue(index)}
                                    className={`p-4 rounded-xl transition-all ${activeValue === index
                                            ? `bg-gradient-to-br ${value.color} text-white shadow-lg`
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <div className="text-2xl mb-2 flex justify-center">
                                        {value.icon}
                                    </div>
                                    <div className="font-medium text-sm text-center">
                                        {value.title}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contenu de la valeur active */}
                    <motion.div
                        key={activeValue}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className={`bg-gradient-to-br ${values[activeValue].color} rounded-2xl p-8 md:p-12 text-white`}>
                            <div className="text-center mb-8">
                                <div className="inline-block mb-4">
                                    {values[activeValue].icon}
                                </div>
                                <h3 className="text-3xl font-bold mb-4">
                                    {values[activeValue].title}
                                </h3>
                                <p className="text-lg opacity-90 leading-relaxed">
                                    {values[activeValue].description}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {values[activeValue].features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white/20 rounded-lg p-4 text-center"
                                    >
                                        <span className="font-medium">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline Histoire */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">parcours</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Retracez les étapes clés de notre aventure éducative
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Ligne centrale */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>

                        <div className="space-y-16">
                            {timeline.map((event, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'
                                        }`}
                                >
                                    {/* Point sur la timeline */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg z-10">
                                        {event.icon}
                                    </div>

                                    {/* Contenu */}
                                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                                            <div className="text-2xl font-bold text-indigo-600 mb-2">
                                                {event.year}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                {event.title}
                                            </h3>
                                            <p className="text-gray-600">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

         

            {/* Section Certifications */}
            <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Certifications et <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">reconnaissances</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Notre engagement qualité reconnu par les plus hautes instances
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.05 }}
                                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all text-center group"
                            >
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white mb-4 mx-auto group-hover:scale-110 transition-transform">
                                    {cert.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    {cert.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {cert.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section CTA Rejoindre */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
                {/* Éléments décoratifs */}
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
                            <RiTeamFill className="text-6xl text-white/80" />
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Rejoignez notre aventure éducative
                        </h2>
                        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                            Nous recrutons des talents passionnés pour révolutionner l'éducation ensemble
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center"
                            >
                                <FaHandsHelping className="mr-2" />
                                Voir nos offres
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-indigo-600 transition-all"
                            >
                                Nous contacter
                            </motion.button>
                        </div>

                        {/* Stats de l'équipe */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                            className="pt-8 border-t border-white/20"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/90">
                                <div>
                                    <div className="text-3xl font-bold text-white">50+</div>
                                    <div>Experts dédiés</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white">15+</div>
                                    <div>Pays représentés</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white">24/7</div>
                                    <div>Support disponible</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;