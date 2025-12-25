// ============================================
// ESCAPE ROOM TOURNAMENT - MAIN APPLICATION
// ============================================

class EscapeRoomGame {
    constructor() {
        // Game state
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
            roomScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            questionsAnswered: [],
            isPlaying: false,
            isPaused: false,
            startTime: null,
            showingIntro: false
        };

        // DOM elements cache
        this.elements = {};

        // Initialize
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.loadSavedData();
        this.showLoadingScreen();
    }

    cacheElements() {
        // Screens
        this.elements.screens = {
            loading: document.getElementById('loading-screen'),
            home: document.getElementById('home-screen'),
            instructions: document.getElementById('instructions-screen'),
            game: document.getElementById('game-screen'),
            transition: document.getElementById('transition-screen'),
            results: document.getElementById('results-screen'),
            leaderboard: document.getElementById('leaderboard-screen')
        };

        // Home screen elements
        this.elements.teamNameInput = document.getElementById('team-name-input');
        this.elements.playerButtons = document.querySelectorAll('.player-btn');
        this.elements.startBtn = document.getElementById('start-btn');
        this.elements.beginBtn = document.getElementById('begin-btn');

        // Game screen elements
        this.elements.displayTeamName = document.getElementById('display-team-name');
        this.elements.timer = document.getElementById('timer');
        this.elements.score = document.getElementById('score');
        this.elements.progressFill = document.getElementById('progress-fill');
        this.elements.progressRooms = document.querySelectorAll('.progress-room');
        this.elements.roomContainer = document.getElementById('room-container');

        // Navigation buttons
        this.elements.backBtn = document.getElementById('back-btn');
        this.elements.hintBtn = document.getElementById('hint-btn');
        this.elements.forwardBtn = document.getElementById('forward-btn');

        // Transition screen
        this.elements.transitionIcon = document.getElementById('transition-icon');
        this.elements.transitionTitle = document.getElementById('transition-title');
        this.elements.transitionMessage = document.getElementById('transition-message');

        // Results screen
        this.elements.resultTeamName = document.getElementById('result-team-name');
        this.elements.finalScore = document.getElementById('final-score');
        this.elements.finalTime = document.getElementById('final-time');
        this.elements.finalCorrect = document.getElementById('final-correct');
        this.elements.achievementsList = document.getElementById('achievements-list');
        this.elements.medalDisplay = document.getElementById('medal-display');
        this.elements.playAgainBtn = document.getElementById('play-again-btn');
        this.elements.leaderboardBtn = document.getElementById('leaderboard-btn');

        // Leaderboard
        this.elements.leaderboardList = document.getElementById('leaderboard-list');
        this.elements.backHomeBtn = document.getElementById('back-home-btn');

        // Modals
        this.elements.hintModal = document.getElementById('hint-modal');
        this.elements.hintText = document.getElementById('hint-text');
        this.elements.closeHintBtn = document.getElementById('close-hint-btn');
        this.elements.feedbackModal = document.getElementById('feedback-modal');
        this.elements.feedbackIcon = document.getElementById('feedback-icon');
        this.elements.feedbackTitle = document.getElementById('feedback-title');
        this.elements.feedbackText = document.getElementById('feedback-text');
        this.elements.pointsEarned = document.getElementById('points-earned');

        // Confetti container
        this.elements.confetti = document.getElementById('confetti');
    }

    bindEvents() {
        // Home screen
        this.elements.startBtn.addEventListener('click', () => this.showScreen('instructions'));
        this.elements.beginBtn.addEventListener('click', () => this.startGame());

        // Player count buttons
        this.elements.playerButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.elements.playerButtons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.state.playerCount = parseInt(btn.dataset.players);
            });
        });

        // Team name input
        this.elements.teamNameInput.addEventListener('input', (e) => {
            this.state.teamName = e.target.value || 'Team Champions';
        });

        // Navigation buttons
        this.elements.backBtn.addEventListener('click', () => this.goBack());
        this.elements.hintBtn.addEventListener('click', () => this.showHint());
        this.elements.forwardBtn.addEventListener('click', () => this.goForward());

        // Modal close
        this.elements.closeHintBtn.addEventListener('click', () => this.hideHint());

        // Results screen
        this.elements.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.elements.leaderboardBtn.addEventListener('click', () => this.showLeaderboard());
        this.elements.backHomeBtn.addEventListener('click', () => this.showScreen('home'));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    // ============================================
    // SCREEN MANAGEMENT
    // ============================================

    showScreen(screenName) {
        Object.values(this.elements.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        this.elements.screens[screenName].classList.add('active');
    }

    showLoadingScreen() {
        this.showScreen('loading');
        setTimeout(() => {
            this.showScreen('home');
        }, 2500);
    }

    // ============================================
    // GAME FLOW
    // ============================================

    startGame() {
        this.state.teamName = this.elements.teamNameInput.value || 'Team Champions';
        this.state.currentRoom = 1;
        this.state.currentQuestion = 0;
        this.state.score = 0;
        this.state.correctAnswers = 0;
        this.state.incorrectAnswers = 0;
        this.state.firstTryCorrect = 0;
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

                if (this.state.timeRemaining <= 0) {
                    this.endGame(false);
                }
            }
        }, 1000);
    }

    updateTimer() {
        const minutes = Math.floor(this.state.timeRemaining / 60);
        const seconds = this.state.timeRemaining % 60;
        this.elements.timer.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Timer warnings
        const timerDisplay = this.elements.timer.parentElement;
        timerDisplay.classList.remove('warning', 'danger');

        if (this.state.timeRemaining <= 60) {
            timerDisplay.classList.add('danger');
        } else if (this.state.timeRemaining <= 180) {
            timerDisplay.classList.add('warning');
        }
    }

    updateScore() {
        this.elements.score.textContent = this.state.score;
    }

    updateProgress() {
        const totalQuestions = this.getTotalQuestions();
        const answered = this.state.questionsAnswered.length;
        const percentage = (answered / totalQuestions) * 100;
        this.elements.progressFill.style.width = `${percentage}%`;

        // Update room indicators
        this.elements.progressRooms.forEach((room, index) => {
            room.classList.remove('active', 'completed');
            if (index + 1 < this.state.currentRoom) {
                room.classList.add('completed');
            } else if (index + 1 === this.state.currentRoom) {
                room.classList.add('active');
            }
        });
    }

    getTotalQuestions() {
        let total = 0;
        for (let i = 1; i <= 4; i++) {
            total += GAME_DATA.questions[i].length;
        }
        return total;
    }

    // ============================================
    // ROOM & QUESTION RENDERING
    // ============================================

    showRoomIntro() {
        this.state.showingIntro = true;
        const room = GAME_DATA.rooms[this.state.currentRoom - 1];

        const html = `
            <div class="room-intro">
                <div class="room-intro-icon">${room.icon}</div>
                <h1 class="room-intro-title">${room.introTitle}</h1>
                <p class="room-intro-desc">${room.introDesc}</p>
                <button class="enter-room-btn" onclick="game.enterRoom()">
                    <span>🚪</span> ENTER ROOM
                </button>
            </div>
        `;

        this.elements.roomContainer.innerHTML = html;
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

        // Render based on question type
        switch (question.type) {
            case 'character-select':
                contentHtml = this.renderCharacterQuestion(question, room);
                break;
            case 'comparison':
                contentHtml = this.renderComparisonQuestion(question, room);
                break;
            case 'recipe':
                contentHtml = this.renderRecipeQuestion(question, room);
                break;
            case 'phone':
            case 'keypad':
                contentHtml = this.renderPhoneQuestion(question, room);
                break;
            case 'bonus':
                contentHtml = this.renderBonusQuestion(question, room);
                break;
            default:
                contentHtml = this.renderDefaultQuestion(question, room);
        }

        this.elements.roomContainer.innerHTML = contentHtml;
        this.updateNavButtons();
        this.bindOptionButtons();
    }

    renderCharacterQuestion(question, room) {
        return `
            <div class="question-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${room.name}</h2>
                    <p class="room-subtitle">Question ${this.state.currentQuestion + 1} of ${GAME_DATA.questions[this.state.currentRoom].length}</p>
                </div>

                <div class="character-display">
                    <div class="character-icon">${question.character.icon}</div>
                    <h3 class="character-name">${question.character.name}</h3>
                    <p class="character-desc">"${question.character.description}"</p>
                </div>

                <div class="question-text">${question.question}</div>

                <div class="options-container">
                    ${this.renderOptions(question.options)}
                </div>
            </div>
        `;
    }

    renderComparisonQuestion(question, room) {
        return `
            <div class="question-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${room.name}</h2>
                    <p class="room-subtitle">Question ${this.state.currentQuestion + 1} of ${GAME_DATA.questions[this.state.currentRoom].length}</p>
                </div>

                <div class="comparison-display">
                    <div class="comparison-item">
                        <div class="comparison-icon">${question.comparison.item1.icon}</div>
                        <div class="comparison-label">${question.comparison.item1.label}</div>
                    </div>
                    <div class="comparison-icon" style="font-size: 3rem;">VS</div>
                    <div class="comparison-item">
                        <div class="comparison-icon">${question.comparison.item2.icon}</div>
                        <div class="comparison-label">${question.comparison.item2.label}</div>
                    </div>
                </div>

                <div class="question-text">${question.question}</div>

                <div class="options-container">
                    ${this.renderOptions(question.options)}
                </div>
            </div>
        `;
    }

    renderRecipeQuestion(question, room) {
        return `
            <div class="question-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${room.name}</h2>
                    <p class="room-subtitle">Question ${this.state.currentQuestion + 1} of ${GAME_DATA.questions[this.state.currentRoom].length}</p>
                </div>

                <div class="recipe-display">
                    <div class="recipe-title">📜 Recipe for Success</div>
                    <div class="recipe-step">${question.recipeStep}</div>
                    ${question.displayImage ? `<div style="font-size: 3rem; text-align: center; margin-top: 20px;">${question.displayImage}</div>` : ''}
                </div>

                <div class="question-text">${question.question}</div>

                <div class="options-container">
                    ${this.renderOptions(question.options)}
                </div>
            </div>
        `;
    }

    renderPhoneQuestion(question, room) {
        return `
            <div class="question-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${room.name}</h2>
                    <p class="room-subtitle">Question ${this.state.currentQuestion + 1} of ${GAME_DATA.questions[this.state.currentRoom].length}</p>
                </div>

                <div class="phone-display">
                    <div class="phone-screen">
                        <div class="phone-icon">${question.phoneDisplay.includes('INCOMING') ? '📞' : '🎧'}</div>
                        <div class="phone-text">${question.phoneDisplay}</div>
                        <div class="phone-text" style="font-style: italic; margin-top: 10px;">${question.phoneAction}</div>
                    </div>
                </div>

                <div class="question-text">${question.question}</div>

                <div class="options-container">
                    ${this.renderOptions(question.options)}
                </div>
            </div>
        `;
    }

    renderBonusQuestion(question, room) {
        return `
            <div class="question-card">
                <div class="room-header">
                    <span class="room-emoji">${question.icon}</span>
                    <h2 class="room-title">BONUS: ${question.category}</h2>
                    <p class="room-subtitle">Bonus Question ${this.state.currentQuestion + 1} of ${GAME_DATA.questions[this.state.currentRoom].length}</p>
                </div>

                <div class="question-text">${question.question}</div>

                <div class="options-container">
                    ${this.renderOptions(question.options)}
                </div>
            </div>
        `;
    }

    renderDefaultQuestion(question, room) {
        return `
            <div class="question-card">
                <div class="room-header">
                    <span class="room-emoji">${room.icon}</span>
                    <h2 class="room-title">${room.name}</h2>
                    <p class="room-subtitle">Question ${this.state.currentQuestion + 1}</p>
                </div>

                <div class="question-text">${question.question}</div>

                <div class="options-container">
                    ${this.renderOptions(question.options)}
                </div>
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
        buttons.forEach(btn => {
            btn.addEventListener('click', () => this.selectOption(btn));
        });
    }

    // ============================================
    // ANSWER HANDLING
    // ============================================

    selectOption(button) {
        const questionKey = `${this.state.currentRoom}-${this.state.currentQuestion}`;
        const isCorrect = button.dataset.correct === 'true';
        const questions = GAME_DATA.questions[this.state.currentRoom];
        const question = questions[this.state.currentQuestion];

        // Track attempts
        if (!this.state.attempts[questionKey]) {
            this.state.attempts[questionKey] = 0;
        }
        this.state.attempts[questionKey]++;

        // Disable all buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
        });

        if (isCorrect) {
            // Calculate points
            let points = 0;
            const attempt = this.state.attempts[questionKey];
            if (attempt === 1) {
                points = GAME_DATA.settings.pointsFirstTry;
                this.state.firstTryCorrect++;
            } else if (attempt === 2) {
                points = GAME_DATA.settings.pointsSecondTry;
            } else {
                points = GAME_DATA.settings.pointsThirdTry;
            }

            this.state.score += points;
            this.state.correctAnswers++;
            this.state.roomScores[this.state.currentRoom]++;

            // Visual feedback
            button.classList.add('correct');
            this.showFeedback(true, question.correctFeedback, points);

            // Record answered question
            if (!this.state.questionsAnswered.includes(questionKey)) {
                this.state.questionsAnswered.push(questionKey);
            }

            // Auto-advance after delay
            setTimeout(() => {
                this.nextQuestion();
            }, GAME_DATA.settings.autoAdvanceDelay);
        } else {
            this.state.incorrectAnswers++;
            button.classList.add('incorrect');
            this.showFeedback(false, question.incorrectFeedback, 0);

            // Re-enable other buttons after delay for retry
            setTimeout(() => {
                document.querySelectorAll('.option-btn').forEach(btn => {
                    if (!btn.classList.contains('incorrect')) {
                        btn.disabled = false;
                    }
                });
            }, GAME_DATA.settings.feedbackDuration);
        }

        this.updateScore();
        this.updateProgress();
        this.saveProgress();
    }

    showFeedback(isCorrect, message, points) {
        this.elements.feedbackIcon.textContent = isCorrect ? '✅' : '❌';
        this.elements.feedbackIcon.className = `feedback-icon ${isCorrect ? 'success' : 'error'}`;
        this.elements.feedbackTitle.textContent = isCorrect ? 'Correct!' : 'Try Again!';
        this.elements.feedbackText.textContent = message;
        this.elements.pointsEarned.textContent = isCorrect ? `+${points} pts` : '';
        this.elements.pointsEarned.style.display = isCorrect ? 'block' : 'none';

        this.elements.feedbackModal.classList.add('active');

        setTimeout(() => {
            this.elements.feedbackModal.classList.remove('active');
        }, GAME_DATA.settings.feedbackDuration);
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

    // ============================================
    // ROOM COMPLETION
    // ============================================

    completeRoom() {
        const room = GAME_DATA.rooms[this.state.currentRoom - 1];

        // Show transition screen
        this.elements.transitionIcon.textContent = '🔓';
        this.elements.transitionTitle.textContent = room.completionMessage;
        this.elements.transitionMessage.textContent = room.completionDesc;

        this.showScreen('transition');

        setTimeout(() => {
            // Move to next room or end game
            if (this.state.currentRoom < 4) {
                this.state.currentRoom++;
                this.showScreen('game');
                this.showRoomIntro();
            } else if (this.state.currentRoom === 4) {
                // Offer bonus round
                this.offerBonusRound();
            } else {
                this.endGame(true);
            }
        }, 2500);
    }

    offerBonusRound() {
        this.elements.transitionIcon.textContent = '⭐';
        this.elements.transitionTitle.textContent = 'BONUS ROUND AVAILABLE!';
        this.elements.transitionMessage.innerHTML = `
            You escaped! But can you earn bonus points?<br><br>
            <button class="big-button" onclick="game.startBonusRound()" style="margin: 10px;">
                <span class="btn-icon">⭐</span> BONUS CHALLENGES
            </button>
            <button class="big-button secondary" onclick="game.endGame(true)" style="margin: 10px;">
                <span class="btn-icon">🏆</span> FINISH GAME
            </button>
        `;

        this.showScreen('transition');
    }

    startBonusRound() {
        this.state.currentRoom = 5;
        this.showScreen('game');
        this.showRoomIntro();
    }

    // ============================================
    // GAME END
    // ============================================

    endGame(completed) {
        this.state.isPlaying = false;
        clearInterval(this.state.timerInterval);

        const timeUsed = GAME_DATA.settings.totalTime - this.state.timeRemaining;
        const minutes = Math.floor(timeUsed / 60);
        const seconds = timeUsed % 60;

        // Calculate stats for achievements
        const stats = {
            unit1Correct: this.state.roomScores[1],
            unit2Correct: this.state.roomScores[2],
            unit3Correct: this.state.roomScores[3],
            unit4Correct: this.state.roomScores[4],
            unit5Correct: this.state.roomScores[5],
            timeRemaining: this.state.timeRemaining,
            firstTryCorrect: this.state.firstTryCorrect,
            totalQuestions: this.state.questionsAnswered.length,
            totalIncorrect: this.state.incorrectAnswers,
            completed: completed
        };

        // Update results screen
        this.elements.resultTeamName.textContent = this.state.teamName;
        this.elements.finalScore.textContent = this.state.score;
        this.elements.finalTime.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.elements.finalCorrect.textContent = this.state.correctAnswers;

        // Determine medal
        let medal = '🏆';
        if (this.state.score >= 200) {
            medal = '🥇';
        } else if (this.state.score >= 150) {
            medal = '🥈';
        } else if (this.state.score >= 100) {
            medal = '🥉';
        }
        this.elements.medalDisplay.textContent = medal;

        // Calculate achievements
        const earnedAchievements = GAME_DATA.achievements.filter(a => a.condition(stats));
        this.elements.achievementsList.innerHTML = earnedAchievements.map(a => `
            <div class="achievement">
                <span class="achievement-icon">${a.icon}</span>
                <span>${a.name}</span>
            </div>
        `).join('');

        // Save to leaderboard
        this.saveToLeaderboard();

        // Show results with confetti
        this.showScreen('results');
        this.createConfetti();
    }

    // ============================================
    // NAVIGATION
    // ============================================

    updateNavButtons() {
        const questions = GAME_DATA.questions[this.state.currentRoom];

        // Back button
        this.elements.backBtn.disabled =
            this.state.currentQuestion === 0 && this.state.currentRoom === 1;

        // Forward button (only enabled if current question is answered)
        const questionKey = `${this.state.currentRoom}-${this.state.currentQuestion}`;
        this.elements.forwardBtn.disabled =
            !this.state.questionsAnswered.includes(questionKey) || this.state.showingIntro;
    }

    goBack() {
        if (this.state.showingIntro && this.state.currentRoom > 1) {
            this.state.currentRoom--;
            this.showRoomIntro();
        } else if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.renderQuestion();
        } else if (this.state.currentRoom > 1) {
            this.state.currentRoom--;
            const questions = GAME_DATA.questions[this.state.currentRoom];
            this.state.currentQuestion = questions.length - 1;
            this.renderQuestion();
        }
    }

    goForward() {
        if (this.state.showingIntro) {
            this.enterRoom();
        } else {
            this.nextQuestion();
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

    hideHint() {
        this.elements.hintModal.classList.remove('active');
    }

    handleKeyboard(e) {
        if (!this.state.isPlaying) return;

        // A, B, C, D keys for options
        const keyMap = { 'a': 'A', 'b': 'B', 'c': 'C', 'd': 'D' };
        if (keyMap[e.key.toLowerCase()]) {
            const btn = document.querySelector(`.option-btn[data-letter="${keyMap[e.key.toLowerCase()]}"]`);
            if (btn && !btn.disabled) {
                btn.click();
            }
        }

        // Arrow keys for navigation
        if (e.key === 'ArrowLeft' && !this.elements.backBtn.disabled) {
            this.goBack();
        }
        if (e.key === 'ArrowRight' && !this.elements.forwardBtn.disabled) {
            this.goForward();
        }

        // H for hint
        if (e.key.toLowerCase() === 'h') {
            this.showHint();
        }

        // Escape to close hint
        if (e.key === 'Escape') {
            this.hideHint();
        }
    }

    // ============================================
    // LEADERBOARD & SAVE
    // ============================================

    saveToLeaderboard() {
        let leaderboard = JSON.parse(localStorage.getItem('escapeRoomLeaderboard') || '[]');

        leaderboard.push({
            teamName: this.state.teamName,
            score: this.state.score,
            time: GAME_DATA.settings.totalTime - this.state.timeRemaining,
            date: new Date().toLocaleDateString()
        });

        // Sort by score descending, then by time ascending
        leaderboard.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.time - b.time;
        });

        // Keep only top 10
        leaderboard = leaderboard.slice(0, 10);

        localStorage.setItem('escapeRoomLeaderboard', JSON.stringify(leaderboard));
    }

    showLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('escapeRoomLeaderboard') || '[]');

        const html = leaderboard.map((entry, index) => {
            let medalClass = '';
            let rank = index + 1;
            if (index === 0) medalClass = 'gold';
            else if (index === 1) medalClass = 'silver';
            else if (index === 2) medalClass = 'bronze';

            const minutes = Math.floor(entry.time / 60);
            const seconds = entry.time % 60;

            return `
                <div class="leaderboard-entry ${medalClass}">
                    <span class="leaderboard-rank">${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : rank}</span>
                    <span class="leaderboard-name">${entry.teamName}</span>
                    <span class="leaderboard-score">${entry.score} pts</span>
                </div>
            `;
        }).join('');

        this.elements.leaderboardList.innerHTML = html || '<p style="font-size: 1.5rem; color: #a0a0a0;">No entries yet!</p>';
        this.showScreen('leaderboard');
    }

    saveProgress() {
        const progress = {
            teamName: this.state.teamName,
            currentRoom: this.state.currentRoom,
            currentQuestion: this.state.currentQuestion,
            score: this.state.score,
            timeRemaining: this.state.timeRemaining,
            attempts: this.state.attempts,
            questionsAnswered: this.state.questionsAnswered,
            correctAnswers: this.state.correctAnswers,
            incorrectAnswers: this.state.incorrectAnswers,
            firstTryCorrect: this.state.firstTryCorrect,
            roomScores: this.state.roomScores
        };
        localStorage.setItem('escapeRoomProgress', JSON.stringify(progress));
    }

    loadSavedData() {
        // Check for saved progress
        const saved = localStorage.getItem('escapeRoomProgress');
        if (saved) {
            // Could offer to resume - for now just clear it
            // localStorage.removeItem('escapeRoomProgress');
        }
    }

    resetGame() {
        clearInterval(this.state.timerInterval);
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
            roomScores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            questionsAnswered: [],
            isPlaying: false,
            isPaused: false,
            startTime: null,
            showingIntro: false
        };

        localStorage.removeItem('escapeRoomProgress');
        this.elements.confetti.innerHTML = '';
        this.showScreen('home');
    }

    // ============================================
    // CONFETTI ANIMATION
    // ============================================

    createConfetti() {
        this.elements.confetti.innerHTML = '';
        const colors = ['#f39c12', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#1abc9c'];

        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                this.elements.confetti.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 30);
        }
    }
}

// Initialize game when DOM is loaded
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new EscapeRoomGame();
});

// Make game available globally for inline event handlers
window.game = game;
