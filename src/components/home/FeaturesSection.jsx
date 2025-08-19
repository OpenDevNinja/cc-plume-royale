import { motion } from "framer-motion";
import { FaRobot, FaGamepad, FaChalkboardTeacher, FaBrain, FaBook } from "react-icons/fa";

const features = [
    {
        icon: FaRobot,
        title: "Révolutionnez l'Apprentissage",
        description: "Une plateforme qui transforme l'éducation en aventure captivante",
        color: "bg-gradient-to-br from-purple-500 to-indigo-600"
    },
    {
        icon: FaGamepad,
        title: "Jeux Éducatifs Magiques",
        description: "Nos jeux conçus par des pédagogues stimulent la curiosité naturelle",
        color: "bg-gradient-to-br from-amber-500 to-pink-500"
    },
    {
        icon: FaChalkboardTeacher,
        title: "Tutorat Personnalisé",
        description: "Un accompagnement sur-mesure pour chaque enfant",
        color: "bg-gradient-to-br from-emerald-500 to-cyan-600"
    },
    {
        icon: FaBook,
        title: "Cahiers & livres éducatifs",
        description: "Des ressources pour aider vos enfants à progresser",
        color: "bg-gradient-to-br from-red-500 to-orange-500"
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-20 bg-[#f9f9ff]">
            <div className="container mx-auto px-6">
                {/* Titre animé */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <span className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">
                        La Révolution Éducative
                    </span>
                    <h2 className="mt-2 text-4xl font-bold text-gray-900">
                        Une Expérience <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Magique</span>
                    </h2>
                </motion.div>

                {/* Grille de cartes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -15 }}
                            className="relative group"
                        >
                            {/* Effet de lumière */}
                            <div className={`absolute -inset-0.5 ${feature.color} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500`} />

                            <div className="relative bg-white p-8 rounded-xl h-full flex flex-col items-center text-center hover:shadow-2xl transition-all">
                                <div className={`${feature.color} p-4 rounded-full text-white mb-6`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;