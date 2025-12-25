// ============================================
// ESCAPE ROOM TOURNAMENT - ENHANCED QUESTION DATA
// With story-based reading passages, T/F, and fun bonus games!
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
                title: "Welcome to the Championship!",
                narrative: "You push open the heavy doors and enter the grand lobby of the Escape Room Championship. Crystal chandeliers hang from the ceiling, and contestants from different schools are forming teams. A host in a golden suit approaches you with a clipboard.",
                character: {
                    icon: "👋",
                    name: "The Host",
                    dialogue: "Welcome, competitor! I'm Marcus, your host. Before you can enter the escape rooms, you must form a team of 4 members. Choose wisely - some candidates are... better than others. Let me introduce you to some interesting characters!"
                },
                continueText: "Meet the candidates →"
            },
            // READING PASSAGE - Story-based
            {
                id: "1-1",
                type: "reading",
                title: "📖 The Notice Board",
                passage: "You walk over to the lobby's notice board where a sign reads: 'TEAM FORMATION RULES.' It says: 'To accept someone on your team, say something positive like \"I'd love to!\" or \"That sounds great!\" If you must refuse someone, be polite - say \"Thanks for asking, but...\" and give a reason. Remember: being kind costs nothing, but being rude could cost you the championship!'",
                continueText: "Answer questions about the rules →"
            },
            {
                id: "1-2",
                type: "true-false",
                statement: "According to the notice board, you should give a reason when refusing someone.",
                correctAnswer: true,
                explanation: "The sign says to give a reason when refusing!",
                hint: "Look at what the notice board says about refusing."
            },
            {
                id: "1-3",
                type: "true-false",
                statement: "'I'd love to!' is a positive way to accept someone on your team.",
                correctAnswer: true,
                explanation: "The notice board mentions this as a positive acceptance!",
                hint: "What does the sign say about accepting?"
            },
            {
                id: "1-4",
                type: "character-select",
                character: {
                    name: "The Genius Inventor",
                    icon: "🧠",
                    description: "Emma is brilliant at solving puzzles and always tells the truth. She helped her school win last year's science fair."
                },
                question: "The Genius Inventor wants to join your team. Why would she be a good choice?",
                options: [
                    { letter: "A", text: "Because she's great at solving puzzles", correct: true },
                    { letter: "B", text: "Because she has nice shoes", correct: false },
                    { letter: "C", text: "Because she likes pizza", correct: false },
                    { letter: "D", text: "Because she was born in June", correct: false }
                ],
                correctFeedback: "Her puzzle-solving skills will help in escape rooms!",
                incorrectFeedback: "Think about what skill would help in an escape room!",
                hint: "What would help you ESCAPE a room?"
            },
            {
                id: "1-5",
                type: "fill-blank",
                context: "The Genius Inventor offers to join your team.",
                sentence: "I'd _____ to have you on our team!",
                options: [
                    { letter: "A", text: "love", correct: true },
                    { letter: "B", text: "hate", correct: false },
                    { letter: "C", text: "forget", correct: false },
                    { letter: "D", text: "refuse", correct: false }
                ],
                correctFeedback: "Enthusiastic acceptance! Emma joins your team!",
                incorrectFeedback: "Use a positive word to accept her!",
                hint: "'I'd _____ to!' shows excitement."
            },
            {
                id: "1-6",
                type: "character-select",
                character: {
                    name: "The Angry Complainer",
                    icon: "😤",
                    description: "Tom is skilled but never stops complaining. He blamed his teammates when his last team lost and refuses to take responsibility."
                },
                question: "The Angry Complainer wants to join. What's a polite way to refuse him?",
                options: [
                    { letter: "A", text: "Thanks for asking, but we need someone who works well with others.", correct: true },
                    { letter: "B", text: "Go away! Nobody wants you!", correct: false },
                    { letter: "C", text: "You're the worst! Leave us alone!", correct: false },
                    { letter: "D", text: "Ha! As if we'd pick you!", correct: false }
                ],
                correctFeedback: "Polite refusal with a reason - well done!",
                incorrectFeedback: "Remember: be polite and give a reason!",
                hint: "Start with 'Thanks' and explain kindly."
            },
            {
                id: "1-7",
                type: "true-false",
                statement: "It's okay to refuse someone without giving any reason.",
                correctAnswer: false,
                explanation: "The notice board says to always give a reason - it shows respect!",
                hint: "What did the rules say about refusing?"
            },
            {
                id: "1-8",
                type: "character-select",
                character: {
                    name: "The Supportive Friend",
                    icon: "💪",
                    description: "Maya always encourages her teammates. When someone makes a mistake, she says 'Don't worry, let's try again together!'"
                },
                question: "The Supportive Friend approaches you. What should you say to accept her?",
                options: [
                    { letter: "A", text: "That sounds great! We'd love to have you!", correct: true },
                    { letter: "B", text: "I guess you can join...", correct: false },
                    { letter: "C", text: "Whatever, if you want.", correct: false },
                    { letter: "D", text: "Fine, but don't mess up.", correct: false }
                ],
                correctFeedback: "Enthusiastic and positive! Maya joins happily!",
                incorrectFeedback: "Show enthusiasm when accepting someone!",
                hint: "How would YOU want to be welcomed?"
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
                narrative: "Your team enters a room filled with colorful lights and speakers. Music plays from different corners - rock, pop, classical, and electronic. A giant screen flickers to life with a message.",
                character: {
                    icon: "🎧",
                    name: "DJ Puzzler",
                    dialogue: "Welcome to MY room! I'm DJ Puzzler. To unlock the exit, you must express your preferences clearly. Tell me what you like, what you prefer, and what you can't stand. Use the right grammar or stay trapped forever!"
                },
                continueText: "Start expressing yourself →"
            },
            // READING PASSAGE - Story-based
            {
                id: "2-1",
                type: "reading",
                title: "📖 The Music Manual",
                passage: "You find a dusty manual on a speaker. It's titled 'DJ Puzzler's Guide to Preferences.' It reads: 'In my room, you must speak correctly! Say \"I prefer rock TO pop\" - never use \"than\" with prefer! Say \"I would rather dance THAN sit\" - use \"than\" with would rather! If you hate something, be polite: say \"I'm not very keen on...\" instead of \"I hate it!\" Now prove you can express yourself properly!'",
                continueText: "Answer questions →"
            },
            {
                id: "2-2",
                type: "true-false",
                statement: "According to DJ Puzzler's manual, 'I prefer rock TO pop' is correct.",
                correctAnswer: true,
                explanation: "The manual says to use 'to' with 'prefer', not 'than'!",
                hint: "What preposition does the manual say to use with 'prefer'?"
            },
            {
                id: "2-3",
                type: "true-false",
                statement: "'I'm not very keen on' is a polite way to say you dislike something.",
                correctAnswer: true,
                explanation: "The manual says this is politer than saying 'I hate it!'",
                hint: "Is this phrase gentle or harsh?"
            },
            {
                id: "2-4",
                type: "comparison",
                comparison: {
                    item1: { icon: "🎸", label: "ROCK MUSIC" },
                    item2: { icon: "🎹", label: "CLASSICAL" }
                },
                question: "DJ Puzzler asks: Complete this sentence correctly: 'I prefer rock ___ classical.'",
                options: [
                    { letter: "A", text: "to", correct: true },
                    { letter: "B", text: "than", correct: false },
                    { letter: "C", text: "from", correct: false },
                    { letter: "D", text: "over", correct: false }
                ],
                correctFeedback: "'Prefer X to Y' - you got it!",
                incorrectFeedback: "Remember the manual: 'prefer' + 'to'!",
                hint: "The manual says: prefer X ___ Y"
            },
            {
                id: "2-5",
                type: "comparison",
                comparison: {
                    item1: { icon: "💃", label: "DANCING" },
                    item2: { icon: "🪑", label: "SITTING" }
                },
                question: "Which sentence is grammatically CORRECT?",
                options: [
                    { letter: "A", text: "I would rather dance than sit.", correct: true },
                    { letter: "B", text: "I would rather to dance than sit.", correct: false },
                    { letter: "C", text: "I would rather dance to sit.", correct: false },
                    { letter: "D", text: "I would rather dancing than sitting.", correct: false }
                ],
                correctFeedback: "'Would rather + verb + than + verb' - perfect!",
                incorrectFeedback: "No 'to' after 'would rather', and use 'than'!",
                hint: "Would rather + BASE verb (no 'to'!)"
            },
            {
                id: "2-6",
                type: "true-false",
                statement: "'I can't stand loud music' means you really LIKE loud music.",
                correctAnswer: false,
                explanation: "'Can't stand' means you REALLY dislike something!",
                hint: "If you 'can't stand' something, is that positive or negative?"
            },
            {
                id: "2-7",
                type: "fill-blank",
                context: "DJ Puzzler points to the electronic music corner.",
                sentence: "I'm not very _____ on electronic music, actually.",
                options: [
                    { letter: "A", text: "keen", correct: true },
                    { letter: "B", text: "loving", correct: false },
                    { letter: "C", text: "happy", correct: false },
                    { letter: "D", text: "excited", correct: false }
                ],
                correctFeedback: "'Not very keen on' is a polite way to express dislike!",
                incorrectFeedback: "What phrase did the manual say?",
                hint: "I'm not very _____ on = I don't really like"
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
                narrative: "You enter a room that looks like an ancient kitchen. Pots bubble on their own, knives chop vegetables by themselves, and ingredients float through the air. A glowing cookbook on a stand suddenly speaks!",
                character: {
                    icon: "📖",
                    name: "Chef Grimoire",
                    dialogue: "I am Chef Grimoire, the magical cookbook! To earn the golden key, you must prove your knowledge of cooking vocabulary and recipe steps. Show me you can follow a recipe properly!"
                },
                continueText: "Open the cookbook →"
            },
            // READING PASSAGE - Story-based
            {
                id: "3-1",
                type: "reading",
                title: "📖 The Secret Recipe Page",
                passage: "A page glows in Chef Grimoire. It reads: 'COOKING ACTIONS: To PEEL means to remove the skin (like from a potato). To CHOP means to cut into small pieces. To SLICE means to cut into thin, flat pieces. To FRY means to cook in hot oil. To BOIL means to cook in hot water. To MELT means to turn solid into liquid with heat. RECIPE ORDER: Always use First, Then, Next, and Finally to show the steps!'",
                continueText: "Answer questions →"
            },
            {
                id: "3-2",
                type: "true-false",
                statement: "According to Chef Grimoire, 'peel' means to remove the skin.",
                correctAnswer: true,
                explanation: "The cookbook says 'PEEL means to remove the skin'!",
                hint: "What does the recipe page say about peeling?"
            },
            {
                id: "3-3",
                type: "true-false",
                statement: "'Chop' and 'slice' mean exactly the same thing.",
                correctAnswer: false,
                explanation: "Chop = small pieces, Slice = thin flat pieces. They're different!",
                hint: "Look at how Chef Grimoire describes each word."
            },
            {
                id: "3-4",
                type: "recipe",
                recipeStep: "_____, crack the eggs into a bowl.",
                question: "Chef Grimoire asks: What word starts a recipe?",
                options: [
                    { letter: "A", text: "First", correct: true },
                    { letter: "B", text: "Finally", correct: false },
                    { letter: "C", text: "Last", correct: false },
                    { letter: "D", text: "End", correct: false }
                ],
                correctFeedback: "Recipes always start with 'First'!",
                incorrectFeedback: "What word means 'at the beginning'?",
                hint: "The BEGINNING word is..."
            },
            {
                id: "3-5",
                type: "recipe",
                recipeStep: "First, crack eggs. _____, add the flour.",
                question: "What sequence word comes after 'First'?",
                options: [
                    { letter: "A", text: "Then", correct: true },
                    { letter: "B", text: "Finally", correct: false },
                    { letter: "C", text: "First", correct: false },
                    { letter: "D", text: "Last", correct: false }
                ],
                correctFeedback: "First → Then → Next → Finally!",
                incorrectFeedback: "What's the second step word?",
                hint: "First → _____ → Next → Finally"
            },
            {
                id: "3-6",
                type: "recipe",
                recipeStep: "_____ the butter in a hot pan.",
                displayImage: "🧈 + 🔥 = 💧",
                question: "Chef Grimoire shows you butter and fire. What happens to butter when heated?",
                options: [
                    { letter: "A", text: "Melt", correct: true },
                    { letter: "B", text: "Chop", correct: false },
                    { letter: "C", text: "Peel", correct: false },
                    { letter: "D", text: "Slice", correct: false }
                ],
                correctFeedback: "Butter melts when heated! Solid → Liquid!",
                incorrectFeedback: "What happens when solid becomes liquid?",
                hint: "Ice cream in the sun does this too!"
            },
            {
                id: "3-7",
                type: "true-false",
                statement: "'Finally' is used for the LAST step in a recipe.",
                correctAnswer: true,
                explanation: "'Finally' marks the end - the final step!",
                hint: "Final = last"
            },
            {
                id: "3-8",
                type: "recipe",
                recipeStep: "_____ the vegetables in hot oil until golden.",
                question: "To cook vegetables in hot oil, you need to...",
                options: [
                    { letter: "A", text: "fry", correct: true },
                    { letter: "B", text: "boil", correct: false },
                    { letter: "C", text: "peel", correct: false },
                    { letter: "D", text: "melt", correct: false }
                ],
                correctFeedback: "Fry = cook in hot oil! A golden key appears!",
                incorrectFeedback: "Oil = frying, Water = boiling",
                hint: "Cooking in OIL is called..."
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
                narrative: "Your team reaches the final room. A massive steel door blocks your escape, and there's no visible lock. Suddenly, an old-fashioned telephone on a desk starts ringing loudly!",
                character: {
                    icon: "📞",
                    name: "Your Teammate Maya",
                    dialogue: "Quick! Answer the phone! I bet whoever is calling has the exit code. But be careful - if you're rude, they might hang up and we'll be trapped forever!"
                },
                continueText: "Answer the phone →"
            },
            // READING PASSAGE - Story-based
            {
                id: "4-1",
                type: "reading",
                title: "📖 The Phone Manual",
                passage: "You spot a phone manual on the desk. It says: 'PHONE ETIQUETTE FOR ESCAPE: Answer with \"Hello, this is [name] speaking.\" To ask for someone, say \"May I speak to...?\" If you can't hear, say \"Could you speak up, please?\" If asked to wait, say \"Of course\" or \"No problem.\" ALWAYS end with \"Thank you\" and \"Goodbye.\" Rude callers get disconnected!'",
                continueText: "Answer questions →"
            },
            {
                id: "4-2",
                type: "true-false",
                statement: "The manual says you should say your name when answering the phone.",
                correctAnswer: true,
                explanation: "The manual says: 'Hello, this is [name] speaking.'",
                hint: "Look at how the manual says to answer."
            },
            {
                id: "4-3",
                type: "true-false",
                statement: "'May I speak to...' is a polite way to ask for someone.",
                correctAnswer: true,
                explanation: "The manual mentions this as the polite way to ask!",
                hint: "Is 'May I' polite?"
            },
            {
                id: "4-4",
                type: "phone",
                phoneDisplay: "📞 INCOMING CALL",
                phoneAction: "Ring ring!",
                question: "The phone is ringing! How should you answer?",
                options: [
                    { letter: "A", text: "Hello, this is the Escape Team speaking.", correct: true },
                    { letter: "B", text: "Yeah, what do you want?", correct: false },
                    { letter: "C", text: "WHAT?!", correct: false },
                    { letter: "D", text: "Who is this? Talk fast!", correct: false }
                ],
                correctFeedback: "Professional and polite! The caller responds warmly.",
                incorrectFeedback: "Remember the manual! Be polite and say who you are!",
                hint: "Start with 'Hello' and introduce yourself."
            },
            {
                id: "4-5",
                type: "phone",
                phoneDisplay: "📡 BAD CONNECTION",
                phoneAction: "*static noises* ...the code is... *crackle*...",
                question: "You can't hear clearly! What should you say?",
                options: [
                    { letter: "A", text: "Could you speak up, please?", correct: true },
                    { letter: "B", text: "WHAT?! SPEAK LOUDER!!", correct: false },
                    { letter: "C", text: "This phone is terrible!", correct: false },
                    { letter: "D", text: "I can't hear anything! Fix your phone!", correct: false }
                ],
                correctFeedback: "Polite and effective! The caller speaks more clearly.",
                incorrectFeedback: "Stay polite even when there are problems!",
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
                phoneDisplay: "🗣️ CALLER SPEAKING",
                phoneAction: "'Please hold for a moment...'",
                question: "The caller asks you to wait. What do you say?",
                options: [
                    { letter: "A", text: "Of course, no problem.", correct: true },
                    { letter: "B", text: "Hurry up! We don't have time!", correct: false },
                    { letter: "C", text: "Ugh, fine...", correct: false },
                    { letter: "D", text: "*heavy sigh* Whatever.", correct: false }
                ],
                correctFeedback: "Patient and polite! The caller appreciates it.",
                incorrectFeedback: "Show patience when asked to wait!",
                hint: "What does the manual say about waiting?"
            },
            {
                id: "4-8",
                type: "phone",
                phoneDisplay: "🔢 CODE REVEALED",
                phoneAction: "'The exit code is 4-7-2-9. Good luck!'",
                question: "The caller gives you the code! What do you say before hanging up?",
                options: [
                    { letter: "A", text: "Thank you so much! Goodbye!", correct: true },
                    { letter: "B", text: "*click* (hang up immediately)", correct: false },
                    { letter: "C", text: "Finally! Took you long enough!", correct: false },
                    { letter: "D", text: "Yeah, bye.", correct: false }
                ],
                correctFeedback: "Perfect phone etiquette! The door unlocks!",
                incorrectFeedback: "Remember: Always thank them and say goodbye!",
                hint: "What TWO things should you say before ending a call?"
            }
        ],

        // ============================================
        // UNIT 5: BONUS GAMES (3 Fun Games)
        // ============================================
        5: [
            {
                id: "5-0",
                type: "story",
                title: "Victory! Bonus Round!",
                narrative: "The massive door swings open and confetti falls from the ceiling! Your team has escaped! But wait - a new door appears with a glowing sign: 'BONUS GAMES - Extra Points Available!'",
                character: {
                    icon: "🎮",
                    name: "Game Master",
                    dialogue: "Congratulations, champions! You've proven yourselves worthy. Would you like to play 3 fun bonus games for extra points? We have Word Ninja, Phone Tic-Tac-Toe, and Speed Speller!"
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
            condition: (stats) => stats.unit1Correct >= 5
        },
        {
            id: "music_master",
            name: "Music Master",
            description: "Expressed preferences clearly",
            icon: "🎵",
            condition: (stats) => stats.unit2Correct >= 5
        },
        {
            id: "chef_expert",
            name: "Chef Expert",
            description: "Mastered kitchen vocabulary",
            icon: "🍳",
            condition: (stats) => stats.unit3Correct >= 6
        },
        {
            id: "phone_pro",
            name: "Phone Professional",
            description: "Used excellent phone etiquette",
            icon: "📞",
            condition: (stats) => stats.unit4Correct >= 6
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
