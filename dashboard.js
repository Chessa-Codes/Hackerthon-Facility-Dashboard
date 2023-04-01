// Define patients array
let patients = [];

// Define addPatient function
function addPatient(name, id, phone) {
  const patient = { name, id, phone };
  patients.push(patient);
  console.log(`Patient added: Name: ${name}, ID: ${id}, Phone: ${phone}`);
  // TODO: Send patient data to server using AJAX or fetch API
}

// Define searchPatients function
function searchPatients(searchName) {
  const results = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchName.toLowerCase())
  );
  console.log(`Search results: ${results.length}`);
  return results;
}

// Define sendToLab function
function sendToLab(patient) {
  console.log(`Patient sent to lab: Name: ${patient.name}, ID: ${patient.id}, Phone: ${patient.phone}`);
  // TODO: Send patient data to lab using AJAX or fetch API
}

// Add Patient form submit event
const addPatientForm = document.querySelector('.form-container form');
addPatientForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  const phone = document.getElementById('phone').value;
  addPatient(name, id, phone);

  addPatientForm.reset();
});

// Search Patient form submit event
const searchPatientForm = document.querySelector('.search-container form');
searchPatientForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchName = document.getElementById('search-name').value;
  const results = searchPatients(searchName);
  const searchResultsDiv = document.getElementById('search-results');
  searchResultsDiv.innerHTML = '';
  if (results.length === 0) {
    searchResultsDiv.innerHTML = 'No results found.';
  } else {
    const resultsList = document.createElement('ul');
    results.forEach((result) => {
      const resultItem = document.createElement('li');
      resultItem.innerText = `Name: ${result.name}, ID: ${result.id}, Phone: ${result.phone}`;
      const sendToLabButton = document.createElement('button');
      sendToLabButton.innerText = 'Send to Lab';
      sendToLabButton.style.marginLeft = `${resultItem.offsetHeight + 10}px`;
      sendToLabButton.addEventListener('click', () => {
        sendToLab(result);
        resultItem.remove();

        searchPatientForm.reset();
      });
      resultItem.appendChild(sendToLabButton);
      resultsList.appendChild(resultItem);
    });
    searchResultsDiv.appendChild(resultsList);
  }

});

// Retrieve the related names from local storage
const relatedNames = JSON.parse(localStorage.getItem('relatedNames'));

// Get the list element from the DOM
const namesList = document.getElementById('names-list');

if (relatedNames && relatedNames.length > 0) {
  // Loop through the list of names and create a list item for each one
  relatedNames.forEach(name => {
    const listItem = document.createElement('li');
    listItem.textContent = name;
    
    // Add the list item to the list element
    namesList.appendChild(listItem);
  });
} else {
  // If there are no related names, display a message
  const messageItem = document.createElement('li');
  messageItem.textContent = 'No related names have been entered';
  namesList.appendChild(messageItem);
}

