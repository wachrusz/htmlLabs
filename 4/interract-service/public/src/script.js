let selectedNumbers = [];

document.addEventListener('DOMContentLoaded', () => {
    const numbersGrid = document.getElementById('numbersGrid');
    for (let i = 1; i <= 25; i++) {
        const btn = document.createElement('button');
        btn.className = 'number-btn';
        btn.textContent = i;
        btn.onclick = () => toggleNumber(i);
        numbersGrid.appendChild(btn);
    }
});

function toggleNumber(num) {
    const index = selectedNumbers.indexOf(num);
    if (index === -1) {
        if (selectedNumbers.length < 5) {
            selectedNumbers.push(num);
            event.target.classList.add('selected');
        }
    } else {
        selectedNumbers.splice(index, 1);
        event.target.classList.remove('selected');
    }
}

async function startGame() {
    if (selectedNumbers.length !== 5) {
        alert('Выберите 5 чисел!');
        return;
    }

    document.getElementById('startBtn').disabled = true;
    const ballsContainer = document.getElementById('lotteryBalls');
    ballsContainer.innerHTML = '';

    const winNumbers = generateWinNumbers();
    let matches = 0;

    for (let i = 0; i < winNumbers.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.textContent = winNumbers[i];
        ballsContainer.appendChild(ball);
        
        if (selectedNumbers.includes(winNumbers[i])) {
            matches++;
            ball.style.background = '#ffc107';
        }
    }

    showResult(matches);
}

function generateWinNumbers() {
    const numbers = [];
    while (numbers.length < 5) {
        const num = Math.floor(Math.random() * 25) + 1;
        if (!numbers.includes(num)) numbers.push(num);
    }
    return numbers.sort((a, b) => a - b);
}

function showResult(matches) {
    const prizes = {
        5: 'Джекпот! 1 000 000₽',
        4: '10 000₽',
        3: '1 000₽',
        2: '100₽',
        1: '50₽',
        0: 'Попробуйте ещё раз!'
    };
    
    document.getElementById('result').innerHTML = `
        Угадано чисел: ${matches}<br>
        <strong>${prizes[matches]}</strong>
    `;
    document.getElementById('resetBtn').style.display = 'block';
}

function resetGame() {
    selectedNumbers = [];
    document.querySelectorAll('.number-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById('lotteryBalls').innerHTML = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('startBtn').disabled = false;
    document.getElementById('resetBtn').style.display = 'none';
}