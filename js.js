document.getElementById('actividades-formulario').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const actividad = document.getElementById('actividad').value;
    const nota = parseFloat(document.getElementById('nota').value);

    if (nota < 0 || nota > 5) {
        alert("La nota debe estar entre 0.0 y 5.0");
        return;
    }

    const tableBody = document.querySelector('#actividades tbody');
    const newRow = tableBody.insertRow();
    const activityCell = newRow.insertCell(0);
    const gradeCell = newRow.insertCell(1);
    const actionCell = newRow.insertCell(2);

    activityCell.textContent = actividad;
    gradeCell.textContent = nota.toFixed(2); 

    actionCell.innerHTML = `
        <div class="action-buttons">
            <button class="edit">Editar</button>
            <button class="delete">Eliminar</button>
        </div>
    `;

    addEditDeleteActions(newRow);

    updateAverage();

    document.getElementById('actividades-formulario').reset();
});

function updateAverage() {
    const tableBody = document.querySelector('#actividades tbody');
    const rows = tableBody.querySelectorAll('tr');
    let total = 0;
    let count = 0;

    rows.forEach(row => {
        const grade = parseFloat(row.cells[1].textContent);
        total += grade;
        count++;
    });

    const average = total / count;
    const promedio = document.getElementById('promedio');
    const estado = document.getElementById('estado');

    if (count > 0) {
        promedio.textContent = `Promedio: ${average.toFixed(2)}`;
        if (average >= 3) {
            promedio.classList.remove('no-aprovado');
            promedio.classList.add('aprovado');
            estado.textContent = "Estado: Aprobado";
        } else {
            promedio.classList.remove('aprovado');
            promedio.classList.add('no-aprovado');
            estado.textContent = "Estado: No aprobado";
        }
    } else {
        promedio.textContent = "Promedio: -";
        estado.textContent = "Estado: -";
    }
}
function addEditDeleteActions(row) {
    const editButton = row.querySelector('.edit');
    const deleteButton = row.querySelector('.delete');
  
    editButton.addEventListener('click', function () {
        const activityName = row.cells[0].textContent;
        const activityGrade = parseFloat(row.cells[1].textContent);
        document.getElementById('actividad').value = activityName;
        document.getElementById('nota').value = activityGrade;

        row.remove();
        updateAverage();
    });

    deleteButton.addEventListener('click', function () {

        const deleteModal = document.getElementById('modal');
        deleteModal.style.display = 'block';

        const confirmDelete = document.getElementById('moddsi');
        const cancelDelete = document.getElementById('moddno');

        confirmDelete.onclick = function () {
            row.remove();
            deleteModal.style.display = 'none';
            updateAverage();
        };

        cancelDelete.onclick = function () {
            deleteModal.style.display = 'none';
        };
    });
}
window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
