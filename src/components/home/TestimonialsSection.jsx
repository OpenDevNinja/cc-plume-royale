import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiMessageSquare  } from "react-icons/fi";

const testimonials = [
    {
        quote: "Ma fille a augmenté ses notes de 30% en 3 mois. Les jeux éducatifs sont tellement captivants qu'elle oublie qu'elle apprend !",
        author: "Sophie Martin",
        role: "Mère de Léa, 9 ans",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        quote: "En tant qu'enseignante, je recommande cette plateforme à tous mes élèves. L'approche pédagogique est révolutionnaire.",
        author: "Émilie Dubois",
        role: "Professeure des écoles",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
        quote: "J'adore les défis mathématiques ! C'est comme jouer à Fortnite mais en apprenant des super pouvoirs en calcul.",
        author: "Lucas Petit",
        role: "Élève, 10 ans",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    }
];

const TestimonialsSection = () => {
    const ref = useRef();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

    return (
        <section ref={ref} className="relative py-28 overflow-hidden bg-[#f6f5ff]">
            {/* Éléments décoratifs animés */}
            <motion.div
                style={{ y: y1, rotate }}
                className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full opacity-20 -translate-x-32 -translate-y-32"
            />
            <motion.div
                style={{ y: y2, rotate: rotate }}
                className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100 rounded-full opacity-20 translate-x-32 translate-y-32"
            />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Ils <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">transforment</span> leur apprentissage
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Découvrez comment nos jeunes héros repoussent leurs limites
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="relative group"
                        >
                            {/* Effet de carte flottante */}
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-500" />

                            <div className="relative bg-white p-8 rounded-xl h-full shadow-lg hover:shadow-xl transition-all">
                                <FiMessageSquare  className="text-indigo-400 text-4xl mb-6 opacity-20" />
                                <p className="text-lg italic text-gray-700 mb-8">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.author}
                                        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-indigo-100"
                                    />
                                    <div>
                                        <p className="font-bold text-gray-900">{testimonial.author}</p>
                                        <p className="text-sm text-indigo-600">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;