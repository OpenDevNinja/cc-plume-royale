import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const CTASection = () => {
    const controls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            await controls.start({
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                transition: { duration: 15, repeat: Infinity, ease: "linear" }
            });
        };
        sequence();
    }, []);

    return (
        <section className="relative py-28 overflow-hidden">
            {/* Fond animé */}
            <motion.div
                animate={controls}
                style={{
                    background: "linear-gradient(270deg, #4f46e5, #7c3aed, #d946ef, #ec4899, #f59e0b, #4f46e5)",
                    backgroundSize: "600% 600%"
                }}
                className="absolute inset-0"
            />

            {/* Texture subtile */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/crissxcross.png')] opacity-10" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Prêt pour <span className="text-yellow-300">l'aventure</span> éducative ?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Rejoignez des milliers de parents qui révolutionnent l'apprentissage de leur enfant.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-indigo-900 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                            Essai gratuit 7 jours
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:bg-opacity-10 transition-all"
                        >
                            Voir démo vidéo
                        </motion.button>
                    </div>

                    {/* Élément décoratif animé */}
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;