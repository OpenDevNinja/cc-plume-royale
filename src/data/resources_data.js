// Données des ressources éducatives
export const resourcesData = {
  // Matières disponibles
  subjects: [
    {
      id: "mathematiques",
      name: "Mathématiques",
      icon: "🔢",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "francais",
      name: "Français",
      icon: "📚",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "sciences",
      name: "Sciences",
      icon: "🔬",
      color: "from-green-500 to-teal-500",
    },
    {
      id: "histoire",
      name: "Histoire-Géo",
      icon: "🌍",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "anglais",
      name: "Anglais",
      icon: "🇬🇧",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "arts",
      name: "Arts Plastiques",
      icon: "🎨",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "musique",
      name: "Musique",
      icon: "🎵",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "sport",
      name: "EPS",
      icon: "⚽",
      color: "from-emerald-500 to-green-500",
    },
  ],

  // Niveaux scolaires
  levels: [
    { id: "cp", name: "CP", order: 1 },
    { id: "ce1", name: "CE1", order: 2 },
    { id: "ce2", name: "CE2", order: 3 },
    { id: "cm1", name: "CM1", order: 4 },
    { id: "cm2", name: "CM2", order: 5 },
    { id: "6eme", name: "6ème", order: 6 },
    { id: "5eme", name: "5ème", order: 7 },
    { id: "4eme", name: "4ème", order: 8 },
    { id: "3eme", name: "3ème", order: 9 },
  ],

  // Niveaux de difficulté
  difficulties: [
    { id: "facile", name: "Facile", color: "text-green-600 bg-green-100" },
    { id: "moyen", name: "Moyen", color: "text-yellow-600 bg-yellow-100" },
    { id: "difficile", name: "Difficile", color: "text-red-600 bg-red-100" },
  ],

  // Types de ressources
  types: [
    { id: "cahier", name: "Cahier d'exercices", icon: "📝" },
    { id: "livre", name: "Manuel scolaire", icon: "📖" },
    { id: "fiche", name: "Fiche de révision", icon: "📄" },
    { id: "evaluation", name: "Évaluation", icon: "✅" },
    { id: "jeu", name: "Jeu éducatif", icon: "🎮" },
    { id: "projet", name: "Projet créatif", icon: "🛠️" },
  ],

  // Ressources disponibles
  resources: [
    // Mathématiques CP-CE1
    {
      id: "math-cp-nombres",
      title: "Découverte des Nombres - CP",
      description:
        "Cahier d'exercices complet pour apprendre à compter, reconnaître et écrire les nombres de 0 à 20",
      subject: "mathematiques",
      level: "cp",
      difficulty: "facile",
      type: "cahier",
      format: "pdf",
      isPhysical: true,
      price: 12.99,
      originalPrice: 15.99,
      pages: 48,
      author: "Sophie Martin",
      publisher: "Éditions Éducatives",
      rating: 4.8,
      reviewsCount: 156,
      downloadCount: 2341,
      accessDuration: 365, // jours
      preview: true,
      image:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["nombres", "comptage", "écriture", "base"],
      features: [
        "Exercices progressifs",
        "Corrigés inclus",
        "Activités ludiques",
      ],
      tableOfContents: [
        "Les nombres de 0 à 10",
        "Compter et décompter",
        "Écrire les nombres",
        "Comparer les nombres",
        "Additions simples",
      ],
    },
    {
      id: "math-ce1-operations",
      title: "Maîtriser les Opérations - CE1",
      description:
        "Manuel complet d'apprentissage des additions et soustractions avec retenue",
      subject: "mathematiques",
      level: "ce1",
      difficulty: "moyen",
      type: "livre",
      format: "pdf",
      isPhysical: true,
      price: 18.5,
      originalPrice: 22.0,
      pages: 72,
      author: "Jean Dubois",
      publisher: "Mathématiques Modernes",
      rating: 4.9,
      reviewsCount: 203,
      downloadCount: 1876,
      accessDuration: 365,
      preview: true,
      image:
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["addition", "soustraction", "retenue", "calcul mental"],
      features: ["Méthodes illustrées", "Exercices gradués", "Auto-évaluation"],
      tableOfContents: [
        "Addition sans retenue",
        "Addition avec retenue",
        "Soustraction sans retenue",
        "Soustraction avec retenue",
        "Problèmes d'application",
      ],
    },

    // Français
    {
      id: "francais-cp-lecture",
      title: "Premières Lectures - CP",
      description:
        "Méthode syllabique progressive pour apprendre à lire efficacement",
      subject: "francais",
      level: "cp",
      difficulty: "facile",
      type: "livre",
      format: "pdf",
      isPhysical: true,
      price: 16.9,
      pages: 64,
      author: "Marie Leroy",
      publisher: "Lecture & Plaisir",
      rating: 4.7,
      reviewsCount: 189,
      downloadCount: 3421,
      accessDuration: 365,
      preview: true,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["lecture", "syllabe", "phonétique", "déchiffrage"],
      features: [
        "Méthode progressive",
        "Histoires courtes",
        "Exercices variés",
      ],
      tableOfContents: [
        "Les voyelles",
        "Les consonnes simples",
        "Les syllabes",
        "Premiers mots",
        "Phrases courtes",
      ],
    },
    {
      id: "francais-ce2-grammaire",
      title: "Grammaire en Action - CE2",
      description:
        "Cahier d'exercices pour maîtriser les bases de la grammaire française",
      subject: "francais",
      level: "ce2",
      difficulty: "moyen",
      type: "cahier",
      format: "pdf",
      isPhysical: false,
      price: 9.99,
      pages: 36,
      author: "Pierre Moreau",
      publisher: "Grammaire Plus",
      rating: 4.6,
      reviewsCount: 142,
      downloadCount: 1654,
      accessDuration: 365,
      preview: true,
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["grammaire", "nature", "fonction", "phrase"],
      features: ["Leçons courtes", "Nombreux exemples", "Jeux grammaticaux"],
      tableOfContents: [
        "Le nom et le déterminant",
        "L'adjectif qualificatif",
        "Le verbe et ses temps",
        "La phrase simple",
        "Les types de phrases",
      ],
    },

    // Sciences
    {
      id: "sciences-cm1-corps-humain",
      title: "Le Corps Humain Expliqué - CM1",
      description: "Découverte interactive du fonctionnement du corps humain",
      subject: "sciences",
      level: "cm1",
      difficulty: "moyen",
      type: "livre",
      format: "pdf",
      isPhysical: true,
      price: 21.0,
      pages: 88,
      author: "Dr. Claire Bonneau",
      publisher: "Sciences Jeunesse",
      rating: 4.9,
      reviewsCount: 98,
      downloadCount: 876,
      accessDuration: 365,
      preview: true,
      image:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["anatomie", "santé", "organes", "fonctionnement"],
      features: [
        "Schémas détaillés",
        "Expériences simples",
        "Quiz interactifs",
      ],
      tableOfContents: [
        "Le squelette et les muscles",
        "Le système respiratoire",
        "Le système digestif",
        "Le cœur et la circulation",
        "Les cinq sens",
      ],
    },

    // Histoire-Géographie
    {
      id: "histoire-ce2-prehistoire",
      title: "Voyage en Préhistoire - CE2",
      description:
        "Découverte passionnante de la préhistoire avec activités pratiques",
      subject: "histoire",
      level: "ce2",
      difficulty: "facile",
      type: "projet",
      format: "pdf",
      isPhysical: false,
      price: 13.5,
      pages: 52,
      author: "Thomas Leroux",
      publisher: "Histoire Vivante",
      rating: 4.8,
      reviewsCount: 167,
      downloadCount: 1234,
      accessDuration: 365,
      preview: true,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["préhistoire", "hommes préhistoriques", "outils", "art pariétal"],
      features: [
        "Frise chronologique",
        "Activités manuelles",
        "Cartes illustrées",
      ],
      tableOfContents: [
        "La vie des premiers hommes",
        "Les outils préhistoriques",
        "La maîtrise du feu",
        "L'art des cavernes",
        "L'invention de l'agriculture",
      ],
    },

    // Anglais
    {
      id: "anglais-cm2-conversation",
      title: "First Conversations - CM2",
      description:
        "Manuel de conversation anglaise avec audio intégré pour débuter",
      subject: "anglais",
      level: "cm2",
      difficulty: "moyen",
      type: "livre",
      format: "pdf",
      isPhysical: true,
      price: 19.9,
      pages: 76,
      author: "Sarah Johnson",
      publisher: "English Today",
      rating: 4.7,
      reviewsCount: 134,
      downloadCount: 987,
      accessDuration: 365,
      preview: true,
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["conversation", "vocabulaire", "pronunciation", "dialogue"],
      features: ["Fichiers audio", "Dialogues pratiques", "Jeux de rôle"],
      tableOfContents: [
        "Greetings and introductions",
        "Family and friends",
        "School and hobbies",
        "Food and drinks",
        "Daily activities",
      ],
    },

    // Évaluations et fiches
    {
      id: "eval-math-ce1-trimestre1",
      title: "Évaluations Maths CE1 - 1er Trimestre",
      description:
        "Pack de 6 évaluations complètes avec barèmes et corrections",
      subject: "mathematiques",
      level: "ce1",
      difficulty: "moyen",
      type: "evaluation",
      format: "pdf",
      isPhysical: false,
      price: 7.99,
      pages: 24,
      author: "Équipe pédagogique",
      publisher: "Éval Express",
      rating: 4.5,
      reviewsCount: 89,
      downloadCount: 1567,
      accessDuration: 365,
      preview: true,
      image:
        "https://images.unsplash.com/photo-1606114540396-c1d5c9b51f57?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["évaluation", "contrôle", "bilan", "trimestre"],
      features: [
        "Barèmes détaillés",
        "Corrections complètes",
        "Grille d'analyse",
      ],
      tableOfContents: [
        "Numération 0-100",
        "Addition et soustraction",
        "Géométrie de base",
        "Mesures et grandeurs",
        "Résolution de problèmes",
        "Bilan général",
      ],
    },

    // Jeux éducatifs
    {
      id: "jeu-francais-cp-syllabes",
      title: "Jeu des Syllabes Magiques - CP",
      description:
        "Jeu de cartes éducatif pour apprendre la découpe syllabique en s'amusant",
      subject: "francais",
      level: "cp",
      difficulty: "facile",
      type: "jeu",
      format: "pdf",
      isPhysical: true,
      price: 11.5,
      pages: 32,
      author: "Lucie Petit",
      publisher: "Jeux & Apprentissage",
      rating: 4.9,
      reviewsCount: 245,
      downloadCount: 2876,
      accessDuration: 365,
      preview: true,
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["jeu", "syllabes", "phonétique", "cartes"],
      features: [
        "48 cartes à découper",
        "Règles multiples",
        "Guide pédagogique",
      ],
      tableOfContents: [
        "Règles du jeu",
        "Cartes niveau 1",
        "Cartes niveau 2",
        "Activités bonus",
        "Guide pour parents",
      ],
    },

    // Arts et créativité
    {
      id: "arts-ce1-saisons",
      title: "Arts Plastiques - Les 4 Saisons",
      description:
        "Projets artistiques créatifs inspirés des saisons avec techniques variées",
      subject: "arts",
      level: "ce1",
      difficulty: "facile",
      type: "projet",
      format: "pdf",
      isPhysical: false,
      price: 14.9,
      pages: 44,
      author: "Isabelle Dubois",
      publisher: "Art & Création",
      rating: 4.6,
      reviewsCount: 78,
      downloadCount: 543,
      accessDuration: 365,
      preview: true,
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["art", "créativité", "saisons", "techniques mixtes"],
      features: [
        "12 projets créatifs",
        "Matériel simple",
        "Pas à pas illustrés",
      ],
      tableOfContents: [
        "Printemps - Fleurs en relief",
        "Été - Paysages colorés",
        "Automne - Collages naturels",
        "Hiver - Art glacé",
        "Galerie des réalisations",
      ],
    },
  ],

  // Collections populaires
  collections: [
    {
      id: "collection-cp-demarrage",
      name: "Pack Démarrage CP",
      description: "Tous les essentiels pour une rentrée réussie en CP",
      resources: [
        "math-cp-nombres",
        "francais-cp-lecture",
        "jeu-francais-cp-syllabes",
      ],
      originalPrice: 41.39,
      price: 29.99,
      savings: 11.4,
    },
    {
      id: "collection-ce1-consolidation",
      name: "Pack Consolidation CE1",
      description: "Renforcez les acquis fondamentaux du CE1",
      resources: [
        "math-ce1-operations",
        "eval-math-ce1-trimestre1",
        "arts-ce1-saisons",
      ],
      originalPrice: 41.39,
      price: 32.99,
      savings: 8.4,
    },
  ],
};

// Utilitaires pour filtrer et rechercher
export const searchUtils = {
  filterResources: (resources, filters) => {
    return resources.filter((resource) => {
      // Filtre par matière
      if (filters.subject && resource.subject !== filters.subject) return false;

      // Filtre par niveau
      if (filters.level && resource.level !== filters.level) return false;

      // Filtre par difficulté
      if (filters.difficulty && resource.difficulty !== filters.difficulty)
        return false;

      // Filtre par type
      if (filters.type && resource.type !== filters.type) return false;

      // Filtre par format (numérique/physique)
      if (filters.format === "digital" && resource.isPhysical) return false;
      if (filters.format === "physical" && !resource.isPhysical) return false;

      // Filtre par prix
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (resource.price < min || resource.price > max) return false;
      }

      // Recherche textuelle
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchFields = [
          resource.title,
          resource.description,
          resource.author,
          ...resource.tags,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchFields.includes(searchTerm)) return false;
      }

      return true;
    });
  },

  sortResources: (resources, sortBy) => {
    const sorted = [...resources];

    switch (sortBy) {
      case "newest":
        return sorted.reverse(); // Supposons que l'ordre par défaut est du plus ancien au plus récent
      case "price_asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price_desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "popular":
        return sorted.sort((a, b) => b.downloadCount - a.downloadCount);
      case "title":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  },

  getResourceById: (id) => {
    return resourcesData.resources.find((resource) => resource.id === id);
  },

  getResourcesBySubject: (subjectId) => {
    return resourcesData.resources.filter(
      (resource) => resource.subject === subjectId
    );
  },

  getPopularResources: (limit = 6) => {
    return resourcesData.resources
      .sort((a, b) => b.downloadCount - a.downloadCount)
      .slice(0, limit);
  },

  getNewResources: (limit = 6) => {
    return resourcesData.resources.slice(-limit).reverse();
  },
};
