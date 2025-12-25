// ============================================
// ESCAPE ROOM TOURNAMENT - MAIN APPLICATION
// With reading passages and 3 bonus games!
// ============================================

class EscapeRoomGame {
    constructor() {
        this.state = {
            teamName: 'Team Champions',
            playerCount: 2,
            currentRoom: 1,
            currentQuestion: 0,
            score: 0,
            timeRemaining: GAME_DATA.settings.totalTime,
            timerInterval: null,
            attempts: {},
            correctAnswers: 0,
            incorrectAnswers: 0,
            firstTryCorrect: 0,
            trueFalseCorrect: 0,
            bonusGamesPlayed: 0,
            roomScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            questionsAnswered: [],
            isPlaying: false,
            isPaused: false,
            startTime: null,
            showingIntro: false,
            showingMiniGame: false,
            // Bonus game states
            wordNinjaScore: 0,
            wordNinjaTimer: null,
            ticTacToeBoard: Array(9).fill(null),
            ticTacToeQuestionIndex: 0,
            speedTypingScore: 0,
            speedTypingTimer: null,
            speedTypingWordIndex: 0
        };
        this.elements = {};
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.loadSavedData();
        this.showLoadingScreen();
    }

    cacheElements() {
        this.elements.screens = {
            loading: document.getElementById('loading-screen'),
            home: document.getElementById('home-screen'),
            instructions: document.getElementById('instructions-screen'),
            game: document.getElementById('game-screen'),
            transition: document.getElementById('transition-screen'),
            results: document.getElementById('results-screen'),
            leaderboard: document.getElementById('leaderboard-screen')
        };
        this.elements.teamNameInput = document.getElementById('team-name-input');
        this.elements.playerButtons = document.querySelectorAll('.player-btn');
        this.elements.startBtn = document.getElementById('start-btn');
        this.elements.beginBtn = document.getElementById('begin-btn');
        this.elements.displayTeamName = document.getElementById('display-team-name');
        this.elements.timer = document.getElementById('timer');
        this.elements.score = document.getElementById('score');
        this.elements.progressFill = document.getElementById('progress-fill');
        this.elements.progressRooms = document.querySelectorAll('.progress-room');
        this.elements.roomContainer = document.getElementById('room-container');
        this.elements.backBtn = document.getElementById('back-btn');
        this.elements.hintBtn = document.getElementById('hint-btn');
        this.elements.forwardBtn = document.getElementById('forward-btn');
        this.elements.transitionIcon = document.getElementById('transition-icon');
        this.elements.transitionTitle = document.getElementById('transition-title');
        this.elements.transitionMessage = document.getElementById('transition-message');
        this.elements.resultTeamName = document.getElementById('result-team-name');
        this.elements.finalScore = document.getElementById('final-score');
        this.elements.finalTime = document.getElementById('final-time');
        this.elements.finalCorrect = document.getElementById('final-correct');
        this.elements.achievementsList = document.getElementById('achievements-list');
        this.elements.medalDisplay = document.getElementById('medal-display');
        this.elements.playAgainBtn = document.getElementById('play-again-btn');
        this.elements.leaderboardBtn = document.getElementById('leaderboard-btn');
        this.elements.leaderboardList = document.getElementById('leaderboard-list');
        this.elements.backHomeBtn = document.getElementById('back-home-btn');
        this.elements.hintModal = document.getElementById('hint-modal');
        this.elements.hintText = document.getElementById('hint-text');
        this.elements.closeHintBtn = document.getElementById('close-hint-btn');
        this.elements.feedbackModal = document.getElementById('feedback-modal');
        this.elements.feedbackIcon = document.getElementById('feedback-icon');
        this.elements.feedbackTitle = document.getElementById('feedback-title');
        this.elements.feedbackText = document.getElementById('feedback-text');
        this.elements.pointsEarned = document.getElementById('points-earned');
        this.elements.confetti = document.getElementById('confetti');
    }

    bindEvents() {
        this.elements.startBtn.addEventListener('click', () => this.showScreen('instructions'));
        this.elements.beginBtn.addEventListener('click', () => this.startGame());
        this.elements.playerButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.elements.playerButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.state.playerCount = parseInt(btn.dataset.players);
            });
        });
        this.elements.teamNameInput.addEventListener('input', (e) => {
            this.state.teamName = e.target.value || 'Team Champions';
        });
        this.elements.backBtn.addEventListener('click', () => this.goBack());
        this.elements.hintBtn.addEventListener('click', () => this.showHint());
        this.elements.forwardBtn.addEventListener('click', () => this.goForward());
        this.elements.closeHintBtn.addEventListener('click', () => this.hideHint());
        this.elements.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.elements.leaderboardBtn.addEventListener('click', () => this.showLeaderboard());
        this.elements.backHomeBtn.addEventListener('click', () => this.showScreen('home'));
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    showScreen(screenName) {
        Object.values(this.elements.screens).forEach(screen => screen.classList.remove('active'));
        this.elements.screens[screenName].classList.add('active');
    }

    showLoadingScreen() {
        this.showScreen('loading');
        setTimeout(() => this.showScreen('home'), 2500);
    }

    startGame() {
        this.state.teamName = this.elements.teamNameInput.value || 'Team Champions';
        this.state.currentRoom = 1;
        this.state.currentQuestion = 0;
        this.state.score = 0;
        this.state.correctAnswers = 0;
        this.state.incorrectAnswers = 0;
        this.state.firstTryCorrect = 0;
        this.state.trueFalseCorrect = 0;
        this.state.bonusGamesPlayed = 0;
        this.state.attempts = {};
        this.state.roomScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        this.state.questionsAnswered = [];
        this.state.timeRemaining = GAME_DATA.settings.totalTime;
        this.state.isPlaying = true;
        this.state.startTime = Date.now();
        this.elements.displayTeamName.textContent = this.state.teamName;
        this.updateScore();
        this.updateTimer();
        this.updateProgress();
        this.showScreen('game');
        this.startTimer();
        this.showRoomIntro();
    }

    startTimer() {
        this.state.timerInterval = setInterval(() => {
            if (!this.state.isPaused && this.state.isPlaying) {
                this.state.timeRemaining--;
                this.updateTimer();
                if (this.state.timeRemaining <= 0) this.endGame(false);
            }
        }, 1000);
    }

    updateTimer() {
        const minutes = Math.floor(this.state.timeRemaining / 60);
        const seconds = this.state.timeRemaining % 60;
        this.elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const timerDisplay = this.elements.timer.parentElement;
        timerDisplay.classList.remove('warning', 'danger');
        if (this.state.timeRemaining <= 60) timerDisplay.classList.add('danger');
        else if (this.state.timeRemaining <= 180) timerDisplay.classList.add('warning');
    }

    updateScore() {
        this.elements.score.textContent = this.state.score;
    }

    updateProgress() {
        const totalQuestions = this.getTotalQuestions();
        const answered = this.state.questionsAnswered.length;
        const percentage = (answered / totalQuestions) * 100;
        this.elements.progressFill.style.width = `${percentage}%`;
        this.elements.progressRooms.forEach((room, index) => {
            room.classList.remove('active', 'completed');
            if (index + 1 < this.state.currentRoom) room.classList.add('completed');
            else if (index + 1 === this.state.currentRoom) room.classList.add('active');
        });
    }

    getTotalQuestions() {
        let total = 0;
        for (let i = 1; i <= 4; i++) {
            total += GAME_DATA.questions[i].filter(q => q.type !== 'story' && q.type !== 'reading').length;
        }
        return total;
    }

    showRoomIntro() {
        this.state.showingIntro = true;
        const room = GAME_DATA.rooms[this.state.currentRoom - 1];
        this.elements.roomContainer.innerHTML = `
            <div class="room-intro">
                <div class="room-intro-icon">${room.icon}</div>
                <h1 class="room-intro-title">${room.introTitle}</h1>
                <p class="room-intro-desc">${room.introDesc}</p>
                <button class="enter-room-btn" onclick="game.enterRoom()">
                    <span>🚪</span> ENTER
                </button>
            </div>
        `;
        this.updateNavButtons();
    }

    enterRoom() {
        this.state.showingIntro = false;
        this.state.currentQuestion = 0;
        this.renderQuestion();
    }

    renderQuestion() {
        const questions = GAME_DATA.questions[this.state.currentRoom];
        if (!questions || this.state.currentQuestion >= questions.length) {
            this.completeRoom();
            return;
        }
        const question = questions[this.state.currentQuestion];
        const room = GAME_DATA.rooms[this.state.currentRoom - 1];
        let contentHtml = '';

        switch (question.type) {
            case 'story': contentHtml = this.renderStoryScene(question, room); break;
            case 'reading': contentHtml = this.renderReadingPassage(question, room); break;
            case 'true-false': contentHtml = this.renderTrueFalseQuestion(question, room); break;
            case 'fill-blank': contentHtml = this.renderFillBlankQuestion(question, room); break;
            case 'character-select': contentHtml = this.renderCharacterQuestion(question, room); break;
            case 'comparison': contentHtml = this.renderComparisonQuestion(question, room); break;
            case 'recipe': contentHtml = this.renderRecipeQuestion(question, room); break;
            case 'phone': case 'keypad': contentHtml = this.renderPhoneQuestion(question, room); break;
            case 'bonus-game': contentHtml = this.renderBonusGame(question); break;
            default: contentHtml = this.renderDefaultQuestion(question, room);
        }
        this.elements.roomContainer.innerHTML = contentHtml;
        this.updateNavButtons();
        if (question.type !== 'story' && question.type !== 'reading' && question.type !== 'bonus-game') {
            this.bindOptionButtons();
        }
    }

    // READING PASSAGE RENDERER
    renderReadingPassage(question, room) {
        return `
            <div class="question-card reading-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${question.title}</h2>
                </div>
                <div class="reading-passage">
                    <p>${question.passage}</p>
                </div>
                <button class="continue-story-btn" onclick="game.continueFromStory()">
                    ${question.continueText}
                </button>
            </div>
        `;
    }

    renderStoryScene(question, room) {
        return `
            <div class="question-card story-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${room.name}</h2>
                </div>
                <div class="story-container">
                    <h2 class="story-title">${question.title}</h2>
                    <p class="story-narrative">${question.narrative}</p>
                    <div class="story-character">
                        <div class="story-character-icon">${question.character.icon}</div>
                        <div class="story-character-content">
                            <div class="story-character-name">${question.character.name}</div>
                            <div class="story-character-dialogue">"${question.character.dialogue}"</div>
                        </div>
                    </div>
                </div>
                <button class="continue-story-btn" onclick="game.continueFromStory()">
                    ${question.continueText}
                </button>
            </div>
        `;
    }

    continueFromStory() {
        this.state.currentQuestion++;
        this.renderQuestion();
    }

    renderTrueFalseQuestion(question, room) {
        const questionNumber = this.getActualQuestionNumber();
        const totalQuestions = this.getActualTotalInRoom();
        return `
            <div class="question-card true-false-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${room.name}</h2>
                    <p class="room-subtitle">Question ${questionNumber} of ${totalQuestions}</p>
                </div>
                <div class="true-false-badge">TRUE or FALSE?</div>
                <div class="statement-box">
                    <p class="statement-text">"${question.statement}"</p>
                </div>
                <div class="options-container true-false-options">
                    <button class="option-btn true-btn" data-answer="true" data-correct="${question.correctAnswer === true}">
                        <span class="option-icon">✓</span>
                        <span class="option-text">TRUE</span>
                    </button>
                    <button class="option-btn false-btn" data-answer="false" data-correct="${question.correctAnswer === false}">
                        <span class="option-icon">✗</span>
                        <span class="option-text">FALSE</span>
                    </button>
                </div>
            </div>
        `;
    }

    renderFillBlankQuestion(question, room) {
        const questionNumber = this.getActualQuestionNumber();
        const totalQuestions = this.getActualTotalInRoom();
        return `
            <div class="question-card fill-blank-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${room.name}</h2>
                    <p class="room-subtitle">Question ${questionNumber} of ${totalQuestions}</p>
                </div>
                <div class="context-box"><p class="context-text">${question.context}</p></div>
                <div class="sentence-box"><p class="sentence-text">"${question.sentence}"</p></div>
                <div class="options-container">${this.renderOptions(question.options)}</div>
            </div>
        `;
    }

    getActualQuestionNumber() {
        const questions = GAME_DATA.questions[this.state.currentRoom];
        let count = 0;
        for (let i = 0; i <= this.state.currentQuestion; i++) {
            if (questions[i].type !== 'story' && questions[i].type !== 'reading') count++;
        }
        return count;
    }

    getActualTotalInRoom() {
        const questions = GAME_DATA.questions[this.state.currentRoom];
        return questions.filter(q => q.type !== 'story' && q.type !== 'reading' && q.type !== 'bonus-game').length;
    }

    renderCharacterQuestion(question, room) {
        const questionNumber = this.getActualQuestionNumber();
        const totalQuestions = this.getActualTotalInRoom();
        return `
            <div class="question-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${room.name}</h2>
                    <p class="room-subtitle">Question ${questionNumber} of ${totalQuestions}</p>
                </div>
                <div class="character-display">
                    <div class="character-icon">${question.character.icon}</div>
                    <h3 class="character-name">${question.character.name}</h3>
                    <p class="character-desc">"${question.character.description}"</p>
                </div>
                <div class="question-text">${question.question}</div>
                <div class="options-container">${this.renderOptions(question.options)}</div>
            </div>
        `;
    }

    renderComparisonQuestion(question, room) {
        const questionNumber = this.getActualQuestionNumber();
        const totalQuestions = this.getActualTotalInRoom();
        return `
            <div class="question-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${room.name}</h2>
                    <p class="room-subtitle">Question ${questionNumber} of ${totalQuestions}</p>
                </div>
                <div class="comparison-display">
                    <div class="comparison-item">
                        <div class="comparison-icon">${question.comparison.item1.icon}</div>
                        <div class="comparison-label">${question.comparison.item1.label}</div>
                    </div>
                    <div class="comparison-vs">VS</div>
                    <div class="comparison-item">
                        <div class="comparison-icon">${question.comparison.item2.icon}</div>
                        <div class="comparison-label">${question.comparison.item2.label}</div>
                    </div>
                </div>
                <div class="question-text">${question.question}</div>
                <div class="options-container">${this.renderOptions(question.options)}</div>
            </div>
        `;
    }

    renderRecipeQuestion(question, room) {
        const questionNumber = this.getActualQuestionNumber();
        const totalQuestions = this.getActualTotalInRoom();
        return `
            <div class="question-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${room.name}</h2>
                    <p class="room-subtitle">Question ${questionNumber} of ${totalQuestions}</p>
                </div>
                <div class="recipe-display">
                    <div class="recipe-title">📜 Recipe</div>
                    <div class="recipe-step">${question.recipeStep}</div>
                    ${question.displayImage ? `<div class="recipe-image">${question.displayImage}</div>` : ''}
                </div>
                <div class="question-text">${question.question}</div>
                <div class="options-container">${this.renderOptions(question.options)}</div>
            </div>
        `;
    }

    renderPhoneQuestion(question, room) {
        const questionNumber = this.getActualQuestionNumber();
        const totalQuestions = this.getActualTotalInRoom();
        return `
            <div class="question-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${room.name}</h2>
                    <p class="room-subtitle">Question ${questionNumber} of ${totalQuestions}</p>
                </div>
                <div class="phone-display">
                    <div class="phone-screen">
                        <div class="phone-icon">📞</div>
                        <div class="phone-text">${question.phoneDisplay}</div>
                        <div class="phone-action">${question.phoneAction}</div>
                    </div>
                </div>
                <div class="question-text">${question.question}</div>
                <div class="options-container">${this.renderOptions(question.options)}</div>
            </div>
        `;
    }

    renderDefaultQuestion(question, room) {
        const questionNumber = this.getActualQuestionNumber();
        const totalQuestions = this.getActualTotalInRoom();
        return `
            <div class="question-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${room.name}</h2>
                    <p class="room-subtitle">Question ${questionNumber} of ${totalQuestions}</p>
                </div>
                <div class="question-text">${question.question}</div>
                <div class="options-container">${this.renderOptions(question.options)}</div>
            </div>
        `;
    }

    renderOptions(options) {
        return options.map(option => `
            <button class="option-btn" data-letter="${option.letter}" data-correct="${option.correct}">
                <span class="option-letter">${option.letter}</span>
                <span class="option-text">${option.text}</span>
            </button>
        `).join('');
    }

    bindOptionButtons() {
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.addEventListener('click', () => this.selectOption(btn)));
    }

    // ============================================
    // BONUS GAMES
    // ============================================

    renderBonusGame(question) {
        const gameType = question.gameType;
        const gameData = GAME_DATA.bonusGames[gameType];

        switch (gameType) {
            case 'wordCatcher': return this.renderWordNinja(gameData);
            case 'ticTacToe': return this.renderTicTacToe(gameData);
            case 'speedTyping': return this.renderSpeedTyping(gameData);
            default: return '<p>Unknown game</p>';
        }
    }

    // GAME 1: WORD NINJA
    renderWordNinja(gameData) {
        this.state.wordNinjaScore = 0;
        return `
            <div class="bonus-game-card word-ninja-game">
                <h2 class="bonus-game-title">${gameData.title}</h2>
                <p class="bonus-game-instruction">${gameData.instruction}</p>
                <div class="word-ninja-stats">
                    <span class="ninja-score">Score: <strong id="ninja-score">0</strong> / 10</span>
                    <span class="ninja-timer">Time: <strong id="ninja-timer">60</strong>s</span>
                </div>
                <div class="word-ninja-arena" id="ninja-arena"></div>
                <button class="bonus-game-start" onclick="game.startWordNinja()">START GAME!</button>
            </div>
        `;
    }

    startWordNinja() {
        const gameData = GAME_DATA.bonusGames.wordCatcher;
        this.state.wordNinjaScore = 0;
        let timeLeft = gameData.timeLimit;
        const arena = document.getElementById('ninja-arena');
        const scoreEl = document.getElementById('ninja-score');
        const timerEl = document.getElementById('ninja-timer');
        document.querySelector('.bonus-game-start').style.display = 'none';

        // Spawn words
        const spawnWord = () => {
            if (this.state.wordNinjaScore >= 10 || timeLeft <= 0) return;

            const isBomb = Math.random() < 0.25;
            const word = document.createElement('div');
            word.className = isBomb ? 'falling-item bomb' : 'falling-item word';
            word.textContent = isBomb ? '💣' : gameData.words[Math.floor(Math.random() * gameData.words.length)];
            word.style.left = Math.random() * 80 + 10 + '%';
            word.style.animationDuration = (3 + Math.random() * 2) + 's';

            word.addEventListener('click', () => {
                if (isBomb) {
                    this.state.wordNinjaScore = Math.max(0, this.state.wordNinjaScore - 2);
                    word.classList.add('exploded');
                } else {
                    this.state.wordNinjaScore++;
                    word.classList.add('caught');
                }
                scoreEl.textContent = this.state.wordNinjaScore;
                setTimeout(() => word.remove(), 300);

                if (this.state.wordNinjaScore >= 10) {
                    clearInterval(this.state.wordNinjaTimer);
                    this.endWordNinja(true, timeLeft);
                }
            });

            arena.appendChild(word);
            setTimeout(() => { if (word.parentNode) word.remove(); }, 5000);
        };

        const spawnInterval = setInterval(spawnWord, 800);

        this.state.wordNinjaTimer = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(this.state.wordNinjaTimer);
                clearInterval(spawnInterval);
                this.endWordNinja(this.state.wordNinjaScore >= 10, timeLeft);
            }
        }, 1000);
    }

    endWordNinja(won, timeLeft) {
        const arena = document.getElementById('ninja-arena');
        arena.innerHTML = won
            ? `<div class="game-result win">🎉 YOU WIN! Score: ${this.state.wordNinjaScore}</div>`
            : `<div class="game-result lose">Time's up! Score: ${this.state.wordNinjaScore}/10</div>`;

        const points = won ? 50 : this.state.wordNinjaScore * 5;
        this.state.score += points;
        this.state.bonusGamesPlayed++;
        this.updateScore();

        setTimeout(() => {
            this.state.currentQuestion++;
            this.renderQuestion();
        }, 2500);
    }

    // GAME 2: TIC-TAC-TOE
    renderTicTacToe(gameData) {
        this.state.ticTacToeBoard = Array(9).fill(null);
        this.state.ticTacToeQuestionIndex = 0;
        return `
            <div class="bonus-game-card tictactoe-game">
                <h2 class="bonus-game-title">${gameData.title}</h2>
                <p class="bonus-game-instruction">${gameData.instruction}</p>
                <div class="ttt-container">
                    <div class="ttt-board" id="ttt-board">
                        ${Array(9).fill('').map((_, i) => `<div class="ttt-cell" data-index="${i}" onclick="game.selectTTTCell(${i})"></div>`).join('')}
                    </div>
                </div>
                <div class="ttt-question" id="ttt-question">Click any cell to start!</div>
            </div>
        `;
    }

    selectTTTCell(index) {
        if (this.state.ticTacToeBoard[index]) return;

        const gameData = GAME_DATA.bonusGames.ticTacToe;
        const questionData = gameData.questions[this.state.ticTacToeQuestionIndex % gameData.questions.length];
        const questionEl = document.getElementById('ttt-question');

        questionEl.innerHTML = `
            <p><strong>${questionData.q}</strong></p>
            <div class="ttt-options">
                <button onclick="game.answerTTT(${index}, true)">${questionData.a}</button>
                <button onclick="game.answerTTT(${index}, false)">${questionData.wrong}</button>
            </div>
        `;
    }

    answerTTT(index, correct) {
        const board = this.state.ticTacToeBoard;
        const cell = document.querySelector(`.ttt-cell[data-index="${index}"]`);

        if (correct) {
            board[index] = 'X';
            cell.textContent = '❌';
            cell.classList.add('x');
        } else {
            board[index] = 'O';
            cell.textContent = '⭕';
            cell.classList.add('o');
        }

        this.state.ticTacToeQuestionIndex++;

        const winner = this.checkTTTWinner();
        if (winner) {
            this.endTicTacToe(winner);
        } else if (board.every(cell => cell !== null)) {
            this.endTicTacToe('draw');
        } else {
            document.getElementById('ttt-question').textContent = 'Click another cell!';
            // AI move for O (simple random)
            if (!correct) {
                const emptyCells = board.map((v, i) => v === null ? i : -1).filter(i => i !== -1);
                if (emptyCells.length > 0) {
                    setTimeout(() => {
                        const aiMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                        if (board[aiMove] === null) {
                            board[aiMove] = 'O';
                            document.querySelector(`.ttt-cell[data-index="${aiMove}"]`).textContent = '⭕';
                            document.querySelector(`.ttt-cell[data-index="${aiMove}"]`).classList.add('o');
                        }
                    }, 500);
                }
            }
        }
    }

    checkTTTWinner() {
        const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        const board = this.state.ticTacToeBoard;
        for (const [a,b,c] of lines) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    endTicTacToe(result) {
        const questionEl = document.getElementById('ttt-question');
        let points = 0;
        if (result === 'X') {
            questionEl.innerHTML = '<div class="game-result win">🎉 YOU WIN!</div>';
            points = 50;
        } else if (result === 'O') {
            questionEl.innerHTML = '<div class="game-result lose">❌ You lost!</div>';
            points = 10;
        } else {
            questionEl.innerHTML = '<div class="game-result">🤝 Draw!</div>';
            points = 25;
        }

        this.state.score += points;
        this.state.bonusGamesPlayed++;
        this.updateScore();

        setTimeout(() => {
            this.state.currentQuestion++;
            this.renderQuestion();
        }, 2500);
    }

    // GAME 3: SPEED TYPING
    renderSpeedTyping(gameData) {
        this.state.speedTypingScore = 0;
        this.state.speedTypingWordIndex = 0;
        return `
            <div class="bonus-game-card speed-typing-game">
                <h2 class="bonus-game-title">${gameData.title}</h2>
                <p class="bonus-game-instruction">${gameData.instruction}</p>
                <div class="typing-stats">
                    <span>Words: <strong id="typing-score">0</strong></span>
                    <span>Time: <strong id="typing-timer">30</strong>s</span>
                </div>
                <div class="typing-word" id="typing-word">Click Start!</div>
                <input type="text" id="typing-input" class="typing-input" placeholder="Type here..." disabled autocomplete="off">
                <button class="bonus-game-start" onclick="game.startSpeedTyping()">START!</button>
            </div>
        `;
    }

    startSpeedTyping() {
        const gameData = GAME_DATA.bonusGames.speedTyping;
        let timeLeft = gameData.timeLimit;
        this.state.speedTypingScore = 0;
        this.state.speedTypingWordIndex = 0;

        const wordEl = document.getElementById('typing-word');
        const inputEl = document.getElementById('typing-input');
        const timerEl = document.getElementById('typing-timer');
        const scoreEl = document.getElementById('typing-score');

        document.querySelector('.bonus-game-start').style.display = 'none';
        inputEl.disabled = false;
        inputEl.focus();

        const showNextWord = () => {
            wordEl.textContent = gameData.words[this.state.speedTypingWordIndex % gameData.words.length];
            inputEl.value = '';
        };

        showNextWord();

        inputEl.addEventListener('input', () => {
            if (inputEl.value.toLowerCase().trim() === wordEl.textContent.toLowerCase()) {
                this.state.speedTypingScore++;
                this.state.speedTypingWordIndex++;
                scoreEl.textContent = this.state.speedTypingScore;
                showNextWord();
            }
        });

        this.state.speedTypingTimer = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(this.state.speedTypingTimer);
                inputEl.disabled = true;
                this.endSpeedTyping();
            }
        }, 1000);
    }

    endSpeedTyping() {
        const wordEl = document.getElementById('typing-word');
        const points = this.state.speedTypingScore * 5;
        wordEl.innerHTML = `<div class="game-result win">Done! ${this.state.speedTypingScore} words = ${points} pts</div>`;

        this.state.score += points;
        this.state.bonusGamesPlayed++;
        this.updateScore();

        setTimeout(() => {
            this.state.currentQuestion++;
            this.renderQuestion();
        }, 2500);
    }

    // ============================================
    // MINI-GAMES BETWEEN UNITS
    // ============================================

    showMiniGame(roomNumber) {
        const miniGame = GAME_DATA.miniGames[roomNumber];
        if (!miniGame) { this.proceedToNextRoom(); return; }
        this.state.showingMiniGame = true;
        let html = '';
        switch (miniGame.type) {
            case 'word-scramble': html = this.renderWordScramble(miniGame); break;
            case 'emoji-match': html = this.renderEmojiMatch(miniGame); break;
            case 'quick-sort': html = this.renderQuickSort(miniGame); break;
            default: this.proceedToNextRoom(); return;
        }
        this.elements.roomContainer.innerHTML = html;
    }

    renderWordScramble(miniGame) {
        const letters = miniGame.scrambled.split('').sort(() => Math.random() - 0.5).join('');
        return `
            <div class="mini-game-card">
                <h2 class="mini-game-title">${miniGame.title}</h2>
                <p class="mini-game-instruction">${miniGame.instruction}</p>
                <div class="scrambled-letters">
                    ${letters.split('').map(l => `<span class="scramble-letter">${l}</span>`).join('')}
                </div>
                <input type="text" id="scramble-answer" class="scramble-input" placeholder="Type answer..." maxlength="10" autocomplete="off">
                <p class="mini-game-hint">💡 ${miniGame.hint}</p>
                <button class="mini-game-submit" onclick="game.checkWordScramble('${miniGame.answer}', ${miniGame.points})">CHECK</button>
                <button class="mini-game-skip" onclick="game.skipMiniGame()">Skip →</button>
            </div>
        `;
    }

    checkWordScramble(answer, points) {
        const userAnswer = document.getElementById('scramble-answer').value.toUpperCase().trim();
        if (userAnswer === answer) {
            this.state.score += points;
            this.updateScore();
            this.showFeedback(true, `Correct! ${answer}!`, points);
            setTimeout(() => this.proceedToNextRoom(), 2000);
        } else {
            this.showFeedback(false, 'Try again!', 0);
        }
    }

    renderEmojiMatch(miniGame) {
        return `
            <div class="mini-game-card">
                <h2 class="mini-game-title">${miniGame.title}</h2>
                <p class="mini-game-instruction">${miniGame.instruction}</p>
                <div class="emoji-match-container">
                    ${miniGame.pairs.map((p, i) => `
                        <button class="word-item" onclick="game.matchEmoji(this)">${p.emoji} ${p.word}</button>
                    `).join('')}
                </div>
                <button class="mini-game-skip" onclick="game.skipMiniGame()">Skip →</button>
            </div>
        `;
    }

    matchEmoji(button) {
        button.classList.add('matched');
        button.disabled = true;
        const matched = document.querySelectorAll('.word-item.matched').length;
        if (matched >= 3) {
            this.state.score += 15;
            this.updateScore();
            this.showFeedback(true, 'All matched!', 15);
            setTimeout(() => this.proceedToNextRoom(), 2000);
        }
    }

    renderQuickSort(miniGame) {
        const shuffled = [...miniGame.items].map((item, i) => ({item, origIndex: i})).sort(() => Math.random() - 0.5);
        return `
            <div class="mini-game-card">
                <h2 class="mini-game-title">${miniGame.title}</h2>
                <p class="mini-game-instruction">${miniGame.instruction}</p>
                <div class="sort-container" id="sort-container">
                    ${shuffled.map(({item, origIndex}) => `
                        <button class="sort-item" data-index="${origIndex}" onclick="game.selectSortItem(this)">${item}</button>
                    `).join('')}
                </div>
                <button class="mini-game-submit" onclick="game.checkSortOrder()">CHECK</button>
                <button class="mini-game-skip" onclick="game.skipMiniGame()">Skip →</button>
            </div>
        `;
    }

    selectSortItem(button) {
        if (button.classList.contains('selected')) return;
        button.classList.add('selected');
        if (!this.sortOrder) this.sortOrder = [];
        this.sortOrder.push(parseInt(button.dataset.index));
    }

    checkSortOrder() {
        const miniGame = GAME_DATA.miniGames[this.state.currentRoom];
        if (!this.sortOrder || this.sortOrder.length !== miniGame.correctOrder.length) {
            this.showFeedback(false, 'Select all items!', 0);
            return;
        }
        if (this.sortOrder.every((val, idx) => val === miniGame.correctOrder[idx])) {
            this.state.score += miniGame.points;
            this.updateScore();
            this.showFeedback(true, 'Perfect order!', miniGame.points);
            setTimeout(() => this.proceedToNextRoom(), 2000);
        } else {
            this.showFeedback(false, 'Wrong order!', 0);
            this.sortOrder = [];
            document.querySelectorAll('.sort-item').forEach(btn => btn.classList.remove('selected'));
        }
    }

    skipMiniGame() { this.proceedToNextRoom(); }

    proceedToNextRoom() {
        this.state.showingMiniGame = false;
        this.sortOrder = null;
        this.state.currentRoom++;
        this.showScreen('game');
        this.showRoomIntro();
    }

    // ============================================
    // ANSWER HANDLING
    // ============================================

    selectOption(button) {
        const questions = GAME_DATA.questions[this.state.currentRoom];
        const question = questions[this.state.currentQuestion];
        const questionKey = `${this.state.currentRoom}-${this.state.currentQuestion}`;
        const isCorrect = button.dataset.correct === 'true';

        if (!this.state.attempts[questionKey]) this.state.attempts[questionKey] = 0;
        this.state.attempts[questionKey]++;

        document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

        if (isCorrect) {
            let points = 0;
            const attempt = this.state.attempts[questionKey];
            if (attempt === 1) { points = 10; this.state.firstTryCorrect++; }
            else if (attempt === 2) points = 5;
            else points = 2;

            this.state.score += points;
            this.state.correctAnswers++;
            this.state.roomScores[this.state.currentRoom]++;
            if (question.type === 'true-false') this.state.trueFalseCorrect++;

            button.classList.add('correct');
            let feedbackText = question.correctFeedback || question.explanation || 'Correct!';
            this.showFeedback(true, feedbackText, points);

            if (!this.state.questionsAnswered.includes(questionKey)) {
                this.state.questionsAnswered.push(questionKey);
            }

            setTimeout(() => this.nextQuestion(), GAME_DATA.settings.autoAdvanceDelay);
        } else {
            this.state.incorrectAnswers++;
            button.classList.add('incorrect');
            let feedbackText = question.incorrectFeedback || 'Try again!';
            this.showFeedback(false, feedbackText, 0);

            setTimeout(() => {
                document.querySelectorAll('.option-btn').forEach(btn => {
                    if (!btn.classList.contains('incorrect')) btn.disabled = false;
                });
            }, GAME_DATA.settings.feedbackDuration);
        }

        this.updateScore();
        this.updateProgress();
    }

    showFeedback(isCorrect, message, points) {
        this.elements.feedbackIcon.textContent = isCorrect ? '✅' : '❌';
        this.elements.feedbackIcon.className = `feedback-icon ${isCorrect ? 'success' : 'error'}`;
        this.elements.feedbackTitle.textContent = isCorrect ? 'Correct!' : 'Try Again!';
        this.elements.feedbackText.textContent = message;
        this.elements.pointsEarned.textContent = isCorrect ? `+${points} pts` : '';
        this.elements.pointsEarned.style.display = isCorrect ? 'block' : 'none';
        this.elements.feedbackModal.classList.add('active');
        setTimeout(() => this.elements.feedbackModal.classList.remove('active'), GAME_DATA.settings.feedbackDuration);
    }

    nextQuestion() {
        this.state.currentQuestion++;
        const questions = GAME_DATA.questions[this.state.currentRoom];
        if (this.state.currentQuestion >= questions.length) {
            this.completeRoom();
        } else {
            this.renderQuestion();
        }
    }

    completeRoom() {
        const room = GAME_DATA.rooms[this.state.currentRoom - 1];
        this.elements.transitionIcon.textContent = '🔓';
        this.elements.transitionTitle.textContent = room.completionMessage;
        this.elements.transitionMessage.textContent = room.completionDesc;
        this.showScreen('transition');

        setTimeout(() => {
            if (this.state.currentRoom < 4 && GAME_DATA.miniGames[this.state.currentRoom]) {
                this.showScreen('game');
                this.showMiniGame(this.state.currentRoom);
            } else if (this.state.currentRoom < 4) {
                this.state.currentRoom++;
                this.showScreen('game');
                this.showRoomIntro();
            } else if (this.state.currentRoom === 4) {
                this.offerBonusRound();
            } else {
                this.endGame(true);
            }
        }, 2500);
    }

    offerBonusRound() {
        this.elements.transitionIcon.textContent = '🎮';
        this.elements.transitionTitle.textContent = 'BONUS GAMES!';
        this.elements.transitionMessage.innerHTML = `
            Play 3 fun games for bonus points!<br><br>
            <button class="big-button" onclick="game.startBonusRound()" style="margin: 10px;">
                <span class="btn-icon">🎮</span> PLAY GAMES
            </button>
            <button class="big-button secondary" onclick="game.endGame(true)" style="margin: 10px;">
                <span class="btn-icon">🏆</span> FINISH
            </button>
        `;
        this.showScreen('transition');
    }

    startBonusRound() {
        this.state.currentRoom = 5;
        this.showScreen('game');
        this.showRoomIntro();
    }

    endGame(completed) {
        this.state.isPlaying = false;
        clearInterval(this.state.timerInterval);

        const timeUsed = GAME_DATA.settings.totalTime - this.state.timeRemaining;
        const minutes = Math.floor(timeUsed / 60);
        const seconds = timeUsed % 60;

        const stats = {
            unit1Correct: this.state.roomScores[1],
            unit2Correct: this.state.roomScores[2],
            unit3Correct: this.state.roomScores[3],
            unit4Correct: this.state.roomScores[4],
            unit5Correct: this.state.roomScores[5],
            timeRemaining: this.state.timeRemaining,
            firstTryCorrect: this.state.firstTryCorrect,
            totalQuestions: this.state.questionsAnswered.length,
            trueFalseCorrect: this.state.trueFalseCorrect,
            bonusGamesPlayed: this.state.bonusGamesPlayed,
            readingCorrect: this.state.trueFalseCorrect,
            completed: completed
        };

        this.elements.resultTeamName.textContent = this.state.teamName;
        this.elements.finalScore.textContent = this.state.score;
        this.elements.finalTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.elements.finalCorrect.textContent = this.state.correctAnswers;

        let medal = '🏆';
        if (this.state.score >= 250) medal = '🥇';
        else if (this.state.score >= 180) medal = '🥈';
        else if (this.state.score >= 120) medal = '🥉';
        this.elements.medalDisplay.textContent = medal;

        const earnedAchievements = GAME_DATA.achievements.filter(a => a.condition(stats));
        this.elements.achievementsList.innerHTML = earnedAchievements.map(a => `
            <div class="achievement">
                <span class="achievement-icon">${a.icon}</span>
                <span>${a.name}</span>
            </div>
        `).join('');

        this.saveToLeaderboard();
        this.showScreen('results');
        this.createConfetti();
    }

    updateNavButtons() {
        const questions = GAME_DATA.questions[this.state.currentRoom];
        this.elements.backBtn.disabled = this.state.currentQuestion === 0 && this.state.currentRoom === 1;
        const questionKey = `${this.state.currentRoom}-${this.state.currentQuestion}`;
        const currentQuestion = questions ? questions[this.state.currentQuestion] : null;
        const isStoryOrReading = currentQuestion && (currentQuestion.type === 'story' || currentQuestion.type === 'reading');
        this.elements.forwardBtn.disabled = (!this.state.questionsAnswered.includes(questionKey) && !isStoryOrReading) || this.state.showingIntro;
        this.elements.hintBtn.style.display = isStoryOrReading ? 'none' : 'flex';
    }

    goBack() {
        if (this.state.showingIntro && this.state.currentRoom > 1) {
            this.state.currentRoom--;
            this.showRoomIntro();
        } else if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.renderQuestion();
        }
    }

    goForward() {
        if (this.state.showingIntro) {
            this.enterRoom();
        } else {
            const questions = GAME_DATA.questions[this.state.currentRoom];
            const currentQuestion = questions[this.state.currentQuestion];
            if (currentQuestion && (currentQuestion.type === 'story' || currentQuestion.type === 'reading')) {
                this.continueFromStory();
            } else {
                this.nextQuestion();
            }
        }
    }

    showHint() {
        const questions = GAME_DATA.questions[this.state.currentRoom];
        const question = questions[this.state.currentQuestion];
        if (question && question.hint) {
            this.elements.hintText.textContent = question.hint;
            this.elements.hintModal.classList.add('active');
        }
    }

    hideHint() { this.elements.hintModal.classList.remove('active'); }

    handleKeyboard(e) {
        if (!this.state.isPlaying) return;
        const keyMap = { 'a': 'A', 'b': 'B', 'c': 'C', 'd': 'D' };
        if (keyMap[e.key.toLowerCase()]) {
            const btn = document.querySelector(`.option-btn[data-letter="${keyMap[e.key.toLowerCase()]}"]`);
            if (btn && !btn.disabled) btn.click();
        }
        if (e.key.toLowerCase() === 't') {
            const btn = document.querySelector('.option-btn.true-btn');
            if (btn && !btn.disabled) btn.click();
        }
        if (e.key.toLowerCase() === 'f') {
            const btn = document.querySelector('.option-btn.false-btn');
            if (btn && !btn.disabled) btn.click();
        }
        if (e.key === 'Enter') {
            const continueBtn = document.querySelector('.continue-story-btn');
            if (continueBtn) continueBtn.click();
        }
    }

    saveToLeaderboard() {
        let leaderboard = JSON.parse(localStorage.getItem('escapeRoomLeaderboard') || '[]');
        leaderboard.push({
            teamName: this.state.teamName,
            score: this.state.score,
            time: GAME_DATA.settings.totalTime - this.state.timeRemaining,
            date: new Date().toLocaleDateString()
        });
        leaderboard.sort((a, b) => b.score !== a.score ? b.score - a.score : a.time - b.time);
        leaderboard = leaderboard.slice(0, 10);
        localStorage.setItem('escapeRoomLeaderboard', JSON.stringify(leaderboard));
    }

    showLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('escapeRoomLeaderboard') || '[]');
        this.elements.leaderboardList.innerHTML = leaderboard.map((entry, index) => {
            let medalClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
            return `
                <div class="leaderboard-entry ${medalClass}">
                    <span class="leaderboard-rank">${index < 3 ? ['🥇','🥈','🥉'][index] : index + 1}</span>
                    <span class="leaderboard-name">${entry.teamName}</span>
                    <span class="leaderboard-score">${entry.score} pts</span>
                </div>
            `;
        }).join('') || '<p>No entries yet!</p>';
        this.showScreen('leaderboard');
    }

    loadSavedData() {}

    resetGame() {
        clearInterval(this.state.timerInterval);
        clearInterval(this.state.wordNinjaTimer);
        clearInterval(this.state.speedTypingTimer);
        this.state = {
            teamName: 'Team Champions', playerCount: 2, currentRoom: 1, currentQuestion: 0,
            score: 0, timeRemaining: GAME_DATA.settings.totalTime, timerInterval: null,
            attempts: {}, correctAnswers: 0, incorrectAnswers: 0, firstTryCorrect: 0,
            trueFalseCorrect: 0, bonusGamesPlayed: 0, roomScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            questionsAnswered: [], isPlaying: false, isPaused: false, startTime: null,
            showingIntro: false, showingMiniGame: false, wordNinjaScore: 0, wordNinjaTimer: null,
            ticTacToeBoard: Array(9).fill(null), ticTacToeQuestionIndex: 0,
            speedTypingScore: 0, speedTypingTimer: null, speedTypingWordIndex: 0
        };
        this.elements.confetti.innerHTML = '';
        this.showScreen('home');
    }

    createConfetti() {
        this.elements.confetti.innerHTML = '';
        const colors = ['#f39c12', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#1abc9c'];
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                this.elements.confetti.appendChild(confetti);
                setTimeout(() => confetti.remove(), 5000);
            }, i * 30);
        }
    }
}

let game;
document.addEventListener('DOMContentLoaded', () => { game = new EscapeRoomGame(); });
window.game = game;
