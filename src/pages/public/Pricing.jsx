import { motion } from 'framer-motion';
import { FaCheck, FaHome, FaChevronRight, FaStar, FaUsers, FaGamepad, FaBookOpen, FaChalkboardTeacher, FaCrown, FaHeadset, FaTrophy, FaGift, FaQuestionCircle, FaCalculator, FaShieldAlt, FaRocket } from 'react-icons/fa';
import { useState } from 'react';

// Composant Breadcrumbs intégré
const Breadcrumbs = ({ title, description, breadcrumbs = [] }) => (
    <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
            <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
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

const PricingPage = () => {
    const [isAnnual, setIsAnnual] = useState(false);
    const [activeFaq, setActiveFaq] = useState(0);

    const plans = [
        {
            name: 'Explorateur',
            subtitle: 'Parfait pour découvrir',
            price: { monthly: 0, annual: 0 },
            description: 'Accès limité pour tester notre plateforme',
            features: [
                '5 jeux éducatifs par mois',
                '1 quiz par semaine',
                'Suivi de progression basique',
                'Accès communauté parents',
                'Support par email'
            ],
            limitations: [
                'Pas de contenu premium',
                'Pas de tutorat individuel',
                'Rapports limités'
            ],
            cta: 'Commencer gratuitement',
            featured: false,
            color: 'from-gray-400 to-gray-600',
            icon: <FaRocket className="text-3xl" />,
            badge: null
        },
        {
            name: 'Aventurier',
            subtitle: 'Le choix des familles',
            price: { monthly: 19, annual: 15 },
            originalPrice: { monthly: 25, annual: 20 },
            description: 'Accès complet à tout notre univers éducatif',
            features: [
                'Jeux éducatifs illimités',
                'Quiz et évaluations illimitées',
                'Suivi détaillé des progrès',
                'Rapports parentaux hebdomadaires',
                '2 séances de tutorat/mois',
                'Accès prioritaire aux nouveautés',
                'Certificats de réussite',
                'Support prioritaire 24/7'
            ],
            limitations: [],
            cta: 'Choisir Aventurier',
            featured: true,
            color: 'from-indigo-500 to-purple-600',
            icon: <FaTrophy className="text-3xl" />,
            badge: 'Plus populaire',
            savings: isAnnual ? '21%' : '24%'
        },
        {
            name: 'Expert Royal',
            subtitle: 'L\'excellence absolue',
            price: { monthly: 39, annual: 29 },
            originalPrice: { monthly: 49, annual: 39 },
            description: 'Accompagnement VIP et contenu exclusif',
            features: [
                'Tout du plan Aventurier',
                'Tutorat illimité (sur RDV)',
                'Séances individuelles avec experts',
                'Contenu exclusif premium',
                'Accès anticipé (3 mois)',
                'Coaching parental mensuel',
                'Rapports détaillés quotidiens',
                'Support VIP dédié',
                'Accès à la masterclass mensuelle',
                'Kit éducatif physique offert'
            ],
            limitations: [],
            cta: 'Devenir Expert Royal',
            featured: false,
            color: 'from-amber-500 to-orange-600',
            icon: <FaCrown className="text-3xl" />,
            badge: 'Premium',
            savings: isAnnual ? '26%' : '20%'
        }
    ];

    const features = [
        {
            category: "Contenu Éducatif",
            items: [
                { name: "Jeux éducatifs", free: "5/mois", standard: "Illimité", premium: "Illimité + Exclusifs" },
                { name: "Quiz et évaluations", free: "1/semaine", standard: "Illimité", premium: "Illimité + Personnalisés" },
                { name: "Vidéos interactives", free: "✗", standard: "✓", premium: "✓ + 4K" },
                { name: "Contenu premium", free: "✗", standard: "✓", premium: "✓ + Exclusif" }
            ]
        },
        {
            category: "Suivi & Analyse",
            items: [
                { name: "Rapports de progression", free: "Basique", standard: "Détaillé", premium: "Temps réel" },
                { name: "Analyses prédictives", free: "✗", standard: "✓", premium: "✓ + IA avancée" },
                { name: "Recommandations IA", free: "✗", standard: "✓", premium: "✓ + Personnalisées" }
            ]
        },
        {
            category: "Support & Accompagnement",
            items: [
                { name: "Support technique", free: "Email", standard: "Chat + Email", premium: "VIP dédié 24/7" },
                { name: "Tutorat individuel", free: "✗", standard: "2 séances/mois", premium: "Illimité" },
                { name: "Coaching parental", free: "✗", standard: "✗", premium: "Mensuel" }
            ]
        }
    ];

    const testimonials = [
        {
            name: "Marie Dubois",
            plan: "Aventurier",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616c4b36159?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "Le rapport qualité-prix est exceptionnel. Mon fils adore les jeux et progresse rapidement !",
            rating: 5,
            savings: "156€/an économisés"
        },
        {
            name: "Pierre Martin",
            plan: "Expert Royal",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "L'accompagnement VIP fait toute la différence. Les séances individuelles sont fantastiques.",
            rating: 5,
            savings: "240€/an économisés"
        },
        {
            name: "Sophie Chen",
            plan: "Aventurier",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "Parfait pour notre famille ! Les enfants apprennent en s'amusant et nous sommes rassurés.",
            rating: 5,
            savings: "96€/an économisés"
        }
    ];

    const faqs = [
        {
            question: "Puis-je changer de plan à tout moment ?",
            answer: "Oui, absolument ! Vous pouvez upgrader ou downgrader votre plan à tout moment depuis votre tableau de bord. Les changements prennent effet immédiatement pour les upgrades, et à la prochaine période de facturation pour les downgrades."
        },
        {
            question: "Y a-t-il des frais cachés ?",
            answer: "Aucun frais caché ! Le prix affiché est le prix final. Nous incluons même la TVA dans nos tarifs pour une transparence totale."
        },
        {
            question: "Que se passe-t-il si je ne suis pas satisfait ?",
            answer: "Nous offrons une garantie satisfait ou remboursé de 30 jours sans condition. Si vous n'êtes pas entièrement satisfait, nous vous remboursons intégralement."
        },
        {
            question: "Les contenus sont-ils vraiment adaptés aux 9-10 ans ?",
            answer: "Absolument ! Tous nos contenus sont créés par des pédagogues experts et testés avec de vrais enfants de 9-10 ans. Notre IA adapte automatiquement la difficulté au niveau de chaque enfant."
        },
        {
            question: "Puis-je utiliser mon abonnement pour plusieurs enfants ?",
            answer: "Oui ! Un seul abonnement permet de créer jusqu'à 3 profils enfants. Pour plus d'enfants, nous proposons des tarifs familiaux avantageux."
        },
        {
            question: "Comment fonctionne la période d'essai gratuite ?",
            answer: "Tous les plans payants incluent 7 jours d'essai gratuit. Vous avez accès à toutes les fonctionnalités pendant cette période, sans engagement."
        }
    ];

    const calculateSavings = (monthlyPrice, annualPrice) => {
        const yearlyCost = monthlyPrice * 12;
        const actualAnnualCost = annualPrice * 12;
        return yearlyCost - actualAnnualCost;
    };

    return (
        <div className="bg-white">
            {/* Breadcrumbs */}
            <Breadcrumbs
                title="Nos Tarifs"
                description="Choisissez la formule qui correspond parfaitement aux besoins éducatifs de votre enfant"
                breadcrumbs={[
                    { label: "Accueil" },
                    { label: "Tarifs" }
                ]}
            />

            {/* Toggle Mensuel/Annuel */}
            <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center bg-white p-2 rounded-xl shadow-lg">
                            <button
                                onClick={() => setIsAnnual(false)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all ${!isAnnual
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Mensuel
                            </button>
                            <button
                                onClick={() => setIsAnnual(true)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all relative ${isAnnual
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Annuel
                                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                                    -20%
                                </span>
                            </button>
                        </div>
                        <p className="text-gray-600 mt-4">
                            {isAnnual ? "💰 Économisez jusqu'à 20% avec l'abonnement annuel" : "🔄 Facturation mensuelle, résiliable à tout moment"}
                        </p>
                    </motion.div>

                    {/* Plans de tarification */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
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
                                        className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-75"
                                    />
                                )}

                                <div className={`relative h-full bg-white rounded-2xl shadow-xl overflow-hidden ${plan.featured ? 'ring-2 ring-indigo-500' : ''
                                    }`}>
                                    {/* Header avec badge */}
                                    <div className={`bg-gradient-to-br ${plan.color} p-8 text-white relative overflow-hidden`}>
                                        {plan.badge && (
                                            <div className="absolute top-4 right-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                                                    <FaTrophy className="mr-1" /> {plan.badge}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                                                {plan.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold">{plan.name}</h3>
                                                <p className="text-white/80">{plan.subtitle}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-baseline">
                                                <span className="text-4xl font-bold">
                                                    {plan.price[isAnnual ? 'annual' : 'monthly'] === 0
                                                        ? 'Gratuit'
                                                        : `€${plan.price[isAnnual ? 'annual' : 'monthly']}`}
                                                </span>
                                                {plan.price[isAnnual ? 'annual' : 'monthly'] > 0 && (
                                                    <span className="text-white/80 ml-2">
                                                        /{isAnnual ? 'mois' : 'mois'}
                                                    </span>
                                                )}
                                            </div>
                                            {plan.originalPrice && (
                                                <div className="flex items-center mt-2">
                                                    <span className="text-white/60 line-through text-lg mr-2">
                                                        €{plan.originalPrice[isAnnual ? 'annual' : 'monthly']}
                                                    </span>
                                                    {plan.savings && (
                                                        <span className="bg-white/20 text-white px-2 py-1 rounded text-sm font-medium">
                                                            -{plan.savings} économie
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            {isAnnual && plan.price.annual > 0 && (
                                                <p className="text-white/80 text-sm mt-2">
                                                    Soit €{(plan.price.annual * 12).toFixed(0)}/an -
                                                    <span className="font-bold text-green-200">
                                                        {' '}Économie de €{calculateSavings(plan.price.monthly, plan.price.annual)}
                                                    </span>
                                                </p>
                                            )}
                                        </div>

                                        <p className="text-white/90 text-sm">{plan.description}</p>
                                    </div>

                                    {/* Contenu */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <ul className="space-y-3 mb-8 flex-1">
                                            {plan.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start">
                                                    <FaCheck className="flex-shrink-0 h-5 w-5 text-green-500 mt-1" />
                                                    <span className="ml-3 text-gray-700">{feature}</span>
                                                </li>
                                            ))}
                                            {plan.limitations.map((limitation, limitIndex) => (
                                                <li key={limitIndex} className="flex items-start">
                                                    <span className="flex-shrink-0 h-5 w-5 text-gray-300 mt-1">✗</span>
                                                    <span className="ml-3 text-gray-400">{limitation}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full py-4 rounded-xl font-bold transition-all ${plan.featured
                                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                                                    : plan.name === 'Explorateur'
                                                        ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl'
                                                }`}
                                        >
                                            {plan.cta}
                                        </motion.button>

                                        {plan.price.monthly > 0 && (
                                            <p className="text-center text-gray-500 text-sm mt-4">
                                                ✨ Essai gratuit de 7 jours
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

          

            {/* Témoignages clients */}
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
                            Ils ont fait le <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">bon choix</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Découvrez pourquoi des milliers de familles nous font confiance
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
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
                            >
                                <div className="flex items-center mb-6">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                        <div className="flex items-center">
                                            <span className="text-indigo-600 text-sm font-medium mr-2">
                                                Plan {testimonial.plan}
                                            </span>
                                            <div className="flex text-yellow-400">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <FaStar key={i} className="w-4 h-4" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                                <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
                                    💰 {testimonial.savings}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

           
            {/* FAQ */}
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
                            Questions <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">fréquentes</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Toutes les réponses à vos questions sur nos tarifs et abonnements
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="mb-4"
                            >
                                <button
                                    onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                                    className="w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-left flex items-center justify-between"
                                >
                                    <span className="font-semibold text-gray-900 pr-4">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: activeFaq === index ? 45 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FaQuestionCircle className="text-indigo-600 text-xl flex-shrink-0" />
                                    </motion.div>
                                </button>

                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: activeFaq === index ? 'auto' : 0,
                                        opacity: activeFaq === index ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-indigo-50 rounded-b-xl p-6 -mt-2">
                                        <p className="text-gray-700 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Prêt à commencer l'aventure ?
                        </h2>
                        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                            Rejoignez des milliers de familles qui ont choisi l'excellence éducative pour leurs enfants
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center"
                            >
                                <FaRocket className="mr-2" />
                                Essai gratuit 7 jours
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-indigo-600 transition-all"
                            >
                                Voir une démo
                            </motion.button>
                        </div>

                        {/* Garanties */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                            className="pt-8 border-t border-white/20"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
                                <div className="flex items-center justify-center">
                                    <FaShieldAlt className="text-2xl mr-3" />
                                    <span>Garantie 30 jours</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <FaHeadset className="text-2xl mr-3" />
                                    <span>Support 24/7</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <FaGift className="text-2xl mr-3" />
                                    <span>Essai gratuit inclus</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default PricingPage;