export const ElevatorStrategy = {
  // Détermine la prochaine direction sans modifier l'état directement
  getNextDirection: (currentFloor, currentDirection, requests) => {
    if (requests.length === 0) return 'IDLE';

    // Continue à monter s'il y a des demandes en haut
    if (currentDirection === 'UP') {
      const hasMoreUp = requests.some(floor => floor > currentFloor);
      if (hasMoreUp) return 'UP';
    }
    
    // Continue à descendre s'il y a des demandes en bas
    if (currentDirection === 'DOWN') {
      const hasMoreDown = requests.some(floor => floor < currentFloor);
      if (hasMoreDown) return 'DOWN';
    }

    // Changement de sens si plus de requêtes dans l'axe actuel
    const hasUp = requests.some(floor => floor > currentFloor);
    const hasDown = requests.some(floor => floor < currentFloor);

    if (hasUp) return 'UP';
    if (hasDown) return 'DOWN';
    
    return 'IDLE';
  },

  // Vérifie si l'ascenseur doit s'arrêter à l'étage actuel
  shouldStopAt: (currentFloor, requests) => {
    return requests.includes(currentFloor);
  }
};
