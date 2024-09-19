document.getElementById('activityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const activityName = document.getElementById('activityName').value;
    const activityGrade = parseFloat(document.getElementById('activityGrade').value);

    if (activityGrade < 0 || activityGrade > 5) {
        alert("La nota debe estar entre 0.0 y 5.0");
        return;
    }

    const tableBody = document.querySelector('#activities tbody');
    const newRow = tableBody.insertRow();
    const activityCell = newRow.insertCell(0);
    const gradeCell = newRow.insertCell(1);
    activityCell.textContent = activityName;
    gradeCell.textContent = activityGrade.toFixed(1);

    updateAverage();

    document.getElementById('activityForm').reset();
});

function updateAverage() {
    const tableBody = document.querySelector('#activities tbody');
    const rows = tableBody.querySelectorAll('tr');
    let total = 0;
    let count = 0;

    rows.forEach(row => {
        const grade = parseFloat(row.cells[1].textContent);
        total += grade;
        count++;
    });

    const average = total / count;
    const averageResult = document.getElementById('averageResult');
    const statusResult = document.getElementById('statusResult');

    if (count > 0) {
        averageResult.textContent = `Promedio: ${average.toFixed(2)}`;
        if (average >= 3) {
            statusResult.textContent = 'Estado: Aprobado';
            averageResult.classList.add('approved');
            averageResult.classList.remove('not-approved');
        } else {
            statusResult.textContent = 'Estado: No Aprobado';
            averageResult.classList.add('not-approved');
            averageResult.classList.remove('approved');
        }
    } else {
        averageResult.textContent = 'Promedio: -';
        statusResult.textContent = 'Estado: -';
        averageResult.classList.remove('approved', 'not-approved');
    }
}
