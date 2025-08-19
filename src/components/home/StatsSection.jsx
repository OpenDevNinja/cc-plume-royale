import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { FaChild, FaBookOpen, FaUserGraduate, FaMedal } from "react-icons/fa";

const stats = [
    { icon: FaChild, value: 2500, suffix: "+", label: "Enfants actifs", color: "from-purple-500 to-indigo-600" },
    { icon: FaBookOpen, value: 780, suffix: "+", label: "Ressources", color: "from-amber-500 to-pink-500" },
    { icon: FaUserGraduate, value: 63, label: "Tuteurs experts", color: "from-emerald-500 to-cyan-600" },
    { icon: FaMedal, value: 98, suffix: "%", label: "Satisfaction", color: "from-red-500 to-orange-500" }
];

const Counter = ({ value, suffix }) => {
    const controls = useAnimation();

    useEffect(() => {
        const startAnimation = async () => {
            await controls.start({
                opacity: 1,
                transition: { duration: 2, ease: "easeOut" }
            });
        };
        startAnimation();
    }, []);

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={controls}
            className="inline-block"
        >
            {value}
            {suffix && <span>{suffix}</span>}
        </motion.span>
    );
};

const StatsSection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="text-center p-8 rounded-xl backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all border border-white/10 hover:border-white/20"
                        >
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} mb-6 text-white text-2xl`}>
                                <stat.icon />
                            </div>
                            <h3 className="text-5xl font-bold mb-2">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </h3>
                            <p className="text-lg opacity-90">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default StatsSection;