document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addForm');
    const tableBody = document.getElementById('tableBody');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value;
        const email = document.getElementById('email').value.trim();
        
        if (!name || !age || !email) {
            alert('Заполните все поля');
            return;
        }
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${age}</td>
            <td>${email}</td>
        `;
        
        tableBody.appendChild(newRow);
        
        form.reset();
    });
});