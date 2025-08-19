// src/utils/validation.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateName = (name) => {
  return name.length >= 2;
};

export const validateChildForm = (data) => {
  const errors = {};
  if (!validateName(data.name)) errors.name = "Nom invalide";
  if (!data.birthDate) errors.birthDate = "Date de naissance requise";
  if (!data.grade) errors.grade = "Niveau scolaire requis";
  return errors;
};

export const validateResourceForm = (data) => {
  const errors = {};
  if (!data.title) errors.title = "Titre requis";
  if (!data.subject) errors.subject = "Matière requise";
  if (!data.level) errors.level = "Niveau requis";
  return errors;
};
