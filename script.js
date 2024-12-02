const cargoList = [
  {
      id: "CARGO001",
      name: "Строительные материалы",
      status: "В пути",
      origin: "Москва",
      destination: "Казань",
      departureDate: "2024-11-24"
  },
  {
      id: "CARGO002",
      name: "Хрупкий груз",
      status: "Ожидает отправки",
      origin: "Санкт-Петербург",
      destination: "Екатеринбург",
      departureDate: "2024-11-26"
  }
];

function renderCargoTable(cargoList) {
  const cargoTable = document.getElementById('cargoTable');
  cargoTable.innerHTML = '';

  cargoList.forEach((cargo, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${cargo.id}</td>
          <td>${cargo.name}</td>
          <td class="text-${getStatusClass(cargo.status)}">${cargo.status}</td>
          <td>${cargo.origin}</td>
          <td>${cargo.destination}</td>
          <td>${cargo.departureDate}</td>
          <td>
              <select class="form-control" onchange="changeStatus('${cargo.id}', this.value)">
                  <option value="Ожидает отправки" ${cargo.status === 'Ожидает отправки' ? 'selected' : ''}>Ожидает отправки</option>
                  <option value="В пути" ${cargo.status === 'В пути' ? 'selected' : ''}>В пути</option>
                  <option value="Доставлен" ${cargo.status === 'Доставлен' ? 'selected' : ''}>Доставлен</option>
              </select>
          </td>
      `;
      cargoTable.appendChild(row);
  });
}

function getStatusClass(status) {
  switch (status) {
      case 'Ожидает отправки':
          return 'warning';
      case 'В пути':
          return 'primary';
      case 'Доставлен':
          return 'success';
      default:
          return '';
  }
}

document.getElementById('cargoForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('cargoName').value;
  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const departureDate = document.getElementById('departureDate').value;
  const status = document.getElementById('status').value;
  
  if (!name || !origin || !destination || !departureDate) {
      document.getElementById('error-message').textContent = 'Пожалуйста, заполните все поля!';
      document.getElementById('error-message').style.display = 'block';
      return;
  }
  document.getElementById('error-message').style.display = 'none';
  const id = `CARGO${String(cargoList.length + 1).padStart(3, '0')}`;
  cargoList.push({ id, name, status, origin, destination, departureDate });
  document.getElementById('cargoForm').reset();
  renderCargoTable(cargoList);
});

function changeStatus(id, newStatus) {
  const cargo = cargoList.find(c => c.id === id);
  if (cargo) {
      cargo.status = newStatus;
      renderCargoTable(cargoList); 
  }
}

document.getElementById('filterStatus').addEventListener('change', function(e) {
  const filter = e.target.value;
  const filteredCargoList = filter ? cargoList.filter(cargo => cargo.status === filter) : cargoList;
  renderCargoTable(filteredCargoList);
});

renderCargoTable(cargoList);
