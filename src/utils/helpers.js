export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
};

// export const formatCurrency = (amount) => {
//   return new Intl.NumberFormat("fr-FR", {
//     style: "currency",
//     currency: "EUR",
//   }).format(amount);
// };
