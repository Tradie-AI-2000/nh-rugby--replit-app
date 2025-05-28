// Clean CSV Export for North Harbour Rugby Performance Hub

export function generateCleanPlayersCSV(): string {
  const headers = [
    'firstName', 'lastName', 'dateOfBirth', 'height', 'weight', 'primaryPosition', 
    'jerseyNumber', 'phone', 'email', 'bodyFat', 'fitnessScore', 'topSpeed', 
    'tackles', 'carries', 'tries', 'passAccuracy', 'currentStatus', 'coachingNotes'
  ];

  const samplePlayers = [
    ['Jake', 'Thompson', '1998-03-15', '185', '105', 'Hooker', '2', '+64 21 234 5678', 'jake.thompson@email.com', '12', '85', '28.5', '15', '8', '2', '92', 'Available', 'Excellent lineout throwing'],
    ['Mike', 'Wilson', '1995-07-22', '180', '120', 'Prop', '1', '+64 21 456 7890', 'mike.wilson@email.com', '15', '78', '25.2', '18', '12', '1', '88', 'Available', 'Strong scrummaging technique'],
    ['Sam', 'Roberts', '1999-11-08', '195', '115', 'Lock', '4', '+64 21 678 9012', 'sam.roberts@email.com', '10', '88', '27.1', '20', '6', '1', '85', 'Minor Strain', 'Outstanding lineout work']
  ];

  let csv = headers.join(',') + '\n';
  
  samplePlayers.forEach(player => {
    csv += player.map(field => `"${field}"`).join(',') + '\n';
  });

  return csv;
}

export function generateMatchStatsCSV(): string {
  const headers = [
    'playerName', 'matchDate', 'opponent', 'result', 'minutesPlayed', 'tries', 
    'tackles', 'carries', 'passAccuracy', 'distanceCovered', 'topSpeed'
  ];

  const sampleMatches = [
    ['Jake Thompson', '2025-01-20', 'Auckland', 'W 24-18', '80', '1', '12', '8', '92', '6.2', '28.5'],
    ['Mike Wilson', '2025-01-20', 'Auckland', 'W 24-18', '75', '0', '15', '12', '88', '5.8', '25.2'],
    ['Sam Roberts', '2025-01-15', 'Canterbury', 'L 15-22', '65', '0', '18', '6', '85', '6.8', '27.1']
  ];

  let csv = headers.join(',') + '\n';
  
  sampleMatches.forEach(match => {
    csv += match.map(field => `"${field}"`).join(',') + '\n';
  });

  return csv;
}