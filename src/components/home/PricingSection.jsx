import { motion } from "framer-motion";
import { FiCheck, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ROUTES } from '../../config/routes';
import Button from '../common/Button';

const plans = [
    {
        name: 'Explorateur',
        price: 0,
        description: 'Découverte gratuite',
        features: [
            '5 ressources/mois',
            '1 quiz/mois',
            'Jeux éducatifs',
            'Suivi de base'
        ],
        cta: 'Commencer',
        featured: false,
        color: 'from-gray-100 to-gray-200'
    },
    {
        name: 'Aventurier',
        price: 12,
        description: 'Abonnement complet',
        features: [
            'Ressources illimitées',
            'Quiz illimités',
            '10% réduction',
            '1 tutorat/mois',
            'Suivi détaillé'
        ],
        cta: 'Souscrire',
        featured: true,
        color: 'from-indigo-100 to-purple-200'
    },
    {
        name: 'Expert',
        price: 120,
        description: 'Tout inclus (économisez 20%)',
        features: [
            'Tout dans Aventurier',
            '3 tutorats/mois',
            '20% réduction',
            'Accès anticipé',
            'Support VIP'
        ],
        cta: 'Souscrire',
        featured: false,
        color: 'from-amber-100 to-pink-200'
    }
];

const PricingSection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-primary-50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Des <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">tarifs</span> adaptés
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choisissez la formule qui correspond aux besoins de votre enfant
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className={`relative group ${plan.featured ? 'lg:-mt-4' : ''}`}
                        >
                            {plan.featured && (
                                <motion.div
                                    animate={{
                                        opacity: [0.6, 1, 0.6],
                                        scale: [1, 1.02, 1]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-75"
                                />
                            )}

                            <div className={`relative h-full bg-gradient-to-br ${plan.color} p-1 rounded-xl shadow-lg`}>
                                <div className="bg-white p-8 rounded-lg h-full flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                            <p className="text-gray-600">{plan.description}</p>
                                        </div>
                                        {plan.featured && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                                <FiZap className="mr-1" /> Populaire
                                            </span>
                                        )}
                                    </div>

                                    <div className="mb-8">
                                        <span className="text-5xl font-bold text-gray-900">
                                            {plan.price === 0 ? 'Gratuit' : `€${plan.price}`}
                                        </span>
                                        {plan.price > 0 && (
                                            <span className="text-lg text-gray-500">
                                                {plan.price === 12 ? '/mois' : '/an'}
                                            </span>
                                        )}
                                    </div>

                                    <ul className="space-y-3 mb-8 flex-grow">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start">
                                                <FiCheck className="flex-shrink-0 h-5 w-5 text-green-500 mt-1" />
                                                <span className="ml-3 text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        as={Link}
                                        to={ROUTES.REGISTER}
                                        variant={plan.featured ? 'primary' : 'outline'}
                                        size="lg"
                                        className="mt-auto w-full"
                                    >
                                        {plan.cta}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 max-w-3xl mx-auto border border-indigo-100"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Vous êtes une école ou un groupe ?
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Bénéficiez de tarifs spéciaux et d'un accompagnement sur-mesure.
                    </p>
                    <Button
                        as={Link}
                        to={ROUTES.CONTACT}
                        variant="outline"
                        className="hover:scale-105 transform transition-all"
                    >
                        Contactez notre équipe
                    </Button>
                </motion.div> */}
            </div>
        </section>
    );
};

export default PricingSection;