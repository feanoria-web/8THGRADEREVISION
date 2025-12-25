// ============================================
// ESCAPE ROOM TOURNAMENT - ENHANCED QUESTION DATA
// With reading passages, T/F, and fun bonus games!
// ============================================

const GAME_DATA = {
    // Game settings
    settings: {
        totalTime: 30 * 60, // 30 minutes
        pointsFirstTry: 10,
        pointsSecondTry: 5,
        pointsThirdTry: 2,
        autoAdvanceDelay: 2000,
        feedbackDuration: 1500
    },

    // Room/Unit definitions
    rooms: [
        {
            id: 1,
            name: "The Lobby",
            theme: "Friendship",
            icon: "🤝",
            color: "#e74c3c",
            introTitle: "UNIT 1: THE LOBBY",
            introDesc: "You've arrived at the Escape Room Championship! Assemble your team by making good choices about who to invite.",
            completionMessage: "TEAM ASSEMBLED!",
            completionDesc: "Your team is ready! Time to enter the first challenge room!"
        },
        {
            id: 2,
            name: "The Rhythm Room",
            theme: "Teen Life",
            icon: "🎵",
            color: "#9b59b6",
            introTitle: "UNIT 2: THE RHYTHM ROOM",
            introDesc: "Express your preferences clearly to unlock this musical room!",
            completionMessage: "RHYTHM ROOM UNLOCKED!",
            completionDesc: "The music fades and a door slides open!"
        },
        {
            id: 3,
            name: "The Alchemist's Kitchen",
            theme: "In The Kitchen",
            icon: "🍳",
            color: "#f39c12",
            introTitle: "UNIT 3: THE ALCHEMIST'S KITCHEN",
            introDesc: "Prove your cooking knowledge to get the golden key!",
            completionMessage: "KEY OBTAINED!",
            completionDesc: "A golden key materializes! Grab it and run!"
        },
        {
            id: 4,
            name: "The Final Exit",
            theme: "On The Phone",
            icon: "📞",
            color: "#3498db",
            introTitle: "UNIT 4: THE FINAL EXIT",
            introDesc: "Use proper phone manners to get the exit code!",
            completionMessage: "CODE ACCEPTED!",
            completionDesc: "The massive door unlocks! Freedom awaits!"
        },
        {
            id: 5,
            name: "Bonus Games",
            theme: "Fun Games",
            icon: "🎮",
            color: "#00cec9",
            introTitle: "BONUS GAMES",
            introDesc: "You've escaped! Now play 3 fun mini-games for bonus points!",
            completionMessage: "GAMES COMPLETE!",
            completionDesc: "You're a true English champion!"
        }
    ],

    // Mini-games between units
    miniGames: {
        1: {
            type: "word-scramble",
            title: "🎮 Word Scramble!",
            instruction: "Unscramble this friendship word!",
            scrambled: "YLLOATY",
            answer: "LOYALTY",
            hint: "Being faithful to someone",
            timeLimit: 30,
            points: 15
        },
        2: {
            type: "emoji-match",
            title: "🎮 Emoji Express!",
            instruction: "Click all the emotions!",
            pairs: [
                { emoji: "😊", word: "HAPPY" },
                { emoji: "😢", word: "SAD" },
                { emoji: "😠", word: "ANGRY" }
            ],
            timeLimit: 20,
            points: 15
        },
        3: {
            type: "quick-sort",
            title: "🎮 Kitchen Sort!",
            instruction: "Tap items in cooking order!",
            items: ["🥚 Crack eggs", "🍳 Cook mixture", "🧈 Melt butter", "🍽️ Serve"],
            correctOrder: [2, 0, 1, 3],
            timeLimit: 25,
            points: 15
        }
    },

    // BONUS GAMES DATA
    bonusGames: {
        // Game 1: Fruit Ninja style word catcher
        wordCatcher: {
            title: "🔪 Word Ninja!",
            instruction: "Click the cooking words! Avoid the bombs! First to 10 wins!",
            words: ["CHOP", "SLICE", "PEEL", "BOIL", "FRY", "MELT", "STIR"],
            timeLimit: 60,
            targetScore: 10,
            pointsPerWord: 5
        },
        // Game 2: Tic-Tac-Toe Quiz
        ticTacToe: {
            title: "📞 Phone Tic-Tac-Toe!",
            instruction: "Answer correctly to place your X! Get 3 in a row!",
            questions: [
                { q: "How do you answer a phone politely?", a: "Hello, this is [name] speaking", wrong: "Yeah, what?" },
                { q: "'May I speak to...' is polite. True?", a: "True", wrong: "False" },
                { q: "If the line is bad, say: 'Could you ___ up?'", a: "speak", wrong: "shut" },
                { q: "'Hold on' means wait. True?", a: "True", wrong: "False" },
                { q: "End calls with 'Goodbye' is polite?", a: "True", wrong: "False" },
                { q: "'Can you take a message?' is for when someone is...", a: "not available", wrong: "angry" },
                { q: "Saying 'Thank you for calling' is rude?", a: "False", wrong: "True" },
                { q: "'I'll call back' means I will phone again?", a: "True", wrong: "False" },
                { q: "Hanging up without saying bye is polite?", a: "False", wrong: "True" }
            ],
            pointsPerWin: 25
        },
        // Game 3: Speed Typing Challenge
        speedTyping: {
            title: "⌨️ Speed Speller!",
            instruction: "Type the English words as fast as you can! 30 seconds!",
            words: ["friend", "prefer", "kitchen", "telephone", "polite", "invitation", "delicious", "comfortable"],
            timeLimit: 30,
            pointsPerWord: 5
        }
    },

    // All questions organized by room
    questions: {
        // ============================================
        // UNIT 1: FRIENDSHIP - THE LOBBY
        // ============================================
        1: [
            // STORY INTRO
            {
                id: "1-0",
                type: "story",
                title: "Welcome!",
                narrative: "You enter the Escape Room Championship. A host approaches with a clipboard.",
                character: {
                    icon: "👋",
                    name: "Host",
                    dialogue: "Welcome! You must form your team of 4 members. Choose wisely - I'll introduce some candidates!"
                },
                continueText: "Meet the candidates →"
            },
            // READING PASSAGE
            {
                id: "1-1",
                type: "reading",
                title: "📖 Read This Passage",
                passage: "Making friends requires good social skills. When someone invites you to join their group, you can accept politely by saying 'I'd love to!' or 'That sounds great!' If you need to refuse, it's important to be kind. You might say 'Thanks for asking, but I'm not able to.' Always give a reason when refusing - it shows respect.",
                continueText: "Answer questions about the passage →"
            },
            {
                id: "1-2",
                type: "true-false",
                statement: "According to the passage, you should give a reason when refusing an invitation.",
                correctAnswer: true,
                explanation: "The passage says 'Always give a reason when refusing - it shows respect.'",
                hint: "Look at the last sentence of the passage."
            },
            {
                id: "1-3",
                type: "true-false",
                statement: "'I'd love to!' is a polite way to accept an invitation.",
                correctAnswer: true,
                explanation: "The passage mentions 'I'd love to!' as a polite acceptance.",
                hint: "Check what the passage says about accepting invitations."
            },
            {
                id: "1-4",
                type: "character-select",
                character: {
                    name: "The Honest Helper",
                    icon: "🧠",
                    description: "Brilliant problem-solver, always tells the truth, and helps everyone."
                },
                question: "Why would you want the Honest Helper on your team?",
                options: [
                    { letter: "A", text: "Because I can count on her to help solve puzzles", correct: true },
                    { letter: "B", text: "Because she likes pizza", correct: false }
                ],
                correctFeedback: "Her problem-solving skills are valuable!",
                incorrectFeedback: "Look at what makes her special!",
                hint: "Look at her description!"
            },
            {
                id: "1-5",
                type: "fill-blank",
                context: "Someone reliable offered to join your team.",
                sentence: "I'd _____ to have you on our team!",
                options: [
                    { letter: "A", text: "love", correct: true },
                    { letter: "B", text: "hate", correct: false }
                ],
                correctFeedback: "Enthusiastic acceptance!",
                incorrectFeedback: "Use a positive word!",
                hint: "'I'd _____ to!' is an excited yes."
            },
            {
                id: "1-6",
                type: "character-select",
                character: {
                    name: "The Lazy Complainer",
                    icon: "😏",
                    description: "Talented but unreliable, complains about everything."
                },
                question: "What's a polite way to refuse the Lazy Complainer?",
                options: [
                    { letter: "A", text: "Thanks, but we need someone more reliable.", correct: true },
                    { letter: "B", text: "Go away! You're terrible!", correct: false }
                ],
                correctFeedback: "Polite refusal with a reason!",
                incorrectFeedback: "Be polite but honest!",
                hint: "Start with 'Thanks' and give a kind reason."
            },
            {
                id: "1-7",
                type: "true-false",
                statement: "It's okay to refuse an invitation without giving any reason.",
                correctAnswer: false,
                explanation: "Giving a reason shows respect for the other person.",
                hint: "Is it polite to just say 'no' with no explanation?"
            }
        ],

        // ============================================
        // UNIT 2: TEEN LIFE - THE RHYTHM ROOM
        // ============================================
        2: [
            {
                id: "2-0",
                type: "story",
                title: "The Rhythm Room",
                narrative: "Colorful lights flash and music plays! A screen displays a message.",
                character: {
                    icon: "🎧",
                    name: "Room Voice",
                    dialogue: "Express your preferences clearly! Tell us what you like and don't like!"
                },
                continueText: "Start expressing yourself →"
            },
            // READING PASSAGE
            {
                id: "2-1",
                type: "reading",
                title: "📖 Expressing Preferences",
                passage: "There are many ways to talk about what you like. You can say 'I prefer jazz to pop' or 'I would rather stay home than go out.' To express dislike politely, try 'I'm not very keen on heavy metal' instead of 'I hate it!' Remember: 'prefer X to Y' and 'would rather X than Y' are the correct structures.",
                continueText: "Answer questions →"
            },
            {
                id: "2-2",
                type: "true-false",
                statement: "The correct phrase is 'I prefer jazz TO pop' not 'I prefer jazz THAN pop'.",
                correctAnswer: true,
                explanation: "With 'prefer', we always use 'to', not 'than'!",
                hint: "Look at the passage - what preposition follows 'prefer'?"
            },
            {
                id: "2-3",
                type: "true-false",
                statement: "'I'm not very keen on' is a polite way to say you dislike something.",
                correctAnswer: true,
                explanation: "The passage says this is politer than saying 'I hate it!'",
                hint: "Is this phrase gentle or harsh?"
            },
            {
                id: "2-4",
                type: "comparison",
                comparison: {
                    item1: { icon: "🏕️", label: "CAMPING" },
                    item2: { icon: "🛍️", label: "SHOPPING" }
                },
                question: "Complete: 'I prefer camping ___ shopping.'",
                options: [
                    { letter: "A", text: "to", correct: true },
                    { letter: "B", text: "than", correct: false }
                ],
                correctFeedback: "'Prefer X to Y' is correct!",
                incorrectFeedback: "With 'prefer', use 'to' not 'than'!",
                hint: "prefer + to (not than)"
            },
            {
                id: "2-5",
                type: "comparison",
                comparison: {
                    item1: { icon: "📱", label: "TEXTING" },
                    item2: { icon: "📞", label: "CALLING" }
                },
                question: "Which is correct?",
                options: [
                    { letter: "A", text: "I would rather text than call.", correct: true },
                    { letter: "B", text: "I would rather to text than call.", correct: false }
                ],
                correctFeedback: "'Would rather + verb' is correct!",
                incorrectFeedback: "No 'to' after 'would rather'!",
                hint: "Would rather + base verb (no 'to')"
            },
            {
                id: "2-6",
                type: "true-false",
                statement: "'I can't stand loud music' means I really like it.",
                correctAnswer: false,
                explanation: "'Can't stand' means you REALLY dislike something!",
                hint: "If you 'can't stand' something, is that positive or negative?"
            }
        ],

        // ============================================
        // UNIT 3: IN THE KITCHEN
        // ============================================
        3: [
            {
                id: "3-0",
                type: "story",
                title: "The Magical Kitchen",
                narrative: "Pots stir themselves and vegetables float! A glowing cookbook speaks.",
                character: {
                    icon: "📖",
                    name: "Magic Cookbook",
                    dialogue: "To earn the golden key, prove your kitchen knowledge!"
                },
                continueText: "Open the cookbook →"
            },
            // READING PASSAGE
            {
                id: "3-1",
                type: "reading",
                title: "📖 Cooking Vocabulary",
                passage: "Cooking involves many actions. First, you might peel vegetables to remove their skin. Then you chop them into small pieces or slice them into thin flat pieces. To cook food in hot oil, you fry it. To cook in boiling water, you boil it. Butter will melt when heated. Always follow sequence words: First, Then, Next, Finally.",
                continueText: "Answer questions →"
            },
            {
                id: "3-2",
                type: "true-false",
                statement: "'Peel' means to remove the skin from vegetables.",
                correctAnswer: true,
                explanation: "The passage says 'peel vegetables to remove their skin.'",
                hint: "What does the passage say about peeling?"
            },
            {
                id: "3-3",
                type: "true-false",
                statement: "'Chop' and 'slice' mean exactly the same thing.",
                correctAnswer: false,
                explanation: "Chop = small pieces, Slice = thin flat pieces. They're different!",
                hint: "Look at how the passage describes each word."
            },
            {
                id: "3-4",
                type: "recipe",
                recipeStep: "_____ crack the eggs into a bowl",
                question: "What sequence word starts a recipe?",
                options: [
                    { letter: "A", text: "First", correct: true },
                    { letter: "B", text: "Finally", correct: false }
                ],
                correctFeedback: "Recipes start with 'First'!",
                incorrectFeedback: "What means 'at the beginning'?",
                hint: "The BEGINNING word is..."
            },
            {
                id: "3-5",
                type: "recipe",
                recipeStep: "First, crack eggs. _____, add flour.",
                question: "What comes after 'First'?",
                options: [
                    { letter: "A", text: "Then", correct: true },
                    { letter: "B", text: "Finally", correct: false }
                ],
                correctFeedback: "First → Then → Next → Finally!",
                incorrectFeedback: "What's the second step word?",
                hint: "First → _____ → Next → Finally"
            },
            {
                id: "3-6",
                type: "recipe",
                recipeStep: "_____ the butter in a pan",
                displayImage: "🧈 + 🔥 = 💧",
                question: "What happens to butter when heated?",
                options: [
                    { letter: "A", text: "melt", correct: true },
                    { letter: "B", text: "chop", correct: false }
                ],
                correctFeedback: "Butter melts when heated!",
                incorrectFeedback: "What happens to solid becoming liquid?",
                hint: "Ice cream in the sun does this too!"
            },
            {
                id: "3-7",
                type: "true-false",
                statement: "'Finally' is used for the LAST step in a recipe.",
                correctAnswer: true,
                explanation: "'Finally' marks the end - the final step!",
                hint: "Final = last"
            }
        ],

        // ============================================
        // UNIT 4: ON THE PHONE
        // ============================================
        4: [
            {
                id: "4-0",
                type: "story",
                title: "The Final Challenge",
                narrative: "A massive steel door blocks your escape. An old telephone rings!",
                character: {
                    icon: "📞",
                    name: "Teammate",
                    dialogue: "Answer the phone! Be polite or they might hang up!"
                },
                continueText: "Answer the phone →"
            },
            // READING PASSAGE
            {
                id: "4-1",
                type: "reading",
                title: "📖 Phone Etiquette",
                passage: "Good phone manners are important. Answer with 'Hello, this is [name] speaking.' To ask for someone, say 'May I speak to...?' If the line is bad, politely say 'Could you speak up, please?' When asked to hold, say 'Of course.' Always end calls by saying 'Thank you' and 'Goodbye.'",
                continueText: "Answer questions →"
            },
            {
                id: "4-2",
                type: "true-false",
                statement: "You should say who you are when answering the phone.",
                correctAnswer: true,
                explanation: "The passage says to answer with 'Hello, this is [name] speaking.'",
                hint: "Look at how the passage says to answer."
            },
            {
                id: "4-3",
                type: "true-false",
                statement: "'May I speak to...' is a polite way to ask for someone.",
                correctAnswer: true,
                explanation: "The passage mentions this as the polite way to ask!",
                hint: "Is 'May I' polite?"
            },
            {
                id: "4-4",
                type: "phone",
                phoneDisplay: "📞 INCOMING CALL",
                phoneAction: "Ring ring!",
                question: "How should you answer?",
                options: [
                    { letter: "A", text: "Hello, this is the Escape Team speaking.", correct: true },
                    { letter: "B", text: "Yeah, what?", correct: false }
                ],
                correctFeedback: "Professional greeting!",
                incorrectFeedback: "Be polite and say who you are!",
                hint: "Start with 'Hello' and introduce yourself."
            },
            {
                id: "4-5",
                type: "phone",
                phoneDisplay: "📡 BAD LINE",
                phoneAction: "*static noises*",
                question: "The line is bad. What should you say?",
                options: [
                    { letter: "A", text: "Could you speak up, please?", correct: true },
                    { letter: "B", text: "WHAT?! SPEAK LOUDER!!", correct: false }
                ],
                correctFeedback: "Polite problem-solving!",
                incorrectFeedback: "Stay polite even with problems!",
                hint: "Use 'Could you' + 'please'"
            },
            {
                id: "4-6",
                type: "true-false",
                statement: "It's okay to hang up without saying goodbye.",
                correctAnswer: false,
                explanation: "Always say 'Thank you' and 'Goodbye' before ending!",
                hint: "Is hanging up suddenly polite?"
            },
            {
                id: "4-7",
                type: "phone",
                phoneDisplay: "🔢 ENTER CODE",
                phoneAction: "Code: 4-7-2-9",
                question: "What's the FIRST digit of the code?",
                options: [
                    { letter: "A", text: "4", correct: true },
                    { letter: "B", text: "7", correct: false }
                ],
                correctFeedback: "First digit correct!",
                incorrectFeedback: "The code is 4-7-2-9. First is...",
                hint: "4-7-2-9 → First number?"
            }
        ],

        // ============================================
        // UNIT 5: BONUS GAMES (3 Fun Games)
        // ============================================
        5: [
            {
                id: "5-0",
                type: "story",
                title: "Bonus Round!",
                narrative: "Congratulations! You've escaped! Now play 3 fun games for bonus points!",
                character: {
                    icon: "🎮",
                    name: "Game Master",
                    dialogue: "Ready for Word Ninja, Phone Tic-Tac-Toe, and Speed Speller?"
                },
                continueText: "Let's play! →"
            },
            {
                id: "5-1",
                type: "bonus-game",
                gameType: "wordCatcher"
            },
            {
                id: "5-2",
                type: "bonus-game",
                gameType: "ticTacToe"
            },
            {
                id: "5-3",
                type: "bonus-game",
                gameType: "speedTyping"
            }
        ]
    },

    // Achievements definitions
    achievements: [
        {
            id: "team_builder",
            name: "Team Builder",
            description: "Assembled the perfect squad",
            icon: "🤝",
            condition: (stats) => stats.unit1Correct >= 4
        },
        {
            id: "music_master",
            name: "Music Master",
            description: "Expressed preferences clearly",
            icon: "🎵",
            condition: (stats) => stats.unit2Correct >= 4
        },
        {
            id: "chef_expert",
            name: "Chef Expert",
            description: "Mastered kitchen vocabulary",
            icon: "🍳",
            condition: (stats) => stats.unit3Correct >= 5
        },
        {
            id: "phone_pro",
            name: "Phone Professional",
            description: "Used excellent phone etiquette",
            icon: "📞",
            condition: (stats) => stats.unit4Correct >= 5
        },
        {
            id: "speed_demon",
            name: "Speed Demon",
            description: "Finished with 10+ minutes left",
            icon: "⚡",
            condition: (stats) => stats.timeRemaining >= 600
        },
        {
            id: "perfect_score",
            name: "Perfect Score",
            description: "All correct on first try",
            icon: "💯",
            condition: (stats) => stats.firstTryCorrect === stats.totalQuestions
        },
        {
            id: "game_master",
            name: "Game Master",
            description: "Played all bonus games",
            icon: "🎮",
            condition: (stats) => stats.bonusGamesPlayed >= 3
        },
        {
            id: "reader",
            name: "Careful Reader",
            description: "Got all reading questions right",
            icon: "📖",
            condition: (stats) => stats.readingCorrect >= 8
        },
        {
            id: "truth_seeker",
            name: "Truth Seeker",
            description: "Got 8+ true/false questions right",
            icon: "✓",
            condition: (stats) => stats.trueFalseCorrect >= 8
        }
    ]
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAME_DATA;
}
