import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from '../../config/routes';
import Button from '../common/Button';

const slides = [
    {
        title: "Révolutionnez l'Apprentissage",
        subtitle: "Pour les 9-10 ans",
        description: "Une plateforme qui transforme l'éducation en aventure captivante",
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1351&q=80",
        cta: "Essai Gratuit",
        overlay: "bg-gradient-to-r from-indigo-900/80 to-purple-900/80"
    },
    {
        title: "Jeux Éducatifs Magiques",
        subtitle: "Apprendre n'a jamais été aussi fun",
        description: "Nos jeux conçus par des pédagogues stimulent la curiosité naturelle",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        cta: "Voir la Démo",
        overlay: "bg-gradient-to-r from-amber-900/80 to-pink-900/80"
    },
    {
        title: "Tutorat Personnalisé",
        subtitle: "Par des experts certifiés",
        description: "Un accompagnement sur-mesure pour chaque enfant",
        image: "https://images.unsplash.com/photo-1588072432904-843af37f03ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        cta: "Réserver Maintenant",
        overlay: "bg-gradient-to-r from-emerald-900/80 to-cyan-900/80"
    }
];

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-screen max-h-[900px] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    {/* Image de fond avec effet de zoom */}
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 8, ease: "linear" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${slides[current].image})`
                        }}
                    />

                    {/* Overlay coloré */}
                    <div className={`absolute inset-0 ${slides[current].overlay}`} />

                    {/* Texture subtile */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/crissxcross.png')] opacity-10" />

                    {/* Contenu */}
                    <div className="relative h-full flex items-center">
                        <div className="container mx-auto px-6 z-10">
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="max-w-2xl text-white"
                            >
                                <motion.span
                                    className="inline-block mb-4 px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    Nouveau ✨
                                </motion.span>
                                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                                    {slides[current].title}
                                    <motion.span
                                        className="block text-3xl md:text-4xl font-light mt-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        {slides[current].subtitle}
                                    </motion.span>
                                </h1>
                                <motion.p
                                    className="text-xl mb-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    {slides[current].description}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                    className="flex flex-col sm:flex-row gap-4"
                                >
                                    <Button
                                        as={Link}
                                        to={ROUTES.REGISTER}
                                        variant="white"
                                        size="lg"
                                        className="hover:scale-105 transform transition-all"
                                    >
                                        {slides[current].cta}
                                    </Button>
                                    <Button
                                        as={Link}
                                        to={ROUTES.PRICING}
                                        variant="outline-white"
                                        size="lg"
                                        className="hover:scale-105 transform transition-all"
                                    >
                                        Voir les tarifs
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Contrôles */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === current ? 'bg-white w-8' : 'bg-white bg-opacity-50'}`}
                    />
                ))}
            </div>

            {/* Scroll indicator animé */}
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
            >
                <div className="text-white text-center">
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </motion.div>
        </div>
    );
};

export default HeroCarousel;