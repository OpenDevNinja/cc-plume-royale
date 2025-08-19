import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const InteractiveDemo = () => {
    const controls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            await controls.start({
                scale: 1.05,
                transition: { duration: 0.5 }
            });
            controls.start({
                scale: 1,
                transition: { duration: 0.5 }
            });
        };

        const interval = setInterval(sequence, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-800">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">
                            <span className="text-yellow-300">Jouez</span> avec notre Démo Interactive
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8">
                            Essayez notre simulateur d'apprentissage basé sur l'IA. Votre enfant va adorer !
                        </p>
                        <button className="px-8 py-3 bg-yellow-400 text-indigo-900 rounded-full font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg">
                            Lancer la Démo
                        </button>
                    </motion.div>

                    <motion.div
                        animate={controls}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative">
                            {/* Écran du jeu */}
                            <div className="bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800">
                                <img
                                    src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                                    alt="Demo interactive"
                                    className="w-full h-auto"
                                />
                            </div>

                            {/* Effet de lumière */}
                            <motion.div
                                animate={{
                                    x: [0, 20, 0],
                                    opacity: [0.3, 0.7, 0.3]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveDemo;