import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaUserGraduate, FaHandsHelping, FaChartLine, FaUsers, FaHome, FaChevronRight, FaVideo, FaBookOpen, FaCertificate, FaLightbulb, FaCalendarAlt, FaDownload, FaStar, FaPlay, FaArrowRight } from 'react-icons/fa';
import { RiParentFill, RiTeamFill } from 'react-icons/ri';
import { useState } from 'react';

// Composant Breadcrumbs intégré
const Breadcrumbs = ({ title, description, breadcrumbs = [] }) => (
    <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
            <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
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

const FamilyAcademyPage = () => {
    const [activeTab, setActiveTab] = useState('resources');

    const stats = [
        {
            value: "2000+",
            label: "Parents actifs",
            icon: <FaUsers className="text-4xl" />,
            color: "from-purple-500 to-indigo-500"
        },
        {
            value: "150+",
            label: "Ateliers disponibles",
            icon: <FaChalkboardTeacher className="text-4xl" />,
            color: "from-amber-500 to-orange-500"
        },
        {
            value: "98%",
            label: "Satisfaction",
            icon: <FaStar className="text-4xl" />,
            color: "from-emerald-500 to-teal-500"
        }
    ];

    const workshops = [
        {
            title: "Accompagner les devoirs sans stress",
            instructor: "Dr. Marie Dupont",
            date: "25 Août 2025",
            duration: "1h30",
            level: "Débutant",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            tags: ["Motivation", "Organisation"]
        },
        {
            title: "Gérer les écrans en famille",
            instructor: "Prof. Jean Martin",
            date: "28 Août 2025",
            duration: "2h",
            level: "Intermédiaire",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            tags: ["Numérique", "Équilibre"]
        },
        {
            title: "Développer la confiance en soi",
            instructor: "Sophie Leroy",
            date: "2 Septembre 2025",
            duration: "1h",
            level: "Tous niveaux",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            tags: ["Psychologie", "Estime"]
        }
    ];

    const resources = [
        {
            title: "Guide de l'apprentissage à la maison",
            type: "PDF",
            pages: "24 pages",
            downloads: "1.2k",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        },
        {
            title: "Checklist organisation quotidienne",
            type: "PDF",
            pages: "8 pages",
            downloads: "890",
            image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        },
        {
            title: "Activités créatives famille",
            type: "PDF",
            pages: "16 pages",
            downloads: "2.1k",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        }
    ];

    const testimonials = [
        {
            name: "Catherine M.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616c4b36159?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "Grâce aux ateliers, j'ai appris à mieux accompagner ma fille dans ses devoirs. Nos soirées sont maintenant plus sereines.",
            rating: 5
        },
        {
            name: "Pierre L.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "La communauté est formidable ! On partage nos expériences et on trouve toujours de bons conseils.",
            rating: 5
        },
        {
            name: "Amélie D.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "Les rapports de progrès m'aident à suivre l'évolution de mon fils et à adapter mon accompagnement.",
            rating: 5
        }
    ];

    return (
        <div className="bg-white">
            {/* Breadcrumbs */}
            <Breadcrumbs
                title="Académie Famille Royale"
                description="L'espace privilégié pour les parents qui veulent s'impliquer activement dans l'éducation de leur enfant"
                breadcrumbs={[
                    { label: "Accueil" },
                    { label: "Académie Famille" }
                ]}
            />

            {/* Section Statistiques */}
            <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
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
                                whileHover={{ y: -10 }}
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

            {/* Section Navigation par onglets */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center mb-12">
                        <div className="bg-gray-100 p-2 rounded-xl flex">
                            {[
                                { id: 'resources', label: 'Ressources', icon: <FaBookOpen /> },
                                { id: 'workshops', label: 'Ateliers', icon: <FaChalkboardTeacher /> },
                                { id: 'community', label: 'Communauté', icon: <FaUsers /> }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id
                                            ? 'bg-white text-indigo-600 shadow-md'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contenu des onglets */}
                    {activeTab === 'resources' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                                Ressources <span className="text-indigo-600">Exclusives</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {resources.map((resource, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -10 }}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden group"
                                    >
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={resource.image}
                                                alt={resource.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                                                {resource.title}
                                            </h4>
                                            <div className="flex justify-between text-gray-600 mb-4">
                                                <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-sm">
                                                    {resource.type}
                                                </span>
                                                <span>{resource.pages}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">
                                                    <FaDownload className="inline mr-1" />
                                                    {resource.downloads} téléchargements
                                                </span>
                                                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                                    Télécharger
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'workshops' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                                Ateliers <span className="text-indigo-600">à Venir</span>
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                                {workshops.map((workshop, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -10 }}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                                    >
                                        <div className="h-48 relative overflow-hidden">
                                            <img
                                                src={workshop.image}
                                                alt={workshop.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    {workshop.level}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-xl font-bold text-gray-900 mb-3">
                                                {workshop.title}
                                            </h4>
                                            <p className="text-gray-600 mb-3">
                                                Par {workshop.instructor}
                                            </p>
                                            <div className="flex items-center text-gray-500 mb-4 space-x-4">
                                                <span className="flex items-center">
                                                    <FaCalendarAlt className="mr-1" />
                                                    {workshop.date}
                                                </span>
                                                <span>{workshop.duration}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {workshop.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <button className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center">
                                                <FaPlay className="mr-2" />
                                                S'inscrire
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'community' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                                Communauté <span className="text-indigo-600">Parentale</span>
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-6">
                                        Échangez avec d'autres parents
                                    </h4>
                                    <ul className="space-y-4 mb-8">
                                        {[
                                            "Forum privé et sécurisé",
                                            "Groupes par âge et centre d'intérêt",
                                            "Sessions Q&A avec nos experts",
                                            "Partage d'expériences et conseils",
                                            "Événements familiaux exclusifs"
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="flex-shrink-0 mt-1 mr-4 text-indigo-500 bg-indigo-100 p-2 rounded-full">
                                                    <FaUsers className="w-3 h-3" />
                                                </span>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105 flex items-center">
                                        Rejoindre la communauté
                                        <FaArrowRight className="ml-2" />
                                    </button>
                                </div>
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                        alt="Communauté parents"
                                        className="rounded-2xl shadow-2xl"
                                    />
                                    <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border-2 border-indigo-100">
                                        <div className="text-3xl font-bold text-indigo-600">5000+</div>
                                        <div className="text-gray-600 text-sm">membres actifs</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Section Témoignages */}
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
                            Ce que disent <span className="text-indigo-600">nos parents</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Découvrez les témoignages de parents qui ont transformé leur approche éducative
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
                            >
                                <div className="flex items-center mb-6">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                        <div className="flex text-yellow-400">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <FaStar key={i} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">"{testimonial.text}"</p>
                            </motion.div>
                        ))}
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
                            Prêt à rejoindre l'Académie Famille ?
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Donnez-vous les meilleurs outils pour accompagner votre enfant vers la réussite
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg">
                                Commencer gratuitement
                            </button>
                            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-indigo-600 transition-all transform hover:scale-105">
                                En savoir plus
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default FamilyAcademyPage;