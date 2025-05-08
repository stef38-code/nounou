const { execSync } = require('child_process');

/**
 * Fonction pour obtenir les dépendances obsolètes avec `npm outdated`
 */
function getOutdatedDependencies() {
  try {
    const outdated = execSync('npm outdated --json', { encoding: 'utf8' });
    return JSON.parse(outdated);
  } catch (err) {
    if (err.stdout) {
      return JSON.parse(err.stdout); // Retourne même s'il y a des mises à jour disponibles
    }
    console.error(
      "Erreur lors de l'exécution de `npm outdated` :",
      err.message
    );
    process.exit(1);
  }
}

/**
 * Classement des dépendances par priorité (vous pouvez les ajuster selon vos besoins)
 */
function sortDependenciesByPriority(outdatedDeps) {
  const priorityOrder = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
  ];
  const categorized = {
    dependencies: [],
    devDependencies: [],
    peerDependencies: [],
    optionalDependencies: [],
  };

  // Classifier chaque dépendance
  for (const [depName, details] of Object.entries(outdatedDeps)) {
    if (priorityOrder.includes(details.type)) {
      categorized[details.type].push({ name: depName, ...details });
    } else {
      console.warn(`Type inconnu pour ${depName} : ${details.type}`);
    }
  }

  // Trier chaque catégorie en respectant l'ordre donné
  return priorityOrder.map((type) => categorized[type]).flat();
}

/**
 * Installe les dépendances par ordre
 */
async function installDependenciesInOrder(dependencies) {
  for (const dep of dependencies) {
    const versionToInstall = dep.latest;
    console.log(`Mise à jour de ${dep.name} vers ${versionToInstall}...`);
    try {
      execSync(`npm install ${dep.name}@${versionToInstall}`, {
        stdio: 'inherit',
      });
      console.log(`✅   ${dep.name} mis à jour avec succès.\n`);
    } catch (err) {
      console.error(
        `❌   Échec de la mise à jour de ${dep.name} :`,
        err.message
      );
      process.exit(1);
    }
  }
}

/**
 * Script principal
 */
(async function main() {
  console.log('🔍 Vérification des dépendances obsolètes...');
  const outdated = getOutdatedDependencies();

  if (Object.keys(outdated).length === 0) {
    console.log('✅ Toutes les dépendances sont à jour ! 🎉');
    return;
  }

  console.log('📋 Classement des dépendances par priorité...');
  const sortedDependencies = sortDependenciesByPriority(outdated);

  console.log('🚀 Installation des dépendances, par ordre de priorité...');
  await installDependenciesInOrder(sortedDependencies);

  console.log('🎉 Toutes les dépendances ont été mises à jour avec succès !');
})();
