// src/config/routes.js
export const ROUTES = {
  // Public routes
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRICING: "/pricing",
  KIDS_ACADEMY: "/kids-academy",
  FAMILY_ACADEMY: "/family-academy",
  RESOURCES: "/resources",


  // Auth routes
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",

  // Parent routes
  PARENT_DASHBOARD: "/parent/dashboard",
  PARENT_PROFILE: "/parent/profile",
  PARENT_SETTINGS: "/parent/settings",
  PARENT_ADD_CHILD: "/parent/add-child",
  PARENT_CHILDREN: "/parent/children",
  PARENT_CHILD_PROGRESS: "/parent/children/:id/progress",
  PARENT_BILLING: "/parent/billing",
  PARENT_PAYMENT_METHODS: "/parent/billing/payment-methods",
  PARENT_INVOICES: "/parent/billing/invoices",
  PARENT_SUBSCRIPTION: "/parent/subscription",
  PARENT_CHANGE_PLAN: "/parent/subscription/change-plan",
  PARENT_SHOP: "/parent/shop",
  PARENT_CART: "/parent/shop/cart",
  PARENT_CHECKOUT: "/parent/shop/checkout",
  PARENT_ORDERS: "/parent/shop/orders",

  // Child routes
  CHILD_DASHBOARD: "/child/dashboard",
  CHILD_PROFILE: "/child/profile",
  CHILD_RESOURCES: "/child/resources",
  CHILD_ARTICLE: "/child/resources/article/:id",
  CHILD_PDF: "/child/resources/pdf/:id",
  CHILD_VIDEO: "/child/resources/video/:id",
  CHILD_GAMES: "/child/games",
  CHILD_MATH_GAME: "/child/games/math",
  CHILD_MEMORY_GAME: "/child/games/memory",
  CHILD_PUZZLE_GAME: "/child/games/puzzle",
  CHILD_QUIZZES: "/child/quizzes",
  CHILD_PLAY_QUIZ: "/child/quizzes/play/:id",
  CHILD_QUIZ_COMPLETED: "/child/quizzes/completed/:id",

  // Shared routes
  TUTORS: "/tutors",
  BOOK_TUTOR: "/tutors/book/:id",
  EDUCATIONAL_RESOURCES: "/resources",
  VIEW_RESOURCE: "/resources/:id",
  QUIZZES_LIST: "/quizzes",
  GAMES_LIST: "/games",

  // Admin routes
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS: "/admin/users",
  ADMIN_CREATE_USER: "/admin/users/create",
  ADMIN_EDIT_USER: "/admin/users/edit/:id",
  ADMIN_RESOURCES: "/admin/resources",
  ADMIN_CREATE_RESOURCE: "/admin/resources/create",
  ADMIN_EDIT_RESOURCE: "/admin/resources/edit/:id",
  ADMIN_GAMES: "/admin/games",
  ADMIN_CREATE_GAME: "/admin/games/create",
  ADMIN_QUIZZES: "/admin/quizzes",
  ADMIN_CREATE_QUIZ: "/admin/quizzes/create",
  ADMIN_TUTORS: "/admin/tutors",
  ADMIN_APPROVE_TUTORS: "/admin/tutors/approve",
  ADMIN_SUBSCRIPTIONS: "/admin/subscriptions",
  ADMIN_SUBSCRIPTION_STATS: "/admin/subscriptions/stats",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_PAYMENT_SETTINGS: "/admin/settings/payment",

  // Fallback route
  NOT_FOUND: "*",
};
