document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            type: 'radio',
            question: 'Какой язык программирования вы изучаете?',
            options: ['JavaScript', 'Python', 'Java'],
            correct: 'JavaScript'
        },
        {
            type: 'checkbox',
            question: 'Какие из перечисленных технологий относятся к фронтенду?',
            options: ['HTML', 'CSS', 'Node.js', 'React'],
            correct: ['HTML', 'CSS', 'React']
        },
        {
            type: 'text',
            question: 'Напишите название основного протокола веба:',
            correct: 'HTTP'
        }
    ];

    const questionsContainer = document.getElementById('questions-container');
    const nextBtn = document.getElementById('next-btn');
    const resultDiv = document.getElementById('result');
    const restartBtn = document.getElementById('restart-btn');
    const errorMessage = document.getElementById('error-message');
    let currentQuestionIndex = 0;

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.dataset.questionIndex = index;
        questionDiv.innerHTML = `<h3>${question.question}</h3>`;
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        if (question.type === 'radio') {
            question.options.forEach((option, i) => {
                const inputId = `q${index}-opt${i}`;
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question-${index}`;
                input.id = inputId;
                input.value = option;
                
                const label = document.createElement('label');
                label.htmlFor = inputId;
                label.textContent = option;

                optionsDiv.appendChild(input);
                optionsDiv.appendChild(label);
                optionsDiv.appendChild(document.createElement('br'));
            });
        } else if (question.type === 'checkbox') {
            question.options.forEach((option, i) => {
                const inputId = `q${index}-opt${i}`;
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = `question-${index}`;
                input.id = inputId;
                input.value = option;
                
                const label = document.createElement('label');
                label.htmlFor = inputId;
                label.textContent = option;

                optionsDiv.appendChild(input);
                optionsDiv.appendChild(label);
                optionsDiv.appendChild(document.createElement('br'));
            });
        } else if (question.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Введите ответ...';
            optionsDiv.appendChild(input);
        }

        questionDiv.appendChild(optionsDiv);
        questionsContainer.appendChild(questionDiv);
    });

    document.querySelector('.question').classList.add('active');

    function validateCurrentQuestion() {
        const question = questions[currentQuestionIndex];
        const questionDiv = document.querySelector(`div[data-question-index="${currentQuestionIndex}"]`);
        let isValid = true;

        if (question.type === 'radio') {
            isValid = questionDiv.querySelector('input[type="radio"]:checked') !== null;
        } else if (question.type === 'checkbox') {
            isValid = questionDiv.querySelectorAll('input[type="checkbox"]:checked').length > 0;
        } else if (question.type === 'text') {
            const input = questionDiv.querySelector('input[type="text"]');
            isValid = input.value.trim() !== '';
        }

        errorMessage.textContent = isValid ? '' : 'Пожалуйста, ответьте на вопрос';
        return isValid;
    }

    function navigateQuestions() {
        const currentQuestionDiv = document.querySelector(`div[data-question-index="${currentQuestionIndex}"]`);
        currentQuestionDiv.classList.remove('active');
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            const nextQuestionDiv = document.querySelector(`div[data-question-index="${currentQuestionIndex}"]`);
            nextQuestionDiv.classList.add('active');
            nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? 'Завершить тест' : 'Следующий вопрос';
        } else {
            finishTest();
        }
    }

    function finishTest() {
        const answers = questions.map((question, index) => {
            const questionDiv = document.querySelector(`div[data-question-index="${index}"]`);
            
            switch(question.type) {
                case 'radio':
                    return questionDiv.querySelector('input:checked')?.value || '';
                case 'checkbox':
                    return Array.from(questionDiv.querySelectorAll('input:checked')).map(cb => cb.value);
                case 'text':
                    return questionDiv.querySelector('input').value.trim().toLowerCase();
            }
        });

        const correctAnswers = answers.map((answer, index) => {
            const question = questions[index];
            if (question.type === 'checkbox') {
                return JSON.stringify(answer.sort()) === JSON.stringify(question.correct.sort());
            } else if (question.type === 'text') {
                return answer === question.correct.toLowerCase();
            }
            return answer === question.correct;
        });

        const correctCount = correctAnswers.filter(Boolean).length;
        
        questionsContainer.style.display = 'none';
        nextBtn.style.display = 'none';
        resultDiv.textContent = `Правильных ответов: ${correctCount} из ${questions.length}`;
        resultDiv.style.display = 'block';
        restartBtn.style.display = 'block';
    }

    nextBtn.addEventListener('click', () => {
        if (!validateCurrentQuestion()) return;
        navigateQuestions();
    });

    restartBtn.addEventListener('click', () => {
        document.querySelectorAll('.question').forEach(div => div.classList.remove('active'));
        document.querySelectorAll('input').forEach(input => {
            if (input.type === 'radio' || input.type === 'checkbox') input.checked = false;
            else if (input.type === 'text') input.value = '';
        });
        
        currentQuestionIndex = 0;
        questionsContainer.style.display = 'block';
        document.querySelector('.question').classList.add('active');
        nextBtn.style.display = 'block';
        resultDiv.style.display = 'none';
        restartBtn.style.display = 'none';
        nextBtn.textContent = 'Следующий вопрос';
    });
});