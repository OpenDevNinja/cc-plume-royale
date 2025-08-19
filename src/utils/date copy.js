// src/utils/date.js
export const formatDate = (date) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(date).toLocaleDateString('fr-FR', options)
}

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  
  const intervals = {
    an: 31536000,
    mois: 2592000,
    semaine: 604800,
    jour: 86400,
    heure: 3600,
    minute: 60
  }
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit)
    if (interval >= 1) {
      return `il y a ${interval} ${unit}${interval === 1 ? '' : 's'}`
    }
  }
  
  return 'à l\'instant'
}

export const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs}s`
}