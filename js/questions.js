// ============================================
// ESCAPE ROOM TOURNAMENT - ENHANCED QUESTION DATA
// Story scenes, true/false, mini-games, and variety!
// ============================================

const GAME_DATA = {
    // Game settings
    settings: {
        totalTime: 30 * 60, // 30 minutes (increased for more content)
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
            introDesc: "You've just arrived at the National Escape Room Championship! The building is huge and mysterious. To begin, you must assemble the perfect team. Choose wisely - your teammates will help you escape!",
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
            introDesc: "This room is alive with music and colors! The walls pulse with different beats. A voice announces: 'Only those who can express their true preferences may pass!' Time to share your opinions!",
            completionMessage: "RHYTHM ROOM UNLOCKED!",
            completionDesc: "The music fades and a door slides open! You expressed yourself perfectly!"
        },
        {
            id: 3,
            name: "The Alchemist's Kitchen",
            theme: "In The Kitchen",
            icon: "🍳",
            color: "#f39c12",
            introTitle: "UNIT 3: THE ALCHEMIST'S KITCHEN",
            introDesc: "You enter a magical kitchen filled with bubbling pots and floating ingredients! An old cookbook glows on the counter. To get the golden key, you must prove you know your way around a kitchen!",
            completionMessage: "KEY OBTAINED!",
            completionDesc: "A golden key materializes from the magical cauldron! Grab it and run!"
        },
        {
            id: 4,
            name: "The Final Exit",
            theme: "On The Phone",
            icon: "📞",
            color: "#3498db",
            introTitle: "UNIT 4: THE FINAL EXIT",
            introDesc: "You're so close to escaping! But the massive exit door has a digital lock. An old telephone rings... Answer it and use proper phone manners to get the exit code!",
            completionMessage: "CODE ACCEPTED!",
            completionDesc: "The massive door unlocks! Freedom awaits beyond!"
        },
        {
            id: 5,
            name: "Bonus Challenges",
            theme: "Extra Credit",
            icon: "⭐",
            color: "#00cec9",
            introTitle: "BONUS ROUND",
            introDesc: "You've escaped! But the Championship isn't over yet. Can you complete these extra challenges for bonus points and eternal glory?",
            completionMessage: "BONUS COMPLETE!",
            completionDesc: "You're a true English champion!"
        }
    ],

    // Mini-games between units
    miniGames: {
        // After Unit 1
        1: {
            type: "word-scramble",
            title: "🎮 QUICK BREAK: Word Scramble!",
            instruction: "Unscramble this friendship word to continue!",
            scrambled: "YLLOATY",
            answer: "LOYALTY",
            hint: "It means being faithful to someone",
            timeLimit: 30,
            points: 15
        },
        // After Unit 2
        2: {
            type: "emoji-match",
            title: "🎮 QUICK BREAK: Emoji Express!",
            instruction: "Match the emotion to the emoji!",
            pairs: [
                { emoji: "😊", word: "HAPPY" },
                { emoji: "😢", word: "SAD" },
                { emoji: "😠", word: "ANGRY" }
            ],
            timeLimit: 20,
            points: 15
        },
        // After Unit 3
        3: {
            type: "quick-sort",
            title: "🎮 QUICK BREAK: Kitchen Sort!",
            instruction: "Tap the items in the correct cooking order!",
            items: ["🥚 Crack eggs", "🍳 Cook mixture", "🧈 Melt butter", "🍽️ Serve"],
            correctOrder: [2, 0, 1, 3], // Melt butter, Crack eggs, Cook mixture, Serve
            timeLimit: 25,
            points: 15
        }
    },

    // All questions organized by room
    questions: {
        // ============================================
        // UNIT 1: FRIENDSHIP - THE LOBBY
        // ============================================
        1: [
            // STORY SCENE 1
            {
                id: "1-0",
                type: "story",
                title: "Welcome to the Championship",
                narrative: "You push open the heavy doors of the Escape Room Championship building. Inside, the lobby is huge - marble floors, golden chandeliers, and dozens of other teams waiting nervously. A friendly host approaches you with a clipboard.",
                character: {
                    icon: "👋",
                    name: "Host",
                    dialogue: "Welcome, challengers! Before you can enter the escape rooms, you must form your team of 4 members. Choose wisely - each person brings different skills. I'll introduce you to some candidates!"
                },
                continueText: "Meet the candidates →"
            },
            {
                id: "1-1",
                type: "character-select",
                character: {
                    name: "The Angry Gamer",
                    icon: "😤",
                    description: "Skilled at puzzles but gets frustrated easily and yells at teammates when things go wrong."
                },
                question: "Would you invite the Angry Gamer to your team?",
                options: [
                    { letter: "A", text: "No thanks. I need someone who stays calm under pressure.", correct: true },
                    { letter: "B", text: "Yes, I'd love to have you on the team!", correct: false },
                    { letter: "C", text: "Go away, you're too angry!", correct: false },
                    { letter: "D", text: "Maybe, let me think about it forever.", correct: false }
                ],
                correctFeedback: "Good choice! Polite refusal while explaining your reason.",
                incorrectFeedback: "Think about team harmony. Be polite when refusing!",
                hint: "A good teammate should stay calm. Refuse politely with a reason!"
            },
            // TRUE/FALSE
            {
                id: "1-2",
                type: "true-false",
                statement: "When refusing an invitation, you should always give a reason to be polite.",
                correctAnswer: true,
                explanation: "Giving a reason shows respect and helps the other person understand your decision.",
                hint: "Think about how you'd feel if someone refused without explaining why."
            },
            {
                id: "1-3",
                type: "character-select",
                character: {
                    name: "The Honest Helper",
                    icon: "🧠",
                    description: "Brilliant problem-solver, always tells the truth, and helps everyone on the team."
                },
                question: "Why would you want the Honest Helper on your team?",
                options: [
                    { letter: "A", text: "Because I can count on her to help solve hard puzzles", correct: true },
                    { letter: "B", text: "Because she is scary and mean", correct: false },
                    { letter: "C", text: "Because she likes pizza", correct: false },
                    { letter: "D", text: "Because she never talks", correct: false }
                ],
                correctFeedback: "Perfect! Her honesty and problem-solving skills are valuable!",
                incorrectFeedback: "Look at what the description says about her!",
                hint: "Look at the character description - what makes her special?"
            },
            // STORY SCENE 2
            {
                id: "1-4",
                type: "story",
                title: "Making Connections",
                narrative: "As you talk to different candidates, you notice two people chatting nearby. One of them, a reliable-looking person with a kind smile, waves at you.",
                character: {
                    icon: "💪",
                    name: "Reliable Worker",
                    dialogue: "Hey there! I heard you're forming a team. I never give up on challenges and I'm always on time. Would you like me to join you?"
                },
                continueText: "Respond to the offer →"
            },
            {
                id: "1-5",
                type: "fill-blank",
                context: "The Reliable Worker just offered to join your team. You want to accept!",
                sentence: "I'd _____ to have you on our team! We need someone dependable.",
                options: [
                    { letter: "A", text: "love", correct: true },
                    { letter: "B", text: "hate", correct: false },
                    { letter: "C", text: "maybe", correct: false },
                    { letter: "D", text: "never", correct: false }
                ],
                correctFeedback: "Excellent! Enthusiastic acceptance with a compliment!",
                incorrectFeedback: "You want to accept, so use a positive word!",
                hint: "When accepting an invitation happily, we say 'I'd _____ to!'"
            },
            // TRUE/FALSE
            {
                id: "1-6",
                type: "true-false",
                statement: "The phrase 'I'd love to' is a polite way to accept an invitation.",
                correctAnswer: true,
                explanation: "'I'd love to' shows enthusiasm and politeness when accepting invitations.",
                hint: "Think about how this phrase sounds - positive or negative?"
            },
            {
                id: "1-7",
                type: "character-select",
                character: {
                    name: "The Lazy Complainer",
                    icon: "😏",
                    description: "Very talented but often doesn't show up, complains about everything, and thinks the work is too hard."
                },
                question: "The Lazy Complainer wants to join. What's a polite way to refuse?",
                options: [
                    { letter: "A", text: "Thanks for the offer, but I think we need someone more reliable.", correct: true },
                    { letter: "B", text: "You're terrible! Go away!", correct: false },
                    { letter: "C", text: "Maybe, I don't know, whatever.", correct: false },
                    { letter: "D", text: "Sure, you seem amazing!", correct: false }
                ],
                correctFeedback: "Perfect! Polite refusal with a clear reason!",
                incorrectFeedback: "Be polite but honest about why you're refusing.",
                hint: "Start with 'Thanks' or 'Thank you' and give a kind reason."
            },
            {
                id: "1-8",
                type: "character-select",
                character: {
                    name: "The Creative Dreamer",
                    icon: "🎨",
                    description: "Full of amazing ideas, always positive, and sees solutions that others miss."
                },
                question: "How would you politely invite the Creative Dreamer to your team?",
                options: [
                    { letter: "A", text: "Would you like to join our team? We'd love to have a creative thinker!", correct: true },
                    { letter: "B", text: "Join us. Now. Immediately.", correct: false },
                    { letter: "C", text: "I guess you can come if you really want to.", correct: false },
                    { letter: "D", text: "Are you actually good at anything?", correct: false }
                ],
                correctFeedback: "Wonderful invitation! Polite question with a compliment!",
                incorrectFeedback: "An invitation should be polite and show why you want them!",
                hint: "Use 'Would you like to...' and mention their good qualities."
            },
            // STORY SCENE - Final team member
            {
                id: "1-9",
                type: "story",
                title: "The Perfect Team",
                narrative: "You've almost got your team ready! Just one more member to go. A calm, friendly person approaches you. They seem very patient and helpful.",
                character: {
                    icon: "🤗",
                    name: "The Patient Helper",
                    dialogue: "Hello! I noticed your team looks great. I'm really good at staying calm when things get stressful and I love helping others. Is there room for one more?"
                },
                continueText: "Complete your team →"
            },
            {
                id: "1-10",
                type: "fill-blank",
                context: "You want to formally invite the Patient Helper to complete your team.",
                sentence: "We would be delighted if you _____ our team!",
                options: [
                    { letter: "A", text: "joined", correct: true },
                    { letter: "B", text: "joining", correct: false },
                    { letter: "C", text: "will join", correct: false },
                    { letter: "D", text: "to join", correct: false }
                ],
                correctFeedback: "Correct! 'Would be delighted if you joined' is proper formal English!",
                incorrectFeedback: "After 'if' in formal invitations, we use the past simple form.",
                hint: "After 'would be delighted if you...', use past simple (joined)."
            }
        ],

        // ============================================
        // UNIT 2: TEEN LIFE - THE RHYTHM ROOM
        // ============================================
        2: [
            // STORY SCENE
            {
                id: "2-0",
                type: "story",
                title: "The Rhythm Room",
                narrative: "Your team enters a dark room. Suddenly, colorful lights flash on and music fills the air! Speakers on the walls start playing different genres. A screen displays a message.",
                character: {
                    icon: "🎧",
                    name: "Room Voice",
                    dialogue: "Welcome to the Rhythm Room! This door only opens for those who can express their preferences clearly. Tell us what you like and don't like - but do it politely!"
                },
                continueText: "Start expressing yourself →"
            },
            {
                id: "2-1",
                type: "comparison",
                comparison: {
                    item1: { icon: "🎷", label: "JAZZ" },
                    item2: { icon: "🎤", label: "POP" }
                },
                question: "Complete: 'I prefer jazz ____ pop because it's relaxing.'",
                options: [
                    { letter: "A", text: "to", correct: true },
                    { letter: "B", text: "than", correct: false },
                    { letter: "C", text: "from", correct: false },
                    { letter: "D", text: "and", correct: false }
                ],
                correctFeedback: "Great! 'Prefer X to Y' is the correct structure!",
                incorrectFeedback: "With 'prefer', we use 'to' not 'than'!",
                hint: "The structure is: 'I prefer [something] TO [something else]'"
            },
            // TRUE/FALSE
            {
                id: "2-2",
                type: "true-false",
                statement: "The phrase 'I would rather' means the same as 'I prefer'.",
                correctAnswer: true,
                explanation: "Both phrases express preference! 'I'd rather play games' = 'I prefer playing games'.",
                hint: "Think about what 'I'd rather stay home than go out' means."
            },
            {
                id: "2-3",
                type: "comparison",
                comparison: {
                    item1: { icon: "🏕️", label: "CAMPING" },
                    item2: { icon: "🛍️", label: "SHOPPING" }
                },
                question: "Which sentence correctly expresses that you like camping more?",
                options: [
                    { letter: "A", text: "I prefer camping to shopping because it's adventurous.", correct: true },
                    { letter: "B", text: "I prefer camping to shopping because it's boring.", correct: false },
                    { letter: "C", text: "Shopping and camping is the same.", correct: false },
                    { letter: "D", text: "I am camping right now.", correct: false }
                ],
                correctFeedback: "Excellent! Positive adjective for what you prefer!",
                incorrectFeedback: "Your reason should be positive for the thing you prefer!",
                hint: "If you PREFER something, your reason should be POSITIVE about it!"
            },
            // STORY SCENE
            {
                id: "2-4",
                type: "story",
                title: "Strong Opinions",
                narrative: "A loud, heavy metal song starts playing from the speakers. Some of your teammates cover their ears! The screen asks for your honest opinion.",
                character: {
                    icon: "🔊",
                    name: "Room Voice",
                    dialogue: "How do you feel about heavy metal music? Be honest, but remember to use descriptive words! Is it fantastic? Terrible? Unbearable? Express yourself!"
                },
                continueText: "Share your opinion →"
            },
            {
                id: "2-5",
                type: "fill-blank",
                context: "You want to politely say you don't enjoy heavy metal.",
                sentence: "I'm not very _____ on heavy metal because it's too loud for me.",
                options: [
                    { letter: "A", text: "keen", correct: true },
                    { letter: "B", text: "happy", correct: false },
                    { letter: "C", text: "listen", correct: false },
                    { letter: "D", text: "music", correct: false }
                ],
                correctFeedback: "'Not keen on' is a polite way to express mild dislike!",
                incorrectFeedback: "The phrase 'not _____ on' means you don't really like something.",
                hint: "'I'm not _____ on' means 'I don't really like'. It rhymes with 'bean'!"
            },
            {
                id: "2-6",
                type: "comparison",
                comparison: {
                    item1: { icon: "👗", label: "TRENDY" },
                    item2: { icon: "👕", label: "CASUAL" }
                },
                question: "Complete: 'I am fond _____ casual clothes because they're comfortable.'",
                options: [
                    { letter: "A", text: "of", correct: true },
                    { letter: "B", text: "to", correct: false },
                    { letter: "C", text: "at", correct: false },
                    { letter: "D", text: "in", correct: false }
                ],
                correctFeedback: "'Fond of' means you like something!",
                incorrectFeedback: "The phrase is 'fond OF' not 'fond to'!",
                hint: "'I am fond ___ something' - which preposition fits?"
            },
            // TRUE/FALSE
            {
                id: "2-7",
                type: "true-false",
                statement: "'I can't stand' means you really dislike something.",
                correctAnswer: true,
                explanation: "'Can't stand' is a strong way to say you really don't like something!",
                hint: "If you 'can't stand' something, would you want to be near it?"
            },
            {
                id: "2-8",
                type: "comparison",
                comparison: {
                    item1: { icon: "📱", label: "TEXTING" },
                    item2: { icon: "📞", label: "CALLING" }
                },
                question: "Which sentence uses 'would rather' correctly?",
                options: [
                    { letter: "A", text: "I would rather text than call because it's quicker.", correct: true },
                    { letter: "B", text: "I would rather to text than call.", correct: false },
                    { letter: "C", text: "I would rather texting than calling.", correct: false },
                    { letter: "D", text: "I would rather text to call.", correct: false }
                ],
                correctFeedback: "'Would rather + verb' is the correct form!",
                incorrectFeedback: "After 'would rather', use the base form of the verb (no 'to', no '-ing')!",
                hint: "Would rather + BASE VERB (text, call, go, stay...)"
            },
            {
                id: "2-9",
                type: "comparison",
                comparison: {
                    item1: { icon: "🎮", label: "VIDEO GAMES" },
                    item2: { icon: "📖", label: "READING" }
                },
                question: "Your friend says 'I think reading is boring.' How do you politely disagree?",
                options: [
                    { letter: "A", text: "I see your point, but I actually find reading quite interesting.", correct: true },
                    { letter: "B", text: "You're completely wrong! Reading is amazing!", correct: false },
                    { letter: "C", text: "Whatever, I don't care what you think.", correct: false },
                    { letter: "D", text: "Books is better than games obviously.", correct: false }
                ],
                correctFeedback: "Polite disagreement - acknowledge their view first!",
                incorrectFeedback: "When disagreeing politely, start by acknowledging their opinion!",
                hint: "Use phrases like 'I see your point, but...' to disagree politely."
            }
        ],

        // ============================================
        // UNIT 3: IN THE KITCHEN - THE ALCHEMIST'S KITCHEN
        // ============================================
        3: [
            // STORY SCENE
            {
                id: "3-0",
                type: "story",
                title: "The Magical Kitchen",
                narrative: "The door opens to reveal an incredible sight - a kitchen where pots stir themselves and vegetables float in the air! A glowing cookbook sits on a stone pedestal. Cooking utensils dance around you!",
                character: {
                    icon: "📖",
                    name: "Magic Cookbook",
                    dialogue: "Greetings, young chefs! To earn the golden key, you must prove your kitchen knowledge. I will test you on cooking vocabulary and recipe sequences. Are you ready to cook up some answers?"
                },
                continueText: "Open the cookbook →"
            },
            {
                id: "3-1",
                type: "recipe",
                recipeStep: "_____ crack the eggs into a bowl",
                question: "What sequence word starts a recipe?",
                options: [
                    { letter: "A", text: "First", correct: true },
                    { letter: "B", text: "Finally", correct: false },
                    { letter: "C", text: "Then", correct: false },
                    { letter: "D", text: "After", correct: false }
                ],
                correctFeedback: "Correct! Recipes always start with 'First'!",
                incorrectFeedback: "Think about the BEGINNING of a sequence.",
                hint: "What word means 'at the beginning' or 'step 1'?"
            },
            // TRUE/FALSE
            {
                id: "3-2",
                type: "true-false",
                statement: "'Then' and 'Next' can both be used to show the second step in a recipe.",
                correctAnswer: true,
                explanation: "Both 'Then' and 'Next' work for middle steps: 'First, crack eggs. Then/Next, add flour.'",
                hint: "Can you say 'First, crack eggs. Then, mix' AND 'First, crack eggs. Next, mix'?"
            },
            {
                id: "3-3",
                type: "recipe",
                recipeStep: "First, crack the eggs. _____, add the flour slowly.",
                question: "What comes after 'First' in a sequence?",
                options: [
                    { letter: "A", text: "Then", correct: true },
                    { letter: "B", text: "First", correct: false },
                    { letter: "C", text: "Finally", correct: false },
                    { letter: "D", text: "Begin", correct: false }
                ],
                correctFeedback: "Perfect! First → Then → Next → Finally!",
                incorrectFeedback: "What word shows the second step in a sequence?",
                hint: "The order is: First → _____ → Next → Finally"
            },
            // STORY SCENE
            {
                id: "3-4",
                type: "story",
                title: "Cooking Vocabulary",
                narrative: "A floating cutting board zooms toward you! On it sits a potato. The cookbook's pages flutter and it speaks again.",
                character: {
                    icon: "🥔",
                    name: "Magic Cookbook",
                    dialogue: "Now let's test your cooking verbs! There are many ways to prepare food - chopping, peeling, frying, boiling... Each verb means something different. Show me what you know!"
                },
                continueText: "Learn the verbs →"
            },
            {
                id: "3-5",
                type: "recipe",
                recipeStep: "_____ the potatoes before cutting them",
                displayImage: "🥔 ➜ 🥔(no skin)",
                question: "What do you do to remove the skin from potatoes?",
                options: [
                    { letter: "A", text: "Peel", correct: true },
                    { letter: "B", text: "Fry", correct: false },
                    { letter: "C", text: "Boil", correct: false },
                    { letter: "D", text: "Mix", correct: false }
                ],
                correctFeedback: "Right! 'Peel' means to remove the outer skin!",
                incorrectFeedback: "Think about removing the outer layer...",
                hint: "When you remove the skin, you are _____ing the potato."
            },
            {
                id: "3-6",
                type: "recipe",
                recipeStep: "_____ the onions into small pieces",
                displayImage: "🧅 ➜ 🔪 ➜ 🧅🧅🧅",
                question: "What verb means 'to cut into small pieces'?",
                options: [
                    { letter: "A", text: "Chop", correct: true },
                    { letter: "B", text: "Peel", correct: false },
                    { letter: "C", text: "Pour", correct: false },
                    { letter: "D", text: "Melt", correct: false }
                ],
                correctFeedback: "Yes! 'Chop' means to cut into small pieces!",
                incorrectFeedback: "Using a knife to make small pieces is called...",
                hint: "Chop chop! Cut cut! Into small pieces!"
            },
            // TRUE/FALSE
            {
                id: "3-7",
                type: "true-false",
                statement: "'Slice' and 'chop' mean exactly the same thing in cooking.",
                correctAnswer: false,
                explanation: "'Slice' means to cut into thin, flat pieces. 'Chop' means to cut into small chunks. They're different!",
                hint: "Think about sliced bread vs. chopped onions - are they the same shape?"
            },
            {
                id: "3-8",
                type: "recipe",
                recipeStep: "_____ the butter in a pan over medium heat",
                displayImage: "🧈 + 🍳 + 🔥 = 💧🧈",
                question: "What happens to butter when you heat it? The butter will...",
                options: [
                    { letter: "A", text: "melt", correct: true },
                    { letter: "B", text: "chop", correct: false },
                    { letter: "C", text: "peel", correct: false },
                    { letter: "D", text: "slice", correct: false }
                ],
                correctFeedback: "Perfect! Butter melts when heated!",
                incorrectFeedback: "When solid becomes liquid from heat, it...",
                hint: "Ice cream in the sun does this too! It becomes liquid."
            },
            {
                id: "3-9",
                type: "recipe",
                recipeStep: "First, peel. Then, chop. Next, fry. _____, serve the dish.",
                question: "What sequence word shows the LAST step?",
                options: [
                    { letter: "A", text: "Finally", correct: true },
                    { letter: "B", text: "Then", correct: false },
                    { letter: "C", text: "Next", correct: false },
                    { letter: "D", text: "After", correct: false }
                ],
                correctFeedback: "Excellent! 'Finally' marks the last step!",
                incorrectFeedback: "What word means 'at the end' or 'the last step'?",
                hint: "The final step uses the word 'Final-ly'!"
            },
            {
                id: "3-10",
                type: "fill-blank",
                context: "You're describing how your magical dish turned out!",
                sentence: "The soup looks _____ and smells amazing!",
                options: [
                    { letter: "A", text: "delicious", correct: true },
                    { letter: "B", text: "angry", correct: false },
                    { letter: "C", text: "purple", correct: false },
                    { letter: "D", text: "running", correct: false }
                ],
                correctFeedback: "Perfect! 'Delicious' describes tasty food!",
                incorrectFeedback: "Use a food adjective - a word that describes how food tastes!",
                hint: "What word means 'very tasty' or 'yummy'?"
            }
        ],

        // ============================================
        // UNIT 4: ON THE PHONE - THE FINAL EXIT
        // ============================================
        4: [
            // STORY SCENE
            {
                id: "4-0",
                type: "story",
                title: "The Final Challenge",
                narrative: "You enter the last room. A massive steel door blocks your escape, with a digital keypad beside it. Suddenly, an old-fashioned telephone on a desk starts ringing! Your teammates look at you nervously.",
                character: {
                    icon: "📞",
                    name: "Teammate",
                    dialogue: "The phone is ringing! Someone answer it! Maybe they can give us the exit code. But remember - we need to be polite and professional, or they might hang up on us!"
                },
                continueText: "Answer the phone →"
            },
            {
                id: "4-1",
                type: "phone",
                phoneDisplay: "📞 INCOMING CALL",
                phoneAction: "Ring ring!",
                question: "The phone is ringing. How should you answer politely?",
                options: [
                    { letter: "A", text: "Hello, this is the Escape Team speaking.", correct: true },
                    { letter: "B", text: "Yeah, what do you want?", correct: false },
                    { letter: "C", text: "Who is calling me?!", correct: false },
                    { letter: "D", text: "Talk quickly, I'm busy!", correct: false }
                ],
                correctFeedback: "Professional greeting! The caller is impressed!",
                incorrectFeedback: "Be polite and professional - introduce yourself!",
                hint: "Start with 'Hello' and say who you are."
            },
            // TRUE/FALSE
            {
                id: "4-2",
                type: "true-false",
                statement: "When answering a phone, you should say who you are.",
                correctAnswer: true,
                explanation: "It's polite to identify yourself: 'Hello, this is [name] speaking.'",
                hint: "Does the caller know who answered if you don't say?"
            },
            {
                id: "4-3",
                type: "phone",
                phoneDisplay: "🎧 OPERATOR",
                phoneAction: "How may I help you today?",
                question: "You need to speak to the Code Keeper. What's the polite way to ask?",
                options: [
                    { letter: "A", text: "May I speak to the Code Keeper, please?", correct: true },
                    { letter: "B", text: "Give me the Code Keeper now!", correct: false },
                    { letter: "C", text: "Where is your boss?", correct: false },
                    { letter: "D", text: "I want to talk to someone important.", correct: false }
                ],
                correctFeedback: "Excellent manners! Transferring your call now...",
                incorrectFeedback: "Use 'May I speak to...' or 'Could I speak to...' to be polite!",
                hint: "Start with 'May I' or 'Could I' + 'speak to' + name + 'please'."
            },
            // STORY SCENE
            {
                id: "4-4",
                type: "story",
                title: "Connection Problems",
                narrative: "The operator transfers your call, but suddenly there's static and crackling sounds! The connection is bad. You can barely hear the voice on the other end.",
                character: {
                    icon: "📡",
                    name: "Voice on Phone",
                    dialogue: "*crackle* ...hello? *static* ...can you... *crackle crackle* ...hear me? The code is... *static*..."
                },
                continueText: "Handle the bad connection →"
            },
            {
                id: "4-5",
                type: "phone",
                phoneDisplay: "📡 BAD CONNECTION",
                phoneAction: "*static noises*",
                question: "The line is bad and you can't hear clearly. What should you say?",
                options: [
                    { letter: "A", text: "I'm sorry, the line is bad. Could you speak up, please?", correct: true },
                    { letter: "B", text: "This phone is terrible! Fix it!", correct: false },
                    { letter: "C", text: "I can't hear! *hangs up*", correct: false },
                    { letter: "D", text: "WHAT?! SPEAK LOUDER!!", correct: false }
                ],
                correctFeedback: "Polite problem-solving! The connection gets better!",
                incorrectFeedback: "Stay polite even when there's a problem. Explain the issue nicely.",
                hint: "Explain the problem politely and ask for help using 'please'."
            },
            // TRUE/FALSE
            {
                id: "4-6",
                type: "true-false",
                statement: "'Could you speak up?' is a polite way to ask someone to talk louder.",
                correctAnswer: true,
                explanation: "'Could you speak up?' is much politer than 'Talk louder!' or 'Speak up!'",
                hint: "Does using 'Could you' make a request more polite?"
            },
            {
                id: "4-7",
                type: "phone",
                phoneDisplay: "❓ HOLD PLEASE",
                phoneAction: "Can you hold for a moment?",
                question: "The operator asks you to wait. What's the polite response?",
                options: [
                    { letter: "A", text: "Of course, I'll hold.", correct: true },
                    { letter: "B", text: "No! I can't wait!", correct: false },
                    { letter: "C", text: "*hangs up angrily*", correct: false },
                    { letter: "D", text: "How long? This is so annoying!", correct: false }
                ],
                correctFeedback: "Patience and politeness! They appreciate it!",
                incorrectFeedback: "When asked to hold, agree politely and wait.",
                hint: "Just agree politely. Patience is important in phone calls!"
            },
            {
                id: "4-8",
                type: "phone",
                phoneDisplay: "🎮 CODE KEEPER",
                phoneAction: "I'm not available right now.",
                question: "The Code Keeper isn't available. What should you ask?",
                options: [
                    { letter: "A", text: "Could you take a message? Please ask them to call me back.", correct: true },
                    { letter: "B", text: "This is ridiculous! I need the code now!", correct: false },
                    { letter: "C", text: "Whatever, I'll just break down the door.", correct: false },
                    { letter: "D", text: "Find them immediately!", correct: false }
                ],
                correctFeedback: "Professional! They're checking if the Code Keeper can call back...",
                incorrectFeedback: "When someone isn't available, ask to leave a message or request a callback.",
                hint: "Ask them to 'take a message' or have the person 'call back'."
            },
            // STORY SCENE
            {
                id: "4-9",
                type: "story",
                title: "The Code Revealed",
                narrative: "After a moment, a friendly voice comes on the line. It's the Code Keeper! They were just getting the information you needed.",
                character: {
                    icon: "😊",
                    name: "Code Keeper",
                    dialogue: "Hello! Sorry for the wait. I have your exit code ready. It's 4-7-2-9. That's four, seven, two, nine. Did you get that?"
                },
                continueText: "Complete the call →"
            },
            {
                id: "4-10",
                type: "phone",
                phoneDisplay: "📞 END CALL",
                phoneAction: "Is there anything else I can help with?",
                question: "The call is ending. How do you finish politely?",
                options: [
                    { letter: "A", text: "That's everything, thank you so much for your help. Goodbye!", correct: true },
                    { letter: "B", text: "Bye. *click*", correct: false },
                    { letter: "C", text: "Finally! That took forever!", correct: false },
                    { letter: "D", text: "*hangs up without saying anything*", correct: false }
                ],
                correctFeedback: "Perfect phone etiquette from start to finish!",
                incorrectFeedback: "End calls politely - thank them and say goodbye properly!",
                hint: "Thank them for their help and say a proper goodbye."
            },
            {
                id: "4-11",
                type: "keypad",
                phoneDisplay: "🔢 ENTER CODE",
                phoneAction: "The code was: 4-7-2-9",
                question: "What is the FIRST digit of the exit code?",
                options: [
                    { letter: "A", text: "4", correct: true },
                    { letter: "B", text: "7", correct: false },
                    { letter: "C", text: "2", correct: false },
                    { letter: "D", text: "9", correct: false }
                ],
                correctFeedback: "First digit correct! The door begins to unlock!",
                incorrectFeedback: "Listen carefully! The code is 4-7-2-9. What's first?",
                hint: "The code is 4-7-2-9. The FIRST number is..."
            },
            {
                id: "4-12",
                type: "keypad",
                phoneDisplay: "🔢 ENTER CODE",
                phoneAction: "4 - _ - _ - _",
                question: "What is the SECOND digit?",
                options: [
                    { letter: "A", text: "7", correct: true },
                    { letter: "B", text: "4", correct: false },
                    { letter: "C", text: "2", correct: false },
                    { letter: "D", text: "9", correct: false }
                ],
                correctFeedback: "Second digit correct! Keep going!",
                incorrectFeedback: "The code is 4-7-2-9. What comes after 4?",
                hint: "4 - ? - 2 - 9"
            }
        ],

        // ============================================
        // UNIT 5: BONUS CHALLENGES
        // ============================================
        5: [
            {
                id: "5-0",
                type: "story",
                title: "Bonus Round!",
                narrative: "Congratulations! You've escaped the main rooms! But wait - a secret door opens, revealing a glittering bonus chamber. Inside are extra challenges for those who want to prove they're true champions!",
                character: {
                    icon: "⭐",
                    name: "Bonus Master",
                    dialogue: "Welcome, champions! These bonus questions will test everything you've learned. Are you ready for the ultimate challenge? Each correct answer earns you extra points!"
                },
                continueText: "Accept the challenge →"
            },
            {
                id: "5-1",
                type: "bonus",
                category: "Grammar",
                icon: "📝",
                question: "Which sentence uses 'would rather' correctly?",
                options: [
                    { letter: "A", text: "I would rather stay home than go out.", correct: true },
                    { letter: "B", text: "I would rather to stay home.", correct: false },
                    { letter: "C", text: "I would rather staying home.", correct: false },
                    { letter: "D", text: "I would rather home stay.", correct: false }
                ],
                correctFeedback: "Perfect! 'Would rather + base verb + than + base verb'!",
                incorrectFeedback: "'Would rather' is followed by the base form of the verb!",
                hint: "Would rather + verb (no 'to', no '-ing') + than + verb"
            },
            {
                id: "5-2",
                type: "true-false",
                statement: "'To simmer' means to cook food at very high heat with big bubbles.",
                correctAnswer: false,
                explanation: "'To simmer' means to cook gently at LOW heat with small bubbles, just below boiling point.",
                hint: "Is simmering gentle or aggressive cooking?"
            },
            {
                id: "5-3",
                type: "bonus",
                category: "Phone Skills",
                icon: "📱",
                question: "You accidentally called the wrong number. What should you say?",
                options: [
                    { letter: "A", text: "I'm sorry, I must have the wrong number. Goodbye.", correct: true },
                    { letter: "B", text: "*just hang up without saying anything*", correct: false },
                    { letter: "C", text: "Wrong number! *click*", correct: false },
                    { letter: "D", text: "This isn't who I wanted!", correct: false }
                ],
                correctFeedback: "Very polite! Even mistakes deserve courtesy!",
                incorrectFeedback: "Apologize politely and say goodbye properly.",
                hint: "Start with 'I'm sorry' and explain the mistake."
            },
            {
                id: "5-4",
                type: "bonus",
                category: "Friendship",
                icon: "🤝",
                question: "Your friend suggests a movie you don't want to see. The polite response is:",
                options: [
                    { letter: "A", text: "I'm not really interested in that one. Could we maybe see something else?", correct: true },
                    { letter: "B", text: "That movie looks terrible. No way!", correct: false },
                    { letter: "C", text: "Fine, whatever you want.", correct: false },
                    { letter: "D", text: "You always pick bad movies.", correct: false }
                ],
                correctFeedback: "Excellent! Honest but kind, and you offered an alternative!",
                incorrectFeedback: "Express your preference politely and suggest an alternative.",
                hint: "Be honest about your feelings but offer to compromise."
            },
            {
                id: "5-5",
                type: "bonus",
                category: "Cooking",
                icon: "🍳",
                question: "Put cooking steps in order: A) Serve  B) Boil water  C) Add pasta  D) Drain water",
                options: [
                    { letter: "A", text: "B → C → D → A (Boil, Add, Drain, Serve)", correct: true },
                    { letter: "B", text: "A → B → C → D", correct: false },
                    { letter: "C", text: "C → B → A → D", correct: false },
                    { letter: "D", text: "D → A → B → C", correct: false }
                ],
                correctFeedback: "Perfect sequence! First boil, then add pasta, drain, and serve!",
                incorrectFeedback: "Think about the logical order of cooking pasta.",
                hint: "What do you need FIRST before you can add pasta to it?"
            },
            {
                id: "5-6",
                type: "true-false",
                statement: "'I'm fond of' and 'I'm keen on' both express that you like something.",
                correctAnswer: true,
                explanation: "Both phrases mean you like something! 'I'm fond of music' = 'I'm keen on music'.",
                hint: "Would you use these phrases for things you like or dislike?"
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
            condition: (stats) => stats.unit4Correct >= 7
        },
        {
            id: "speed_demon",
            name: "Speed Demon",
            description: "Finished with 10+ minutes remaining",
            icon: "⚡",
            condition: (stats) => stats.timeRemaining >= 600
        },
        {
            id: "perfect_score",
            name: "Perfect Score",
            description: "Answered all correctly on first try",
            icon: "💯",
            condition: (stats) => stats.firstTryCorrect === stats.totalQuestions
        },
        {
            id: "bonus_master",
            name: "Bonus Master",
            description: "Completed all bonus challenges",
            icon: "⭐",
            condition: (stats) => stats.unit5Correct >= 4
        },
        {
            id: "story_lover",
            name: "Story Lover",
            description: "Enjoyed all the narrative moments",
            icon: "📖",
            condition: (stats) => stats.completed
        },
        {
            id: "never_give_up",
            name: "Never Give Up",
            description: "Completed despite mistakes",
            icon: "💪",
            condition: (stats) => stats.totalIncorrect >= 5 && stats.completed
        },
        {
            id: "truth_seeker",
            name: "Truth Seeker",
            description: "Got 5+ true/false questions right",
            icon: "✓",
            condition: (stats) => stats.trueFalseCorrect >= 5
        }
    ]
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAME_DATA;
}
