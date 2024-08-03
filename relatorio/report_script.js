// Function to extract data from localStorage and populate the report
function populateReport() {
  const reportList = [];
  for (let i = 0; i <= 120; i++) {
    const playerName = localStorage.getItem(`number_${i}`);
    if (playerName) {
      reportList.push({ number: i, name: playerName });
    }
  }

  // Sort the list by number
  reportList.sort((a, b) => a.number - b.number);

  // Populate the report list
  const columns = Array.from({ length: 6 }, (_, i) => document.getElementById(`column${i + 1}`));
  columns.forEach(column => column.innerHTML = '');
  reportList.forEach((item, index) => {
    const columnIndex = index % 6;
    const column = columns[columnIndex];
    const listItem = document.createElement('div');
    listItem.textContent = `${item.number}: ${item.name}`;
    listItem.className = 'number-container';
    column.appendChild(listItem);
  });
}

populateReport(); // Call the function on page load

// Função para redirecionar para a outra página
function returnToMainPage() {
  window.location.href = "../index.html";
}

// Adicionando o evento de clique ao botão
document.getElementById('returnButton').addEventListener('click', returnToMainPage);
