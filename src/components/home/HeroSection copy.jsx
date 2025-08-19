import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import Button from '../../components/common/Button';

const slides = [
    {
        title: "Apprentissage Interactif",
        subtitle: "Pour les 9-10 ans",
        description: "Une plateforme éducative complète avec ressources, jeux et tutorat pour accompagner votre enfant.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        ctaPrimary: "Essai gratuit",
        ctaSecondary: "Voir les tarifs"
    },
    {
        title: "Jeux Éducatifs",
        subtitle: "Apprendre en s'amusant",
        description: "Nos jeux interactifs stimulent la curiosité et renforcent les apprentissages scolaires.",
        image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        ctaPrimary: "Découvrir",
        ctaSecondary: "Voir démo"
    },
    {
        title: "Tutorat en Ligne",
        subtitle: "Aide personnalisée",
        description: "Des tuteurs qualifiés pour accompagner votre enfant dans son parcours d'apprentissage.",
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        ctaPrimary: "Réserver",
        ctaSecondary: "En savoir plus"
    }
];

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState('right');

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection('right');
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index) => {
        setDirection(index > currentSlide ? 'right' : 'left');
        setCurrentSlide(index);
    };

    return (
        <div className="relative h-screen max-h-[800px] overflow-hidden">
            {/* Slides */}
            <div className="relative h-full w-full">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            transform: `translateX(${index === currentSlide ? 0 : direction === 'right' ? '100%' : '-100%'})`,
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="relative h-full flex items-center">
                            <div className="container mx-auto px-6 z-10">
                                <div className={`max-w-2xl transform transition-all duration-700 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                                        {slide.title}
                                        <span className="block text-primary-200">{slide.subtitle}</span>
                                    </h1>
                                    <p className="text-xl text-primary-100 mb-8">{slide.description}</p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button
                                            as={Link}
                                            to={ROUTES.REGISTER}
                                            variant="white"
                                            size="lg"
                                            className="animate-bounce-slow"
                                        >
                                            {slide.ctaPrimary}
                                        </Button>
                                        <Button
                                            as={Link}
                                            to={ROUTES.PRICING}
                                            variant="outline-white"
                                            size="lg"
                                        >
                                            {slide.ctaSecondary}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Indicators */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Animated scroll indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>
    );
};

export default HeroSection;