import { motion } from 'framer-motion';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const Helmet = ({
    title,
    description,
    backgroundImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    breadcrumbs = []
}) => {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Image de fond avec overlay */}
            <div className="absolute inset-0">
                <img
                    src={backgroundImage}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/70 to-indigo-900/80" />
            </div>

            {/* Éléments décoratifs animés */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
            />
            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-20 right-10 w-40 h-40 bg-purple-300/20 rounded-full blur-xl"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Breadcrumb Navigation */}
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
                                {crumb.href ? (
                                    <button className="text-white/80 hover:text-white transition-colors font-medium">
                                        {crumb.label}
                                    </button>
                                ) : (
                                    <span className="text-white font-medium">
                                        {crumb.label}
                                    </span>
                                )}
                            </motion.div>
                        ))}
                    </motion.nav>

                    {/* Titre principal */}
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

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
                    >
                        {description}
                    </motion.p>

                    {/* Indicateur de scroll */}
                    <motion.div
                        animate={{
                            y: [0, 10, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    >
                        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Exemple d'utilisation
// const ExampleUsage = () => {
//     return (
//         <Breadcrumbs
//             title="Académie Famille"
//             description="Découvrez notre espace dédié aux parents pour accompagner au mieux l'éducation de votre enfant"
//             breadcrumbs={[
//                 { label: "Accueil", href: "/" },
//                 { label: "Académie Famille" }
//             ]}
//         />
//     );
// };

 export default Helmet;