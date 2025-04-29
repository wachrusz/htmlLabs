let isDragging = false;
let requestId = null;

function updateSpring() {
    const k = parseFloat(document.getElementById('k').value);
    const f = parseFloat(document.getElementById('f').value);
    
    // Обновляем значения
    document.getElementById('kValue').textContent = k;
    document.getElementById('fValue').textContent = f;
    
    // Расчет деформации
    const deformation = -(f / k) * 100;
    const maxWidth = document.querySelector('.spring-body').offsetWidth;
    const newWidth = Math.min(maxWidth, deformation);
    
    // Обновляем элементы
    const spring = document.querySelector('.spring');
    
    const scaleX = 1 + (newWidth / 100);
    
    spring.style.transform = `scaleX(${scaleX})`;
}

// Оптимизированные обработчики событий
function handleInput() {
    if (!isDragging) {
        requestId = requestAnimationFrame(() => {
            updateSpring();
            isDragging = false;
        });
    }
    isDragging = true;
}

// Инициализация
document.getElementById('k').addEventListener('input', handleInput);
document.getElementById('f').addEventListener('input', handleInput);

// Первоначальная настройка
updateSpring();

function checkTest(e) {
    e.preventDefault();
    
    let score = 0;
    const results = [];
    
    const q1 = document.querySelector('input[name="q1"]:checked');
    if (q1 && q1.value === 'b') score += 3;

    const q2 = document.getElementById('q2').value.toLowerCase();
    if (q2.includes('f=-kx') || q2.includes('f= -kx')) score += 4;

    const q3 = [...document.querySelectorAll('input[name="q3"]:checked')]
               .map(input => input.value);
    if (q3.includes('a') && q3.includes('c') && q3.length === 2) score += 3;

    const resultDiv = document.getElementById('testResult');
    resultDiv.innerHTML = `
        <h3>Результат: ${score}/10 баллов</h3>
        <p>${score >= 8 ? 'Отлично!' : score >= 5 ? 'Хорошо!' : 'Попробуйте еще раз!'}</p>
    `;
    resultDiv.style.color = score >= 8 ? '#27ae60' : score >=5 ? '#f1c40f' : '#e74c3c';
}