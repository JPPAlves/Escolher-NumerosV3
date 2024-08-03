const numberContainer = document.getElementById('numberContainer');
const resetButton = document.getElementById('resetButton');
const downloadPDFButton = document.getElementById('downloadPDFButton');

// Function to handle number click
function selectNumber(event) {
  const selectedNumber = event.currentTarget;

  // Check if the number is already selected
  if (!selectedNumber.classList.contains('selected')) {
    const playerName = prompt('Por favor, digite seu nome:');

    if (playerName !== null && playerName.trim() !== '') {
      selectedNumber.classList.add('selected');
      const nameElement = selectedNumber.querySelector('.name');
      nameElement.innerHTML = playerName;

      // Store information in local storage
      const numberIndex = Array.from(numberContainer.children).indexOf(selectedNumber);
      localStorage.setItem(`number_${numberIndex}`, playerName);
      localStorage.setItem(`number_${numberIndex}_selected`, true);
    }
  }
}

// Function to handle double click on number
function editNumberStatus(event) {
  const selectedNumber = event.currentTarget;
  const playerName = selectedNumber.querySelector('.name').innerHTML;

  // Confirmation with the user
  const shouldClearData = confirm(`Deseja limpar os dados do número ${selectedNumber.querySelector('.number').innerHTML}?`);

  if (shouldClearData) {
    // If the user confirms, remove the data
    selectedNumber.classList.remove('selected');
    const nameElement = selectedNumber.querySelector('.name');
    nameElement.innerHTML = '';

    // Remove information from local storage
    const numberIndex = Array.from(numberContainer.children).indexOf(selectedNumber);
    localStorage.removeItem(`number_${numberIndex}`);
    localStorage.removeItem(`number_${numberIndex}_selected`);
  }
}

// Function to reset all information
function resetNumbers() {
  const shouldReset = confirm('Você tem certeza que deseja resetar todas as informações? Isso não pode ser desfeito.');

  if (shouldReset) {
    localStorage.clear();
    location.reload();
  }
}

// Function to order numbers and names and display in a report
function orderAndDisplayReport() {
  window.location.href = "relatorio/report.html"; // Open the report page
}

// Function to order numbers and names and display in a report
function orderAndDisplaysorteador() {
  window.location.href = "soteador/sorteador.html"; // Open the report page
} 

// Create the numbers from 0 to 100
for (let i = 1; i <= 120; i++) {
  const numberElement = document.createElement('div');
  numberElement.classList.add('number-container');

  const number = document.createElement('div');
  number.classList.add('number');
  number.innerHTML = i;
  numberElement.appendChild(number);

  const name = document.createElement('div');
  name.classList.add('name');
  const storedName = localStorage.getItem(`number_${i}`);
  name.innerHTML = storedName ? storedName : '';
  numberElement.appendChild(name);

  // Check for previously selected number on page load
  const selected = localStorage.getItem(`number_${i}_selected`);
  if (selected) {
    numberElement.classList.add('selected');
  }

  numberElement.addEventListener('click', selectNumber);
  numberElement.addEventListener('dblclick', editNumberStatus); 

  numberContainer.appendChild(numberElement);
}

resetButton.addEventListener('click', resetNumbers);
downloadPDFButton.addEventListener('click', orderAndDisplayReport);
sorteador.addEventListener('click', orderAndDisplaysorteador);
