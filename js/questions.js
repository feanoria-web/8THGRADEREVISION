// ============================================
// ESCAPE ROOM TOURNAMENT - QUESTION DATA
// All units, questions, and backup activities
// ============================================

const GAME_DATA = {
    // Game settings
    settings: {
        totalTime: 25 * 60, // 25 minutes in seconds
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
            introDesc: "You need to assemble your Escape Team! Choose 4 teammates wisely. Select team members who will help you succeed!",
            completionMessage: "TEAM ASSEMBLED!",
            completionDesc: "You chose: Honest Genius, Reliable Worker, Patient Helper, Creative Dreamer"
        },
        {
            id: 2,
            name: "The Rhythm Room",
            theme: "Teen Life",
            icon: "🎵",
            color: "#9b59b6",
            introTitle: "UNIT 2: THE RHYTHM ROOM",
            introDesc: "The door is voice-activated! It will only open if you express your preferences correctly. Listen and choose wisely!",
            completionMessage: "RHYTHM ROOM UNLOCKED!",
            completionDesc: "The door swings open! You expressed your preferences like a pro!"
        },
        {
            id: 3,
            name: "The Alchemist's Kitchen",
            theme: "In The Kitchen",
            icon: "🍳",
            color: "#f39c12",
            introTitle: "UNIT 3: THE ALCHEMIST'S KITCHEN",
            introDesc: "To get the key, follow the Recipe for Success! Click ingredients in the correct order. One mistake and the pot explodes!",
            completionMessage: "KEY OBTAINED!",
            completionDesc: "A golden key materializes from the potion! Grab it and run!"
        },
        {
            id: 4,
            name: "The Final Exit",
            theme: "On The Phone",
            icon: "📞",
            color: "#3498db",
            introTitle: "UNIT 4: THE FINAL EXIT",
            introDesc: "Final Challenge! Call Escape Support to get the exit code. Use proper phone etiquette or they'll hang up!",
            completionMessage: "CODE ACCEPTED!",
            completionDesc: "The massive door unlocks! Freedom awaits!"
        },
        {
            id: 5,
            name: "Bonus Challenges",
            theme: "Extra Credit",
            icon: "⭐",
            color: "#00cec9",
            introTitle: "BONUS ROUND",
            introDesc: "You've escaped! But can you complete these extra challenges for bonus points?",
            completionMessage: "BONUS COMPLETE!",
            completionDesc: "You're a true English champion!"
        }
    ],

    // All questions organized by room
    questions: {
        // ============================================
        // UNIT 1: FRIENDSHIP - THE LOBBY
        // ============================================
        1: [
            {
                id: "1-1",
                type: "character-select",
                character: {
                    name: "Angry Gamer",
                    icon: "😤",
                    description: "Skilled at puzzles but gets frustrated easily and yells at teammates."
                },
                question: "Would you invite the Angry Gamer to your team?",
                options: [
                    { letter: "A", text: "Yes, I'd love to have you on the team!", correct: false },
                    { letter: "B", text: "No, thanks. I need someone more reliable.", correct: true },
                    { letter: "C", text: "Maybe later, I'm thinking about it.", correct: false },
                    { letter: "D", text: "Hey, you seem angry. Go away!", correct: false }
                ],
                correctFeedback: "Good choice! You can count on having a calm team.",
                incorrectFeedback: "Not quite! Think about politeness and team needs.",
                hint: "A good teammate should be calm and reliable. Be polite when refusing!"
            },
            {
                id: "1-2",
                type: "character-select",
                character: {
                    name: "Honest Genius",
                    icon: "🧠",
                    description: "Brilliant problem-solver, always tells the truth, very dependable."
                },
                question: "Why would you invite the Honest Genius?",
                options: [
                    { letter: "A", text: "Because she is laid-back and fun", correct: false },
                    { letter: "B", text: "Because I can count on her to solve hard puzzles", correct: true },
                    { letter: "C", text: "Because she is angry and scary", correct: false },
                    { letter: "D", text: "Because she likes video games", correct: false }
                ],
                correctFeedback: "Perfect! Honesty and reliability are important!",
                incorrectFeedback: "Read the description again carefully!",
                hint: "Look at the character description - what qualities does she have?"
            },
            {
                id: "1-3",
                type: "character-select",
                character: {
                    name: "Reliable Worker",
                    icon: "💪",
                    description: "Always on time, never gives up, great backup when things get tough."
                },
                question: "Your teammate says: 'Would you like the Reliable Worker to join us?' You agree. What do you say?",
                options: [
                    { letter: "A", text: "Yeah, whatever.", correct: false },
                    { letter: "B", text: "I'd love to! We need good backup.", correct: true },
                    { letter: "C", text: "No way, I don't like him.", correct: false },
                    { letter: "D", text: "He's boring and slow.", correct: false }
                ],
                correctFeedback: "Excellent! Polite acceptance with a reason!",
                incorrectFeedback: "Try to be polite and give a reason!",
                hint: "When accepting, be enthusiastic and explain why!"
            },
            {
                id: "1-4",
                type: "character-select",
                character: {
                    name: "Unreliable Snob",
                    icon: "😏",
                    description: "Very talented but often doesn't show up and thinks he's better than everyone."
                },
                question: "The Unreliable Snob wants to join. What's the best response?",
                options: [
                    { letter: "A", text: "Sure, you're amazing!", correct: false },
                    { letter: "B", text: "I'd love to, but I think we need someone we can count on.", correct: true },
                    { letter: "C", text: "You're terrible! Go away!", correct: false },
                    { letter: "D", text: "Maybe, I don't know.", correct: false }
                ],
                correctFeedback: "Perfect refusal! Polite but clear!",
                incorrectFeedback: "Be polite but honest about your reasons.",
                hint: "Refuse politely and give a good reason based on the description."
            },
            {
                id: "1-5",
                type: "character-select",
                character: {
                    name: "Creative Dreamer",
                    icon: "🎨",
                    description: "Full of imaginative ideas, sees solutions others miss, great in emergencies."
                },
                question: "How would you invite the Creative Dreamer to your team?",
                options: [
                    { letter: "A", text: "Would you like to join our team? We need creative thinkers!", correct: true },
                    { letter: "B", text: "Join us. Now.", correct: false },
                    { letter: "C", text: "I guess you can come if you want.", correct: false },
                    { letter: "D", text: "Are you good at anything?", correct: false }
                ],
                correctFeedback: "Wonderful invitation! Polite and specific!",
                incorrectFeedback: "An invitation should be polite and show why you want them!",
                hint: "Use polite language and mention their specific qualities."
            },
            {
                id: "1-6",
                type: "character-select",
                character: {
                    name: "Patient Helper",
                    icon: "🤗",
                    description: "Never gets stressed, helps everyone stay calm, excellent at encouraging others."
                },
                question: "Complete the invitation: 'We would be delighted if you ____ our team!'",
                options: [
                    { letter: "A", text: "joining", correct: false },
                    { letter: "B", text: "joined", correct: true },
                    { letter: "C", text: "will join", correct: false },
                    { letter: "D", text: "to join", correct: false }
                ],
                correctFeedback: "Correct! 'Would be delighted if you joined' is proper formal English!",
                incorrectFeedback: "After 'if' in formal invitations, we use the past tense.",
                hint: "After 'would be delighted if you...', what form of the verb follows?"
            }
        ],

        // ============================================
        // UNIT 2: TEEN LIFE - THE RHYTHM ROOM
        // ============================================
        2: [
            {
                id: "2-1",
                type: "comparison",
                comparison: {
                    item1: { icon: "🎷", label: "JAZZ" },
                    item2: { icon: "🎤", label: "POP" }
                },
                question: "Complete the sentence about your preference:",
                options: [
                    { letter: "A", text: "I prefer jazz to pop because it's terrific.", correct: true },
                    { letter: "B", text: "I like jazz and pop the same.", correct: false },
                    { letter: "C", text: "Jazz and pop is unbearable.", correct: false },
                    { letter: "D", text: "I think music is good.", correct: false }
                ],
                correctFeedback: "Great comparison! The lock is turning green!",
                incorrectFeedback: "Use 'prefer...to...' and give an opinion!",
                hint: "Use the structure: 'I prefer X to Y because it's [adjective]'"
            },
            {
                id: "2-2",
                type: "comparison",
                comparison: {
                    item1: { icon: "🏕️", label: "CAMPING" },
                    item2: { icon: "🛍️", label: "SHOPPING" }
                },
                question: "Which sentence correctly expresses a preference?",
                options: [
                    { letter: "A", text: "I would rather go camping than shopping because it's ridiculous.", correct: false },
                    { letter: "B", text: "I prefer camping to shopping because it's terrific.", correct: true },
                    { letter: "C", text: "Shopping and camping is fun.", correct: false },
                    { letter: "D", text: "I like camping but shopping too.", correct: false }
                ],
                correctFeedback: "Excellent! Clear preference with a positive reason!",
                incorrectFeedback: "Match your reason to what you prefer!",
                hint: "Your adjective should match your preference - positive adjective for what you like!"
            },
            {
                id: "2-3",
                type: "comparison",
                comparison: {
                    item1: { icon: "🎸", label: "HEAVY METAL" },
                    item2: { icon: "🔊", label: "LOUD MUSIC" }
                },
                question: "The lock asks: 'What do you think of heavy metal music?'",
                options: [
                    { letter: "A", text: "I rarely listen to heavy metal because it's too loud.", correct: true },
                    { letter: "B", text: "I think heavy metal is unbearable!", correct: true },
                    { letter: "C", text: "Heavy metal is music.", correct: false },
                    { letter: "D", text: "I am listening to it.", correct: false }
                ],
                correctFeedback: "The lock recognizes your voice! Access granted!",
                incorrectFeedback: "Express a clear opinion with an adjective!",
                hint: "Use frequency words (rarely, often, always) or opinion adjectives (unbearable, terrific)"
            },
            {
                id: "2-4",
                type: "comparison",
                comparison: {
                    item1: { icon: "👗", label: "TRENDY" },
                    item2: { icon: "👕", label: "CASUAL" }
                },
                question: "Complete: 'I am fond of ____ clothes because ____'",
                options: [
                    { letter: "A", text: "casual / they're comfortable and relaxed", correct: true },
                    { letter: "B", text: "trendy / I never wear them", correct: false },
                    { letter: "C", text: "clothes / they are good", correct: false },
                    { letter: "D", text: "shopping / I like malls", correct: false }
                ],
                correctFeedback: "Perfect match! The Sonic Lock is fully unlocked!",
                incorrectFeedback: "Make sure your reason matches your preference!",
                hint: "'I am fond of' means you like something. Your reason should support this!"
            },
            {
                id: "2-5",
                type: "comparison",
                comparison: {
                    item1: { icon: "📱", label: "TEXTING" },
                    item2: { icon: "📞", label: "CALLING" }
                },
                question: "Express your preference for communication:",
                options: [
                    { letter: "A", text: "I prefer texting to calling because it's more convenient.", correct: true },
                    { letter: "B", text: "Texting and calling is the same thing.", correct: false },
                    { letter: "C", text: "I am calling right now.", correct: false },
                    { letter: "D", text: "Phones is good for talking.", correct: false }
                ],
                correctFeedback: "Perfect! Clear preference with a good reason!",
                incorrectFeedback: "Express a clear preference using 'prefer...to...' or 'would rather'!",
                hint: "Use 'I prefer X to Y because...' structure"
            },
            {
                id: "2-6",
                type: "comparison",
                comparison: {
                    item1: { icon: "🎮", label: "VIDEO GAMES" },
                    item2: { icon: "📖", label: "READING" }
                },
                question: "Which shows a polite way to disagree about preferences?",
                options: [
                    { letter: "A", text: "You're wrong! Reading is boring!", correct: false },
                    { letter: "B", text: "I see your point, but I prefer video games because they're more interactive.", correct: true },
                    { letter: "C", text: "Whatever, I don't care.", correct: false },
                    { letter: "D", text: "Games is better than books.", correct: false }
                ],
                correctFeedback: "Brilliant! Polite disagreement with reasoning!",
                incorrectFeedback: "When disagreeing, acknowledge the other opinion first!",
                hint: "Use phrases like 'I see your point, but...' to disagree politely"
            }
        ],

        // ============================================
        // UNIT 3: IN THE KITCHEN - THE ALCHEMIST'S KITCHEN
        // ============================================
        3: [
            {
                id: "3-1",
                type: "recipe",
                recipeStep: "???? crack the eggs into a bowl",
                question: "What word comes first in the recipe?",
                options: [
                    { letter: "A", text: "Finally", correct: false },
                    { letter: "B", text: "Then", correct: false },
                    { letter: "C", text: "First", correct: true },
                    { letter: "D", text: "After that", correct: false }
                ],
                correctFeedback: "Correct! First, crack the eggs! The pot is ready!",
                incorrectFeedback: "Think about the starting word for instructions!",
                hint: "What word do we use to begin a sequence of instructions?"
            },
            {
                id: "3-2",
                type: "recipe",
                recipeStep: "First, crack the eggs. ____, add the flour slowly.",
                question: "What comes next in the sequence?",
                options: [
                    { letter: "A", text: "First", correct: false },
                    { letter: "B", text: "Finally", correct: false },
                    { letter: "C", text: "Then", correct: true },
                    { letter: "D", text: "Before", correct: false }
                ],
                correctFeedback: "Perfect! Then, add the flour! The mixture is forming!",
                incorrectFeedback: "What word shows the second step?",
                hint: "After 'First', we use words like 'Then', 'Next', or 'After that'"
            },
            {
                id: "3-3",
                type: "recipe",
                recipeStep: "_____ the onions into small pieces",
                displayImage: "🧅 ➜ 🔪 ➜ 🧅🧅🧅",
                question: "The recipe says: '_____ the onions into small pieces.' What's the correct verb?",
                options: [
                    { letter: "A", text: "Peel", correct: false },
                    { letter: "B", text: "Chop", correct: true },
                    { letter: "C", text: "Boil", correct: false },
                    { letter: "D", text: "Pour", correct: false }
                ],
                correctFeedback: "Yes! Chop the onions! The pot is bubbling!",
                incorrectFeedback: "Think about cutting into small pieces!",
                hint: "To cut something into small pieces, we use the verb..."
            },
            {
                id: "3-4",
                type: "recipe",
                recipeStep: "First, crack eggs. Then, add flour. Next, chop onions. _____, pour the mixture into the glass.",
                question: "What's the final sequence word?",
                options: [
                    { letter: "A", text: "Then", correct: false },
                    { letter: "B", text: "Next", correct: false },
                    { letter: "C", text: "Finally", correct: true },
                    { letter: "D", text: "After", correct: false }
                ],
                correctFeedback: "Excellent! Finally, pour it! The potion is complete!",
                incorrectFeedback: "What word shows the last step?",
                hint: "What word indicates the end of a sequence?"
            },
            {
                id: "3-5",
                type: "recipe",
                recipeStep: "_____ the butter in a pan over medium heat",
                displayImage: "🧈 + 🍳 + 🔥 = 💧🧈",
                question: "Choose the correct cooking verb:",
                options: [
                    { letter: "A", text: "Melt", correct: true },
                    { letter: "B", text: "Chop", correct: false },
                    { letter: "C", text: "Peel", correct: false },
                    { letter: "D", text: "Slice", correct: false }
                ],
                correctFeedback: "Perfect! Melt the butter! It's sizzling!",
                incorrectFeedback: "Think about what happens to butter when heated!",
                hint: "When butter gets hot, it becomes liquid. What verb describes this?"
            },
            {
                id: "3-6",
                type: "recipe",
                recipeStep: "The dish is ready!",
                displayImage: "🍲✨",
                question: "How would you describe this dish?",
                options: [
                    { letter: "A", text: "The ingredients look tasty and well-mixed.", correct: true },
                    { letter: "B", text: "The recipe is dancing.", correct: false },
                    { letter: "C", text: "Spicy is sour.", correct: false },
                    { letter: "D", text: "Kitchen is boiling.", correct: false }
                ],
                correctFeedback: "Perfect description! The KEY appears!",
                incorrectFeedback: "Use food adjectives correctly!",
                hint: "Use descriptive words like tasty, delicious, spicy, well-cooked, etc."
            },
            {
                id: "3-7",
                type: "recipe",
                recipeStep: "_____ the potatoes before cutting them",
                displayImage: "🥔 ➜ 🥔(no skin)",
                question: "What do you do to potatoes before cutting?",
                options: [
                    { letter: "A", text: "Fry", correct: false },
                    { letter: "B", text: "Boil", correct: false },
                    { letter: "C", text: "Peel", correct: true },
                    { letter: "D", text: "Slice", correct: false }
                ],
                correctFeedback: "Right! Peel means to remove the skin!",
                incorrectFeedback: "Think about removing the outer layer...",
                hint: "We remove the skin from potatoes. What's the verb for this?"
            }
        ],

        // ============================================
        // UNIT 4: ON THE PHONE - THE FINAL EXIT
        // ============================================
        4: [
            {
                id: "4-1",
                type: "phone",
                phoneDisplay: "📞 INCOMING CALL",
                phoneAction: "Ring ring!",
                question: "The phone is ringing. What do you say when you answer?",
                options: [
                    { letter: "A", text: "Hello, this is [Your Name] speaking.", correct: true },
                    { letter: "B", text: "Yeah, what?", correct: false },
                    { letter: "C", text: "Who is this?", correct: false },
                    { letter: "D", text: "Talk to me.", correct: false }
                ],
                correctFeedback: "Professional greeting! Support is listening!",
                incorrectFeedback: "Be polite and professional!",
                hint: "Start with 'Hello' and introduce yourself properly."
            },
            {
                id: "4-2",
                type: "phone",
                phoneDisplay: "🎧 SUPPORT OPERATOR",
                phoneAction: "How may I help you?",
                question: "You need to talk to the Game Master. What do you say?",
                options: [
                    { letter: "A", text: "Give me the Game Master now!", correct: false },
                    { letter: "B", text: "Is the Game Master there?", correct: false },
                    { letter: "C", text: "May I speak to the Game Master, please?", correct: true },
                    { letter: "D", text: "Where's your boss?", correct: false }
                ],
                correctFeedback: "Excellent manners! Transferring you now...",
                incorrectFeedback: "Be more polite! This is important!",
                hint: "Use 'May I speak to...' or 'Could I speak to...' for polite requests."
            },
            {
                id: "4-3",
                type: "phone",
                phoneDisplay: "📡 BAD CONNECTION",
                phoneAction: "*static noises*",
                question: "The line is bad! What's the appropriate response?",
                options: [
                    { letter: "A", text: "This phone is terrible! Fix it!", correct: false },
                    { letter: "B", text: "I can't hear anything. Bye!", correct: false },
                    { letter: "C", text: "The line is bad. Could you speak up, please?", correct: true },
                    { letter: "D", text: "What? What? WHAT?", correct: false }
                ],
                correctFeedback: "Polite problem-solving! The connection improves!",
                incorrectFeedback: "Stay polite even when there's a problem!",
                hint: "Explain the problem politely and ask for help."
            },
            {
                id: "4-4",
                type: "phone",
                phoneDisplay: "🎮 GAME MASTER",
                phoneAction: "The Code Keeper is not available right now.",
                question: "The person you need isn't available. What should you say?",
                options: [
                    { letter: "A", text: "That's ridiculous! I need the code now!", correct: false },
                    { letter: "B", text: "Could you take a message? Please ask him to call me back.", correct: true },
                    { letter: "C", text: "Whatever, I'll just break the door down.", correct: false },
                    { letter: "D", text: "Is he engaged? Why is everyone busy?", correct: false }
                ],
                correctFeedback: "Professional message! They're checking for you...",
                incorrectFeedback: "Leave a polite message!",
                hint: "Ask them to take a message or request a callback."
            },
            {
                id: "4-5",
                type: "phone",
                phoneDisplay: "😊 GAME MASTER",
                phoneAction: "Actually, I found the code!",
                question: "He says: 'Your code is 4-7-2-9-1-5-8-3-6. Did you get that?' You reply:",
                options: [
                    { letter: "A", text: "Yes, thank you! I'll hang up now. Goodbye!", correct: true },
                    { letter: "B", text: "Yeah, got it. *click*", correct: false },
                    { letter: "C", text: "Finally! That took forever!", correct: false },
                    { letter: "D", text: "OK bye", correct: false }
                ],
                correctFeedback: "Perfect phone etiquette! The code is yours!",
                incorrectFeedback: "End the call politely!",
                hint: "Confirm receipt, thank them, and say a proper goodbye."
            },
            {
                id: "4-6",
                type: "phone",
                phoneDisplay: "❓ HOLD PLEASE",
                phoneAction: "Can you hold for a moment?",
                question: "The operator asks you to hold. What's the polite response?",
                options: [
                    { letter: "A", text: "No! I'm in a hurry!", correct: false },
                    { letter: "B", text: "Of course, I'll wait.", correct: true },
                    { letter: "C", text: "*hangs up immediately*", correct: false },
                    { letter: "D", text: "How long? This is annoying!", correct: false }
                ],
                correctFeedback: "Patience is key! They appreciate it!",
                incorrectFeedback: "Being put on hold requires patience and politeness.",
                hint: "Agree politely when asked to wait."
            },
            {
                id: "4-7",
                type: "keypad",
                phoneDisplay: "🔢 ENTER CODE",
                phoneAction: "Enter the code: 4-7-2-9-1-5-8-3-6",
                question: "What is the FIRST digit of the escape code?",
                options: [
                    { letter: "A", text: "7", correct: false },
                    { letter: "B", text: "4", correct: true },
                    { letter: "C", text: "2", correct: false },
                    { letter: "D", text: "9", correct: false }
                ],
                correctFeedback: "First digit correct! Keep going!",
                incorrectFeedback: "Listen carefully! The code starts with 4!",
                hint: "The code is 4-7-2-9-1-5-8-3-6. What's the first number?"
            }
        ],

        // ============================================
        // UNIT 5: BONUS CHALLENGES
        // ============================================
        5: [
            {
                id: "5-1",
                type: "bonus",
                category: "Mixed Review",
                icon: "🎯",
                question: "Which sentence uses the correct form of 'would rather'?",
                options: [
                    { letter: "A", text: "I would rather to stay home.", correct: false },
                    { letter: "B", text: "I would rather stay home than go out.", correct: true },
                    { letter: "C", text: "I would rather staying home.", correct: false },
                    { letter: "D", text: "I would rather home stay.", correct: false }
                ],
                correctFeedback: "Perfect! 'Would rather + verb' is correct!",
                incorrectFeedback: "'Would rather' is followed by the base form of the verb!",
                hint: "Would rather + base verb (no 'to', no '-ing')"
            },
            {
                id: "5-2",
                type: "bonus",
                category: "Vocabulary",
                icon: "📚",
                question: "What does 'to simmer' mean in cooking?",
                options: [
                    { letter: "A", text: "To freeze something quickly", correct: false },
                    { letter: "B", text: "To cook gently just below boiling point", correct: true },
                    { letter: "C", text: "To cut into very thin slices", correct: false },
                    { letter: "D", text: "To mix ingredients vigorously", correct: false }
                ],
                correctFeedback: "Correct! Simmering is gentle cooking!",
                incorrectFeedback: "Simmer means to cook at low heat with small bubbles.",
                hint: "It's between boiling and no heat at all..."
            },
            {
                id: "5-3",
                type: "bonus",
                category: "Phone Skills",
                icon: "📱",
                question: "What should you say when you've dialed the wrong number?",
                options: [
                    { letter: "A", text: "*just hang up*", correct: false },
                    { letter: "B", text: "Wrong number! *click*", correct: false },
                    { letter: "C", text: "I'm sorry, I must have dialed the wrong number. Goodbye.", correct: true },
                    { letter: "D", text: "This isn't the right person!", correct: false }
                ],
                correctFeedback: "Very polite! Even wrong numbers deserve courtesy!",
                incorrectFeedback: "Apologize politely and say goodbye properly.",
                hint: "Start with 'I'm sorry' and explain the mistake."
            },
            {
                id: "5-4",
                type: "bonus",
                category: "Friendship",
                icon: "🤝",
                question: "Your friend suggests going to a movie you don't want to see. What's the most polite way to respond?",
                options: [
                    { letter: "A", text: "That movie looks terrible. No way!", correct: false },
                    { letter: "B", text: "I'm not really interested in that one. Could we maybe see something else?", correct: true },
                    { letter: "C", text: "Fine, whatever you want.", correct: false },
                    { letter: "D", text: "You always pick bad movies.", correct: false }
                ],
                correctFeedback: "Excellent! Honest but kind!",
                incorrectFeedback: "Express your preference politely and offer an alternative.",
                hint: "Be honest about your feelings but offer to compromise."
            },
            {
                id: "5-5",
                type: "bonus",
                category: "Sequencing",
                icon: "📝",
                question: "Put this cooking process in order: A) Finally, serve hot B) First, boil water C) Then, add pasta D) Next, drain the water",
                options: [
                    { letter: "A", text: "B → C → D → A", correct: true },
                    { letter: "B", text: "A → B → C → D", correct: false },
                    { letter: "C", text: "C → B → A → D", correct: false },
                    { letter: "D", text: "D → A → B → C", correct: false }
                ],
                correctFeedback: "Perfect sequence! You're a cooking master!",
                incorrectFeedback: "Think about the logical order of cooking pasta.",
                hint: "Start with 'First', end with 'Finally'"
            },
            {
                id: "5-6",
                type: "bonus",
                category: "Expressions",
                icon: "💬",
                question: "What does the phrase 'I'm not keen on...' express?",
                options: [
                    { letter: "A", text: "Strong enthusiasm", correct: false },
                    { letter: "B", text: "Mild dislike or lack of interest", correct: true },
                    { letter: "C", text: "Complete confusion", correct: false },
                    { letter: "D", text: "Urgent need", correct: false }
                ],
                correctFeedback: "Right! 'Not keen on' is a polite way to express dislike!",
                incorrectFeedback: "'Keen on' means to like something, so 'not keen on' means...",
                hint: "'Keen' means enthusiastic or interested."
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
            description: "Followed recipe perfectly",
            icon: "🍳",
            condition: (stats) => stats.unit3Correct >= 5
        },
        {
            id: "phone_pro",
            name: "Phone Professional",
            description: "Used excellent etiquette",
            icon: "📞",
            condition: (stats) => stats.unit4Correct >= 5
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
            description: "Answered all questions correctly on first try",
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
            id: "never_give_up",
            name: "Never Give Up",
            description: "Completed the game despite mistakes",
            icon: "💪",
            condition: (stats) => stats.totalIncorrect >= 5 && stats.completed
        }
    ]
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAME_DATA;
}
