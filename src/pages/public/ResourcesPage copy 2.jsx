import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import {
    FaHome, FaChevronRight, FaSearch, FaFilter, FaStar, FaDownload, FaEye,
    FaShoppingCart, FaBookOpen, FaFileDownload, FaPlay, FaHeart, FaShare,
    FaSort, FaList, FaTimes, FaCheck, FaArrowRight, FaLock,
    FaBox, FaGift
} from 'react-icons/fa';
import { BsGrid3X3Gap } from "react-icons/bs";
import { resourcesData, searchUtils } from '../../data/resources_data';
import ResourcePreviewModal from './ResourcePreviewModal.jsx'

// Composant Breadcrumbs
const Breadcrumbs = ({ title, description, breadcrumbs = [] }) => (
    <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
            <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt=""
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-indigo-900/70 to-purple-900/80" />
        </div>

        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
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

// Composant de recherche
const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => (
    <div className="relative max-w-2xl mx-auto mb-8">
        <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="Rechercher par titre, matière, niveau, mot-clé..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    onSearch(e.target.value);
                }}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            />
        </div>
    </div>
);

// Composant de filtres
const FilterPanel = ({ filters, setFilters, showFilters, setShowFilters }) => {
    const resetFilters = () => {
        setFilters({
            subject: '',
            level: '',
            difficulty: '',
            type: '',
            format: '',
            priceRange: null,
            search: ''
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
                opacity: showFilters ? 1 : 0,
                height: showFilters ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 rounded-xl overflow-hidden mb-8"
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Filtres de recherche</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Réinitialiser
                        </button>
                        <button
                            onClick={() => setShowFilters(false)}
                            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Matière */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Matière
                        </label>
                        <select
                            value={filters.subject}
                            onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Toutes les matières</option>
                            {resourcesData.subjects.map(subject => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.icon} {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Niveau */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Niveau
                        </label>
                        <select
                            value={filters.level}
                            onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Tous les niveaux</option>
                            {resourcesData.levels.map(level => (
                                <option key={level.id} value={level.id}>
                                    {level.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulté */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Difficulté
                        </label>
                        <select
                            value={filters.difficulty}
                            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Toutes les difficultés</option>
                            {resourcesData.difficulties.map(difficulty => (
                                <option key={difficulty.id} value={difficulty.id}>
                                    {difficulty.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type de ressource
                        </label>
                        <select
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Tous les types</option>
                            {resourcesData.types.map(type => (
                                <option key={type.id} value={type.id}>
                                    {type.icon} {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Format */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Format
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="format"
                                    value=""
                                    checked={filters.format === ''}
                                    onChange={(e) => setFilters({ ...filters, format: e.target.value })}
                                    className="mr-2"
                                />
                                Tous
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="format"
                                    value="digital"
                                    checked={filters.format === 'digital'}
                                    onChange={(e) => setFilters({ ...filters, format: e.target.value })}
                                    className="mr-2"
                                />
                                Numérique uniquement
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="format"
                                    value="physical"
                                    checked={filters.format === 'physical'}
                                    onChange={(e) => setFilters({ ...filters, format: e.target.value })}
                                    className="mr-2"
                                />
                                Physique disponible
                            </label>
                        </div>
                    </div>

                    {/* Plage de prix */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Prix maximum
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="30"
                            step="0.5"
                            value={filters.priceRange ? filters.priceRange[1] : 30}
                            onChange={(e) => setFilters({
                                ...filters,
                                priceRange: [0, parseFloat(e.target.value)]
                            })}
                            className="w-full"
                        />
                        <div className="text-sm text-gray-600 mt-1">
                            Jusqu'à {filters.priceRange ? filters.priceRange[1] : 30}€
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Composant de tri et affichage
const SortAndViewControls = ({
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters,
    resultsCount
}) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
            <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${showFilters
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
            >
                <FaFilter className="mr-2" />
                Filtres
            </button>

            <span className="text-gray-600">
                {resultsCount} ressource{resultsCount !== 1 ? 's' : ''} trouvée{resultsCount !== 1 ? 's' : ''}
            </span>
        </div>

        <div className="flex items-center gap-4">
            {/* Tri */}
            <div className="flex items-center gap-2">
                <FaSort className="text-gray-400" />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                    <option value="newest">Plus récent</option>
                    <option value="popular">Plus populaire</option>
                    <option value="rating">Mieux noté</option>
                    <option value="price_asc">Prix croissant</option>
                    <option value="price_desc">Prix décroissant</option>
                    <option value="title">Alphabétique</option>
                </select>
            </div>

            {/* Mode d'affichage */}
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <BsGrid3X3Gap />
                </button>
                <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <FaList />
                </button>
            </div>
        </div>
    </div>
);

// Composant carte de ressource
const ResourceCard = ({ resource, viewMode, onPreview }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const subject = resourcesData.subjects.find(s => s.id === resource.subject);
    const difficulty = resourcesData.difficulties.find(d => d.id === resource.difficulty);
    const type = resourcesData.types.find(t => t.id === resource.type);

    if (viewMode === 'list') {
        return (
            <motion.div
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex"
            >
                <div className="w-48 h-32 flex-shrink-0">
                    <img
                        src={resource.image}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {resource.title}
                            </h3>
                            <p className="text-gray-600 mb-2 line-clamp-2">
                                {resource.description}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className={`p-2 rounded-full transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                                }`}
                        >
                            <FaHeart className={isWishlisted ? 'fill-current' : ''} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <span className={`px-2 py-1 rounded text-sm ${subject?.color} text-white`}>
                            {subject?.icon} {subject?.name}
                        </span>
                        <span className={`px-2 py-1 rounded text-sm ${difficulty?.color}`}>
                            {difficulty?.name}
                        </span>
                        <span className="text-gray-500 text-sm">
                            {type?.icon} {type?.name}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <div className="flex text-yellow-400 mr-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < Math.floor(resource.rating) ? '' : 'text-gray-300'} />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {resource.rating} ({resource.reviewsCount})
                                </span>
                            </div>
                            <span className="text-sm text-gray-600">
                                <FaDownload className="inline mr-1" />
                                {resource.downloadCount}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            {resource.originalPrice && (
                                <span className="text-gray-400 line-through">
                                    {resource.originalPrice}€
                                </span>
                            )}
                            <span className="text-2xl font-bold text-purple-600">
                                {resource.price}€
                            </span>

                            <div className="flex gap-2">
                                {resource.preview && (
                                    <button
                                        onClick={() => onPreview(resource)}
                                        className="px-3 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center"
                                    >
                                        <FaEye className="mr-1" />
                                        Aperçu
                                    </button>
                                )}
                                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                                    <FaShoppingCart className="mr-2" />
                                    Acheter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden group"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${difficulty?.color}`}>
                        {difficulty?.name}
                    </span>
                    {resource.isPhysical && (
                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-medium">
                            <FaBox className="inline mr-1" />
                            Physique
                        </span>
                    )}
                </div>

                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`absolute top-4 right-4 p-2 rounded-full bg-white/90 transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                        }`}
                >
                    <FaHeart className={isWishlisted ? 'fill-current' : ''} />
                </button>

                {resource.originalPrice && (
                    <div className="absolute top-4 right-16 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{Math.round((1 - resource.price / resource.originalPrice) * 100)}%
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs text-white ${subject?.color}`}>
                        {subject?.icon} {subject?.name}
                    </span>
                    <span className="text-xs text-gray-500">
                        {type?.icon} {type?.name}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {resource.title}
                </h3>

                <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                    {resource.description}
                </p>

                <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                    <span>Par {resource.author}</span>
                    <span>{resource.pages} pages</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < Math.floor(resource.rating) ? '' : 'text-gray-300'} />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">
                            {resource.rating} ({resource.reviewsCount})
                        </span>
                    </div>
                    <span className="text-xs text-gray-500">
                        <FaDownload className="inline mr-1" />
                        {resource.downloadCount}
                    </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                    {resource.originalPrice ? (
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 line-through text-sm">
                                {resource.originalPrice}€
                            </span>
                            <span className="text-xl font-bold text-purple-600">
                                {resource.price}€
                            </span>
                        </div>
                    ) : (
                        <span className="text-xl font-bold text-purple-600">
                            {resource.price}€
                        </span>
                    )}
                </div>

                <div className="space-y-2">
                    {resource.preview && (
                        <button
                            onClick={() => onPreview(resource)}
                            className="w-full px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center"
                        >
                            <FaEye className="mr-2" />
                            Aperçu gratuit
                        </button>
                    )}
                   
                </div>
            </div>
        </motion.div>
    );
};

// Composant principal
const ResourcesPage = () => {
    const [filters, setFilters] = useState({
        subject: '',
        level: '',
        difficulty: '',
        type: '',
        format: '',
        priceRange: null,
        search: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [previewResource, setPreviewResource] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    // Filtrage et tri des ressources
    const filteredAndSortedResources = useMemo(() => {
        const searchFilters = { ...filters, search: searchTerm };
        const filtered = searchUtils.filterResources(resourcesData.resources, searchFilters);
        return searchUtils.sortResources(filtered, sortBy);
    }, [filters, searchTerm, sortBy]);

    const handleSearch = (term) => {
        // La recherche est déjà gérée par useMemo
    };

    const handlePreview = (resource) => {
        setPreviewResource(resource);
        setShowPreviewModal(true);
    };

    const closePreviewModal = () => {
        setShowPreviewModal(false);
        setPreviewResource(null);
    };

    return (
        <>
            {/* Breadcrumbs */}
            <Breadcrumbs
                title="Boutique de Ressources"
                description="Découvrez notre collection de livres, cahiers et ressources pédagogiques pour tous les niveaux"
                breadcrumbs={[
                    { label: "Accueil" },
                    { label: "Ressources" }
                ]}
            />

            {/* Section principale */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    {/* Barre de recherche */}
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSearch={handleSearch}
                    />

                    {/* Panneau de filtres */}
                    <FilterPanel
                        filters={filters}
                        setFilters={setFilters}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                    />

                    {/* Contrôles de tri et d'affichage */}
                    <SortAndViewControls
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        resultsCount={filteredAndSortedResources.length}
                    />

                    {/* Grille de ressources */}
                    <div className={`${viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                            : 'space-y-6'
                        }`}>
                        {filteredAndSortedResources.map((resource) => (
                            <ResourceCard
                                key={resource.id}
                                resource={resource}
                                viewMode={viewMode}
                                onPreview={handlePreview}
                            />
                        ))}
                    </div>

                    {/* Message si aucun résultat */}
                    {filteredAndSortedResources.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Aucune ressource trouvée
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Essayez de modifier vos critères de recherche ou vos filtres
                            </p>
                            <button
                                onClick={() => {
                                    setFilters({
                                        subject: '',
                                        level: '',
                                        difficulty: '',
                                        type: '',
                                        format: '',
                                        priceRange: null,
                                        search: ''
                                    });
                                    setSearchTerm('');
                                }}
                                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Réinitialiser les filtres
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Section Collections populaires */}
            <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Collections <span className="text-purple-600">Populaires</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Économisez avec nos packs de ressources soigneusement sélectionnées
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {resourcesData.collections.map((collection, index) => (
                            <motion.div
                                key={collection.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                            >
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {collection.name}
                                        </h3>
                                        <FaGift className="text-3xl text-purple-600" />
                                    </div>

                                    <p className="text-gray-600 mb-6">
                                        {collection.description}
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        {collection.resources.map(resourceId => {
                                            const resource = resourcesData.resources.find(r => r.id === resourceId);
                                            return resource ? (
                                                <div key={resourceId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <span className="font-medium">{resource.title}</span>
                                                    <span className="text-gray-600">{resource.price}€</span>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>

                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-400 line-through">
                                                    {collection.originalPrice}€
                                                </span>
                                                <span className="text-3xl font-bold text-purple-600">
                                                    {collection.price}€
                                                </span>
                                            </div>
                                            <div className="text-green-600 font-medium">
                                                Économie de {collection.savings}€
                                            </div>
                                        </div>

                                        <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                                            -{Math.round((collection.savings / collection.originalPrice) * 100)}%
                                        </div>
                                    </div>

                                    <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center">
                                        <FaShoppingCart className="mr-2" />
                                        Acheter la collection
                                        <FaArrowRight className="ml-2" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section CTA */}
            <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Vous ne trouvez pas ce que vous cherchez ?
                        </h2>
                        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                            Contactez notre équipe pédagogique pour des ressources personnalisées
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg">
                                Demande personnalisée
                            </button>
                            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105">
                                Nous contacter
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        


    <ResourcePreviewModal
        resource={previewResource}
        isOpen={showPreviewModal}
        onClose={closePreviewModal}
    />
  </>
);
};

export default ResourcesPage;