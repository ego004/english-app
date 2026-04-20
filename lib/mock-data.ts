// ===== AVATARS =====
export const avatars = [
  { id: "bear", label: "Bear", emoji: "🐻" },
  { id: "cat", label: "Cat", emoji: "🐱" },
  { id: "dog", label: "Dog", emoji: "🐶" },
  { id: "fox", label: "Fox", emoji: "🦊" },
  { id: "lion", label: "Lion", emoji: "🦁" },
  { id: "owl", label: "Owl", emoji: "🦉" },
  { id: "panda", label: "Panda", emoji: "🐼" },
  { id: "rabbit", label: "Rabbit", emoji: "🐰" },
]

// ===== STUDENT =====
export const mockStudent = {
  name: "Alex",
  avatar: "fox",
  xp: 2450,
  level: 12,
  streak: 7,
  totalLessons: 48,
  completedLessons: 32,
  badges: ["first-lesson", "streak-7", "quiz-master", "vocabulary-star", "speed-reader"],
  joinDate: "2025-09-15",
}

// ===== SUBJECTS =====
export const subjects = [
  { id: "vocabulary", label: "Vocabulary", icon: "BookOpen", color: "sky", completion: 72, totalLessons: 20 },
  { id: "grammar", label: "Grammar", icon: "PenTool", color: "sunshine", completion: 45, totalLessons: 18 },
  { id: "reading", label: "Reading", icon: "BookText", color: "mint", completion: 60, totalLessons: 15 },
  { id: "writing", label: "Writing", icon: "Pencil", color: "lavender", completion: 30, totalLessons: 12 },
  { id: "listening", label: "Listening", icon: "Headphones", color: "coral", completion: 55, totalLessons: 16 },
  { id: "speaking", label: "Speaking", icon: "Mic", color: "sky", completion: 25, totalLessons: 14 },
]

// ===== LESSONS =====
export type Lesson = {
  id: string
  title: string
  subject: string
  level: "Beginner" | "Intermediate" | "Advanced"
  description: string
  duration: string
  completed: boolean
  locked: boolean
  xpReward: number
  content?: {
    explanation: string
    examples: string[]
    imageAlt?: string
  }
}

export const lessons: Lesson[] = [
  {
    id: "vocab-1", title: "Colors & Shapes", subject: "vocabulary", level: "Beginner",
    description: "Learn the names of colors and shapes around you!", duration: "10 min",
    completed: true, locked: false, xpReward: 50,
    content: {
      explanation: "Colors are everywhere! Let's learn the basic colors: Red, Blue, Green, Yellow, Orange, Purple, Pink, Brown, Black, and White. Shapes are all around us too! Look at a ball - it's a circle. A book is a rectangle. A slice of pizza is a triangle!",
      examples: ["The sky is blue.", "An apple is red.", "The sun is yellow.", "A triangle has three sides."],
      imageAlt: "Colorful shapes illustration"
    }
  },
  {
    id: "vocab-2", title: "Animals & Pets", subject: "vocabulary", level: "Beginner",
    description: "Discover animal names and their sounds!", duration: "12 min",
    completed: true, locked: false, xpReward: 50,
    content: {
      explanation: "Animals are wonderful creatures! Some live in our homes as pets, like dogs, cats, and fish. Some live on farms, like cows, horses, and chickens. Others live in the wild, like lions, elephants, and bears.",
      examples: ["The dog says 'woof'.", "Cats like to purr.", "Birds can fly high.", "Fish swim in the water."],
    }
  },
  {
    id: "vocab-3", title: "Food & Drinks", subject: "vocabulary", level: "Beginner",
    description: "Learn about your favorite foods and drinks!", duration: "10 min",
    completed: false, locked: false, xpReward: 50,
    content: {
      explanation: "Food gives us energy! Fruits like apples, bananas, and oranges are sweet and healthy. Vegetables like carrots, broccoli, and peas help us grow strong.",
      examples: ["I like pizza for dinner.", "She drinks milk every morning.", "We eat fruit for snack.", "He loves chocolate cake."],
    }
  },
  {
    id: "vocab-4", title: "My Family", subject: "vocabulary", level: "Intermediate",
    description: "Words about family members and relationships.", duration: "15 min",
    completed: false, locked: false, xpReward: 75,
    content: {
      explanation: "Family is very important! Your mother and father are your parents. Brothers and sisters are your siblings. Your parents' parents are your grandparents.",
      examples: ["My mother is kind.", "I have two brothers.", "Grandma tells great stories.", "We are a happy family."],
    }
  },
  {
    id: "vocab-5", title: "Weather Words", subject: "vocabulary", level: "Intermediate",
    description: "Sunny, rainy, or snowy? Learn weather vocabulary!", duration: "12 min",
    completed: false, locked: true, xpReward: 75,
  },
  {
    id: "grammar-1", title: "Nouns & Pronouns", subject: "grammar", level: "Beginner",
    description: "Learn about naming words and pronouns.", duration: "15 min",
    completed: true, locked: false, xpReward: 60,
    content: {
      explanation: "Nouns are naming words. They name people (teacher, doctor), places (school, park), things (book, ball), and animals (dog, cat). Pronouns replace nouns: I, you, he, she, it, we, they.",
      examples: ["The teacher is kind. She helps us learn.", "The dog is big. It likes to play.", "Mom and Dad are home. They are cooking."],
    }
  },
  {
    id: "grammar-2", title: "Action Words (Verbs)", subject: "grammar", level: "Beginner",
    description: "Run, jump, sing! Learn about verbs.", duration: "12 min",
    completed: false, locked: false, xpReward: 60,
    content: {
      explanation: "Verbs are action words. They tell us what someone or something does. Running, jumping, singing, reading, writing - these are all verbs!",
      examples: ["I run fast.", "She sings beautifully.", "They play in the park.", "The bird flies high."],
    }
  },
  {
    id: "grammar-3", title: "Simple Sentences", subject: "grammar", level: "Intermediate",
    description: "Build your first complete sentences!", duration: "15 min",
    completed: false, locked: false, xpReward: 75,
  },
  {
    id: "reading-1", title: "Short Stories", subject: "reading", level: "Beginner",
    description: "Read fun short stories with pictures!", duration: "10 min",
    completed: true, locked: false, xpReward: 50,
    content: {
      explanation: "Reading stories is a wonderful adventure! Every story has characters (the people or animals in the story), a setting (where it happens), and a plot (what happens). Let's read a short story about a brave little mouse!",
      examples: ["Once upon a time, there was a little mouse.", "The mouse lived in a tiny hole in the wall.", "One day, the mouse found a piece of cheese.", "The mouse was very happy!"],
    }
  },
  {
    id: "reading-2", title: "Picture Comprehension", subject: "reading", level: "Beginner",
    description: "Look at pictures and answer questions!", duration: "12 min",
    completed: false, locked: false, xpReward: 50,
  },
  {
    id: "writing-1", title: "Writing Letters", subject: "writing", level: "Beginner",
    description: "Practice writing uppercase and lowercase letters.", duration: "15 min",
    completed: true, locked: false, xpReward: 50,
  },
  {
    id: "writing-2", title: "Simple Words", subject: "writing", level: "Beginner",
    description: "Spell and write simple words correctly.", duration: "12 min",
    completed: false, locked: false, xpReward: 50,
  },
  {
    id: "listening-1", title: "Animal Sounds", subject: "listening", level: "Beginner",
    description: "Listen and identify animal sounds!", duration: "8 min",
    completed: true, locked: false, xpReward: 40,
  },
  {
    id: "listening-2", title: "Story Time", subject: "listening", level: "Beginner",
    description: "Listen to a story and answer questions.", duration: "12 min",
    completed: false, locked: false, xpReward: 50,
  },
  {
    id: "speaking-1", title: "Say Hello!", subject: "speaking", level: "Beginner",
    description: "Practice basic greetings and introductions.", duration: "10 min",
    completed: true, locked: false, xpReward: 50,
  },
  {
    id: "speaking-2", title: "Tongue Twisters", subject: "speaking", level: "Intermediate",
    description: "Fun tongue twisters to improve pronunciation!", duration: "10 min",
    completed: false, locked: false, xpReward: 60,
  },
]

// ===== WORKSHEETS =====
export type Worksheet = {
  id: string
  title: string
  subject: string
  level: string
  type: "fill-blanks" | "match" | "drag-drop" | "puzzle"
  questions: WorksheetQuestion[]
  completed: boolean
}

export type WorksheetQuestion = {
  id: string
  question: string
  options?: string[]
  answer: string
  pairs?: { left: string; right: string }[]
}

export const worksheets: Worksheet[] = [
  {
    id: "ws-1", title: "Color Fill-in", subject: "vocabulary", level: "Beginner",
    type: "fill-blanks", completed: false,
    questions: [
      { id: "q1", question: "The sky is ___.", options: ["blue", "red", "green"], answer: "blue" },
      { id: "q2", question: "Grass is ___.", options: ["yellow", "green", "purple"], answer: "green" },
      { id: "q3", question: "The sun is ___.", options: ["blue", "green", "yellow"], answer: "yellow" },
      { id: "q4", question: "A firetruck is ___.", options: ["red", "blue", "green"], answer: "red" },
    ]
  },
  {
    id: "ws-2", title: "Animal Match", subject: "vocabulary", level: "Beginner",
    type: "match", completed: false,
    questions: [
      { id: "q1", question: "Match the animal to its sound", answer: "", pairs: [
        { left: "Dog", right: "Woof" }, { left: "Cat", right: "Meow" },
        { left: "Cow", right: "Moo" }, { left: "Duck", right: "Quack" },
      ] },
    ]
  },
  {
    id: "ws-3", title: "Word Scramble", subject: "vocabulary", level: "Intermediate",
    type: "puzzle", completed: false,
    questions: [
      { id: "q1", question: "Unscramble: P-P-A-L-E", answer: "APPLE" },
      { id: "q2", question: "Unscramble: O-O-K-B", answer: "BOOK" },
      { id: "q3", question: "Unscramble: T-A-C", answer: "CAT" },
      { id: "q4", question: "Unscramble: O-G-D", answer: "DOG" },
    ]
  },
  {
    id: "ws-4", title: "Verb or Noun?", subject: "grammar", level: "Beginner",
    type: "drag-drop", completed: true,
    questions: [
      { id: "q1", question: "Sort: run, book, jump, cat, sing, tree", options: ["Verb", "Noun"], answer: "run-Verb,book-Noun,jump-Verb,cat-Noun,sing-Verb,tree-Noun" },
    ]
  },
  {
    id: "ws-5", title: "Sentence Builder", subject: "grammar", level: "Intermediate",
    type: "drag-drop", completed: false,
    questions: [
      { id: "q1", question: "Arrange: plays / The / park / in / dog / the", answer: "The dog plays in the park" },
      { id: "q2", question: "Arrange: likes / She / ice cream / to eat", answer: "She likes to eat ice cream" },
    ]
  },
  {
    id: "ws-6", title: "Food Vocabulary", subject: "vocabulary", level: "Beginner",
    type: "fill-blanks", completed: false,
    questions: [
      { id: "q1", question: "I eat ___ for breakfast.", options: ["bread", "book", "shoe"], answer: "bread" },
      { id: "q2", question: "Milk comes from a ___.", options: ["dog", "cow", "bird"], answer: "cow" },
      { id: "q3", question: "An ___ is round and sweet.", options: ["apple", "car", "pen"], answer: "apple" },
      { id: "q4", question: "We drink ___ when thirsty.", options: ["water", "sand", "rock"], answer: "water" },
    ]
  },
  {
    id: "ws-7", title: "Numbers 1-20", subject: "vocabulary", level: "Beginner",
    type: "puzzle", completed: false,
    questions: [
      { id: "q1", question: "Spell: 5", answer: "FIVE" },
      { id: "q2", question: "Spell: 10", answer: "TEN" },
      { id: "q3", question: "Spell: 15", answer: "FIFTEEN" },
      { id: "q4", question: "Spell: 20", answer: "TWENTY" },
    ]
  },
  {
    id: "ws-8", title: "Family Words", subject: "vocabulary", level: "Beginner",
    type: "match", completed: false,
    questions: [
      { id: "q1", question: "Match family members", answer: "", pairs: [
        { left: "Mother", right: "Female parent" }, { left: "Father", right: "Male parent" },
        { left: "Sister", right: "Female sibling" }, { left: "Brother", right: "Male sibling" },
      ] },
    ]
  },
  {
    id: "ws-9", title: "Plurals Practice", subject: "grammar", level: "Intermediate",
    type: "fill-blanks", completed: false,
    questions: [
      { id: "q1", question: "One cat, two ___.", options: ["cats", "cat", "cates"], answer: "cats" },
      { id: "q2", question: "One box, two ___.", options: ["boxes", "boxs", "box"], answer: "boxes" },
      { id: "q3", question: "One child, two ___.", options: ["childs", "children", "child"], answer: "children" },
      { id: "q4", question: "One foot, two ___.", options: ["foots", "feet", "foot"], answer: "feet" },
    ]
  },
  {
    id: "ws-10", title: "Adjective Matching", subject: "grammar", level: "Intermediate",
    type: "match", completed: false,
    questions: [
      { id: "q1", question: "Match opposites", answer: "", pairs: [
        { left: "Big", right: "Small" }, { left: "Hot", right: "Cold" },
        { left: "Happy", right: "Sad" }, { left: "Fast", right: "Slow" },
      ] },
    ]
  },
  {
    id: "ws-11", title: "Past Tense Verbs", subject: "grammar", level: "Intermediate",
    type: "fill-blanks", completed: false,
    questions: [
      { id: "q1", question: "Yesterday I ___ (play) in the park.", options: ["played", "play", "plays"], answer: "played" },
      { id: "q2", question: "She ___ (eat) her lunch.", options: ["eats", "eaten", "ate"], answer: "ate" },
      { id: "q3", question: "They ___ (go) to the beach.", options: ["goes", "went", "go"], answer: "went" },
      { id: "q4", question: "We ___ (see) a movie.", options: ["saw", "see", "seen"], answer: "saw" },
    ]
  },
  {
    id: "ws-12", title: "Body Parts", subject: "vocabulary", level: "Beginner",
    type: "match", completed: false,
    questions: [
      { id: "q1", question: "Match body parts to function", answer: "", pairs: [
        { left: "Eyes", right: "See" }, { left: "Ears", right: "Hear" },
        { left: "Mouth", right: "Eat" }, { left: "Hands", right: "Touch" },
      ] },
    ]
  },
  {
    id: "ws-13", title: "Conditional Sentences Practice", subject: "grammar", level: "Intermediate",
    type: "fill-blanks", completed: false,
    questions: [
      { id: "q1", question: "If I had known, I ___ told you.", options: ["would have", "have", "would", "had"], answer: "would have" },
      { id: "q2", question: "Unless you ___, you will fail.", options: ["studied", "study", "studying", "studies"], answer: "study" },
      { id: "q3", question: "If she ___ harder, she would pass.", options: ["studied", "studies", "study", "studying"], answer: "studied" },
      { id: "q4", question: "Provided that you arrive on time, we ___ begin.", options: ["can", "could", "will", "would"], answer: "will" },
    ]
  },
  {
    id: "ws-14", title: "Passive Voice Conversion", subject: "grammar", level: "Advanced",
    type: "fill-blanks", completed: false,
    questions: [
      { id: "q1", question: "Active: 'The scientist discovered the vaccine.' Passive: 'The vaccine ___ discovered by the scientist.'", options: ["was", "were", "is", "are"], answer: "was" },
      { id: "q2", question: "Active: 'They have completed the project.' Passive: 'The project ___ completed by them.'", options: ["has been", "have been", "was", "were"], answer: "has been" },
      { id: "q3", question: "Active: 'The team is reviewing the data.' Passive: 'The data ___ reviewed by the team.'", options: ["is being", "is", "are being", "was"], answer: "is being" },
      { id: "q4", question: "Convert to passive: 'The government will implement new policies.' Complete: 'New policies ___'", options: ["will be implemented", "will implement", "implemented", "will be implement"], answer: "will be implemented" },
    ]
  },
  {
    id: "ws-15", title: "Academic Vocabulary", subject: "vocabulary", level: "Advanced",
    type: "match", completed: false,
    questions: [
      { id: "q1", question: "Match words to their definitions", answer: "", pairs: [
        { left: "Hypothesis", right: "A proposed explanation" }, { left: "Methodology", right: "System of methods" },
        { left: "Empirical", right: "Based on experience or observation" }, { left: "Cognitive", right: "Related to thinking" },
      ] },
    ]
  },
  {
    id: "ws-16", title: "Phrasal Verbs Mastery", subject: "vocabulary", level: "Intermediate",
    type: "fill-blanks", completed: false,
    questions: [
      { id: "q1", question: "I need to ___ up with my studies.", options: ["catch", "get", "look", "put"], answer: "catch" },
      { id: "q2", question: "She decided to ___ down her job.", options: ["give", "put", "turn", "bring"], answer: "give" },
      { id: "q3", question: "We should ___ out this opportunity.", options: ["look", "carry", "check", "make"], answer: "check" },
      { id: "q4", question: "They ___ off the meeting until next week.", options: ["put", "give", "carry", "take"], answer: "put" },
    ]
  },
  {
    id: "ws-17", title: "Essay Structure & Coherence", subject: "writing", level: "Advanced",
    type: "puzzle", completed: false,
    questions: [
      { id: "q1", question: "Arrange: thesis / statement / your / Clear / opening / every / should / have / essay", answer: "Every essay should have a clear opening thesis statement" },
      { id: "q2", question: "What order? Introduction, ___, ___, ___", answer: "Body paragraphs, Conclusion, Bibliography" },
      { id: "q3", question: "A paragraph should contain ___ main idea.", options: ["one", "two", "three"], answer: "one" },
    ]
  },
  {
    id: "ws-18", title: "Professional Email Writing", subject: "writing", level: "Intermediate",
    type: "fill-blanks", completed: false,
    questions: [
      { id: "q1", question: "Complete: 'Dear Sir/Madam, I am writing to ___'", options: ["inquire", "tell you", "say", "ask"], answer: "inquire" },
      { id: "q2", question: "'I would appreciate it if you could ___ this matter urgently.'", options: ["address", "talk", "say", "discuss"], answer: "address" },
      { id: "q3", question: "'Thank you for your ___. I will follow up shortly.'", options: ["reply", "email", "response", "all"], answer: "all" },
      { id: "q4", question: "'Best regards' is a professional ___.", options: ["closing", "opening", "salutation", "signature"], answer: "closing" },
    ]
  },
  {
    id: "ws-19", title: "Complex Sentence Combination", subject: "grammar", level: "Advanced",
    type: "puzzle", completed: false,
    questions: [
      { id: "q1", question: "Combine with 'although': The weather was bad. We enjoyed the hike.", answer: "Although the weather was bad, we enjoyed the hike" },
      { id: "q2", question: "Combine with 'whereas': She loves reading. He prefers sports.", answer: "She loves reading, whereas he prefers sports" },
      { id: "q3", question: "Combine with 'because': He succeeded. He worked hard.", answer: "He succeeded because he worked hard" },
    ]
  },
  {
    id: "ws-20", title: "Literary Devices Identification", subject: "reading", level: "Advanced",
    type: "match", completed: false,
    questions: [
      { id: "q1", question: "Match phrases to literary devices", answer: "", pairs: [
        { left: "The night was a blanket", right: "Metaphor" }, { left: "As quiet as a mouse", right: "Simile" },
        { left: "The cruel wind whispered", right: "Personification" }, { left: "I literally died laughing", right: "Exaggeration" },
      ] },
    ]
  },
]

// ===== QUIZZES =====
export type QuizQuestion = {
  id: string
  type: "multiple-choice" | "sentence-correction" | "word-arrange" | "listening"
  question: string
  options?: string[]
  answer: string
  explanation?: string
}

export type Quiz = {
  id: string
  title: string
  subject: string
  level: string
  timeLimit: number // seconds
  questions: QuizQuestion[]
  bestScore?: number
}

export const quizzes: Quiz[] = [
  {
    id: "quiz-1", title: "Colors Quiz", subject: "vocabulary", level: "Beginner", timeLimit: 120,
    bestScore: 80,
    questions: [
      { id: "q1", type: "multiple-choice", question: "What color is the sky?", options: ["Red", "Blue", "Green", "Yellow"], answer: "Blue", explanation: "The sky appears blue during the day!" },
      { id: "q2", type: "multiple-choice", question: "What color is grass?", options: ["Red", "Blue", "Green", "Yellow"], answer: "Green", explanation: "Grass is green because of chlorophyll!" },
      { id: "q3", type: "multiple-choice", question: "What color is a banana?", options: ["Red", "Blue", "Green", "Yellow"], answer: "Yellow" },
      { id: "q4", type: "multiple-choice", question: "What color do you get mixing red and blue?", options: ["Green", "Purple", "Orange", "Brown"], answer: "Purple" },
      { id: "q5", type: "multiple-choice", question: "What color is snow?", options: ["White", "Blue", "Gray", "Yellow"], answer: "White" },
    ]
  },
  {
    id: "quiz-2", title: "Animal Quiz", subject: "vocabulary", level: "Beginner", timeLimit: 180,
    questions: [
      { id: "q1", type: "multiple-choice", question: "Which animal says 'Woof'?", options: ["Cat", "Dog", "Cow", "Bird"], answer: "Dog" },
      { id: "q2", type: "multiple-choice", question: "Which animal has stripes?", options: ["Lion", "Bear", "Zebra", "Elephant"], answer: "Zebra" },
      { id: "q3", type: "multiple-choice", question: "Which animal can fly?", options: ["Fish", "Dog", "Cat", "Eagle"], answer: "Eagle" },
      { id: "q4", type: "sentence-correction", question: "Fix: The cats is sleeping.", answer: "The cat is sleeping." },
      { id: "q5", type: "word-arrange", question: "Arrange: the / fish / swims / in / pond / the", answer: "The fish swims in the pond" },
    ]
  },
  {
    id: "quiz-3", title: "Grammar Challenge", subject: "grammar", level: "Intermediate", timeLimit: 240,
    bestScore: 60,
    questions: [
      { id: "q1", type: "multiple-choice", question: "Which is a noun?", options: ["Run", "Happy", "Table", "Quickly"], answer: "Table" },
      { id: "q2", type: "multiple-choice", question: "Which is a verb?", options: ["Book", "Dance", "Pretty", "Chair"], answer: "Dance" },
      { id: "q3", type: "sentence-correction", question: "Fix: She go to school every day.", answer: "She goes to school every day." },
      { id: "q4", type: "sentence-correction", question: "Fix: They is playing outside.", answer: "They are playing outside." },
      { id: "q5", type: "word-arrange", question: "Arrange: reading / I / enjoy / books", answer: "I enjoy reading books" },
    ]
  },
  {
    id: "quiz-4", title: "Reading Comprehension", subject: "reading", level: "Beginner", timeLimit: 300,
    questions: [
      { id: "q1", type: "multiple-choice", question: "Tom has a red ball. What color is Tom's ball?", options: ["Blue", "Red", "Green", "Yellow"], answer: "Red" },
      { id: "q2", type: "multiple-choice", question: "Sara likes to read books. What does Sara like to do?", options: ["Run", "Cook", "Read", "Sleep"], answer: "Read" },
      { id: "q3", type: "multiple-choice", question: "The cat sat on the mat. Where did the cat sit?", options: ["On the chair", "On the mat", "On the bed", "On the floor"], answer: "On the mat" },
    ]
  },
  {
    id: "quiz-5", title: "Numbers & Counting", subject: "vocabulary", level: "Beginner", timeLimit: 150,
    questions: [
      { id: "q1", type: "multiple-choice", question: "What comes after 5?", options: ["3", "6", "4", "7"], answer: "6" },
      { id: "q2", type: "multiple-choice", question: "How many fingers on one hand?", options: ["4", "5", "6", "10"], answer: "5" },
      { id: "q3", type: "multiple-choice", question: "What is 10 + 5?", options: ["14", "15", "16", "20"], answer: "15" },
      { id: "q4", type: "word-arrange", question: "Arrange: twenty / is / two / one / One", answer: "One and one is two" },
      { id: "q5", type: "sentence-correction", question: "Fix: I has ten apples.", answer: "I have ten apples." },
    ]
  },
  {
    id: "quiz-6", title: "Days & Months", subject: "vocabulary", level: "Beginner", timeLimit: 180,
    questions: [
      { id: "q1", type: "multiple-choice", question: "How many days are in a week?", options: ["5", "6", "7", "8"], answer: "7" },
      { id: "q2", type: "multiple-choice", question: "What day comes after Monday?", options: ["Sunday", "Tuesday", "Wednesday", "Friday"], answer: "Tuesday" },
      { id: "q3", type: "multiple-choice", question: "Which month is Christmas?", options: ["November", "December", "January", "February"], answer: "December" },
      { id: "q4", type: "multiple-choice", question: "What is today?", options: ["Never changes", "A day of the week", "A specific date", "All of the above"], answer: "All of the above" },
    ]
  },
  {
    id: "quiz-7", title: "Food & Drinks", subject: "vocabulary", level: "Beginner", timeLimit: 120,
    questions: [
      { id: "q1", type: "multiple-choice", question: "Which is a fruit?", options: ["Carrot", "Apple", "Potato", "Broccoli"], answer: "Apple" },
      { id: "q2", type: "multiple-choice", question: "What do we eat with?", options: ["Shoes", "Spoon", "Book", "Pillow"], answer: "Spoon" },
      { id: "q3", type: "multiple-choice", question: "Which is a vegetable?", options: ["Banana", "Orange", "Carrot", "Grape"], answer: "Carrot" },
      { id: "q4", type: "sentence-correction", question: "Fix: She like chicken.", answer: "She likes chicken." },
    ]
  },
  {
    id: "quiz-8", title: "Weather Words", subject: "vocabulary", level: "Intermediate", timeLimit: 180,
    questions: [
      { id: "q1", type: "multiple-choice", question: "What do we need in the rain?", options: ["Hat", "Umbrella", "Shorts", "Sandals"], answer: "Umbrella" },
      { id: "q2", type: "multiple-choice", question: "When does snow fall?", options: ["Summer", "Spring", "Winter", "Fall"], answer: "Winter" },
      { id: "q3", type: "multiple-choice", question: "What is the opposite of hot?", options: ["Warm", "Cool", "Cold", "Freezing"], answer: "Cold" },
      { id: "q4", type: "word-arrange", question: "Arrange: weather / sunny / The / is", answer: "The weather is sunny" },
    ]
  },
  {
    id: "quiz-9", title: "School Subjects", subject: "vocabulary", level: "Beginner", timeLimit: 150,
    questions: [
      { id: "q1", type: "multiple-choice", question: "Which subject teaches about numbers?", options: ["Math", "English", "Science", "Art"], answer: "Math" },
      { id: "q2", type: "multiple-choice", question: "What do we read in English class?", options: ["Numbers", "Books", "Paintings", "Maps"], answer: "Books" },
      { id: "q3", type: "multiple-choice", question: "Which subject teaches about living things?", options: ["Math", "Science", "History", "Art"], answer: "Science" },
      { id: "q4", type: "sentence-correction", question: "Fix: I studies English.", answer: "I study English." },
    ]
  },
  {
    id: "quiz-10", title: "Pronouns Practice", subject: "grammar", level: "Intermediate", timeLimit: 200,
    questions: [
      { id: "q1", type: "multiple-choice", question: "I, you, he, she are ___.", options: ["Nouns", "Verbs", "Pronouns", "Adjectives"], answer: "Pronouns" },
      { id: "q2", type: "sentence-correction", question: "Fix: Him like to play.", answer: "He likes to play." },
      { id: "q3", type: "sentence-correction", question: "Fix: She don't like math.", answer: "She doesn't like math." },
      { id: "q4", type: "word-arrange", question: "Arrange: likes / We / to / play / games", answer: "We like to play games" },
      { id: "q5", type: "multiple-choice", question: "What is the correct pronoun? ___ am happy.", options: ["He", "She", "I", "They"], answer: "I" },
    ]
  },
  {
    id: "quiz-11", title: "Present Tense Verbs", subject: "grammar", level: "Intermediate", timeLimit: 220,
    questions: [
      { id: "q1", type: "multiple-choice", question: "She ___ to school.", options: ["goes", "go", "going", "gone"], answer: "goes" },
      { id: "q2", type: "multiple-choice", question: "They ___ in the park.", options: ["plays", "play", "playing", "played"], answer: "play" },
      { id: "q3", type: "sentence-correction", question: "Fix: He don't like apples.", answer: "He doesn't like apples." },
      { id: "q4", type: "word-arrange", question: "Arrange: drinks / water / He / every / day", answer: "He drinks water every day" },
      { id: "q5", type: "multiple-choice", question: "I ___ English.", options: ["learns", "learn", "learning", "learnt"], answer: "learn" },
    ]
  },
  {
    id: "quiz-12", title: "Story Comprehension", subject: "reading", level: "Intermediate", timeLimit: 300,
    questions: [
      { id: "q1", type: "multiple-choice", question: "Story: 'Tom went to the zoo. He saw lions, tigers, and bears. His favorite animal was the elephant.' What was Tom's favorite animal?", options: ["Lion", "Tiger", "Bear", "Elephant"], answer: "Elephant" },
      { id: "q2", type: "multiple-choice", question: "Where did Tom go?", options: ["Park", "Zoo", "Beach", "School"], answer: "Zoo" },
      { id: "q3", type: "multiple-choice", question: "What animals did Tom see?", options: ["Cats and dogs", "Lions, tigers, and bears", "Birds and fish", "Horses and cows"], answer: "Lions, tigers, and bears" },
    ]
  },
  {
    id: "quiz-13", title: "Adjectives Quiz", subject: "grammar", level: "Intermediate", timeLimit: 180,
    questions: [
      { id: "q1", type: "multiple-choice", question: "Which word is an adjective? The ___ dog runs.", options: ["dog", "runs", "happy", "the"], answer: "happy" },
      { id: "q2", type: "multiple-choice", question: "What is the opposite of big?", options: ["Huge", "Small", "Large", "Tiny"], answer: "Small" },
      { id: "q3", type: "sentence-correction", question: "Fix: He is a quick runner.", answer: "He is a quick runner." },
      { id: "q4", type: "word-arrange", question: "Arrange: cat / black / The / is", answer: "The cat is black" },
    ]
  },
  {
    id: "quiz-14", title: "Clothes & Fashion", subject: "vocabulary", level: "Beginner", timeLimit: 150,
    questions: [
      { id: "q1", type: "multiple-choice", question: "What do we wear on our feet?", options: ["Hat", "Shirt", "Shoes", "Pants"], answer: "Shoes" },
      { id: "q2", type: "multiple-choice", question: "What do we wear on cold days?", options: ["T-shirt", "Jacket", "Shorts", "Sandals"], answer: "Jacket" },
      { id: "q3", type: "multiple-choice", question: "What covers our legs?", options: ["Shirt", "Hat", "Pants", "Shoes"], answer: "Pants" },
      { id: "q4", type: "word-arrange", question: "Arrange: blue / wearing / She / a / is / dress", answer: "She is wearing a blue dress" },
    ]
  },
  {
    id: "quiz-15", title: "Hobbies & Activities", subject: "vocabulary", level: "Beginner", timeLimit: 170,
    questions: [
      { id: "q1", type: "multiple-choice", question: "Which hobby uses a ball?", options: ["Reading", "Playing", "Drawing", "Singing"], answer: "Playing" },
      { id: "q2", type: "multiple-choice", question: "What do you do with a book?", options: ["Draw", "Eat", "Read", "Sing"], answer: "Read" },
      { id: "q3", type: "multiple-choice", question: "Which activity needs a bike?", options: ["Swimming", "Cycling", "Running", "Jumping"], answer: "Cycling" },
      { id: "q4", type: "sentence-correction", question: "Fix: I likes to play football.", answer: "I like to play football." },
    ]
  },
  {
    id: "quiz-16", title: "Conditional Sentences", subject: "grammar", level: "Intermediate", timeLimit: 250,
    questions: [
      { id: "q1", type: "multiple-choice", question: "Complete: If I were rich, I ___ travel the world.", options: ["will", "would", "can", "could"], answer: "would" },
      { id: "q2", type: "sentence-correction", question: "Fix: If you study harder, you will passes the exam.", answer: "If you study harder, you will pass the exam." },
      { id: "q3", type: "multiple-choice", question: "What is the third conditional used for?", options: ["Present situations", "Future situations", "Past impossibilities", "Habits"], answer: "Past impossibilities" },
      { id: "q4", type: "word-arrange", question: "Arrange: would / she / passed / If / have / exam / the / she", answer: "If she had passed the exam, she would have been happy" },
      { id: "q5", type: "sentence-correction", question: "Fix: Unless you don't leave now, you will be late.", answer: "Unless you leave now, you will be late." },
    ]
  },
  {
    id: "quiz-17", title: "Passive Voice Mastery", subject: "grammar", level: "Advanced", timeLimit: 300,
    questions: [
      { id: "q1", type: "multiple-choice", question: "Convert to passive: 'The chef prepared the meal.' Correct form?", options: ["The meal was prepared by the chef", "The meal has been prepared by the chef", "The preparation was done", "The chef was prepared"], answer: "The meal was prepared by the chef" },
      { id: "q2", type: "sentence-correction", question: "Fix: The report has been completed by the team yesterday.", answer: "The report was completed by the team yesterday." },
      { id: "q3", type: "multiple-choice", question: "Which sentence is passive voice?", options: ["He wrote the book", "The book was written by him", "He is writing", "He will write"], answer: "The book was written by him" },
      { id: "q4", type: "word-arrange", question: "Arrange: has / been / research / The / conducted / recently", answer: "The research has been conducted recently" },
      { id: "q5", type: "sentence-correction", question: "Fix: The software was developing by experienced programmers.", answer: "The software was developed by experienced programmers." },
    ]
  },
  {
    id: "quiz-18", title: "Business & Professional English", subject: "vocabulary", level: "Intermediate", timeLimit: 280,
    questions: [
      { id: "q1", type: "multiple-choice", question: "What does 'deadline' mean in business?", options: ["The end of a project", "The final date to complete work", "A line drawn at the end", "The ending of employment"], answer: "The final date to complete work" },
      { id: "q2", type: "multiple-choice", question: "Complete the email phrase: 'I look forward to ___ from you.'", options: ["heard", "hearing", "hear", "to hear"], answer: "hearing" },
      { id: "q3", type: "sentence-correction", question: "Fix: The meeting will be held on Monday next week at 2 PM.", answer: "The meeting will be held on Monday next week at 2 PM." },
      { id: "q4", type: "word-arrange", question: "Arrange: the / Please / feedback / your / provide", answer: "Please provide your feedback" },
      { id: "q5", type: "multiple-choice", question: "In business writing, 'CC' means?", options: ["Customer Care", "Carbon Copy", "Cost Control", "Creative Content"], answer: "Carbon Copy" },
    ]
  },
  {
    id: "quiz-19", title: "Academic Writing & Essays", subject: "writing", level: "Advanced", timeLimit: 320,
    questions: [
      { id: "q1", type: "multiple-choice", question: "What should an academic essay introduction contain?", options: ["Your opinion only", "A thesis statement", "Only background info", "Just the conclusion"], answer: "A thesis statement" },
      { id: "q2", type: "sentence-correction", question: "Fix: The research show that climate change is significantly.", answer: "The research shows that climate change is significant." },
      { id: "q3", type: "multiple-choice", question: "Which transition word is best? 'However, ___ evidence suggests otherwise.'", options: ["the other", "other", "another", "more recent"], answer: "more recent" },
      { id: "q4", type: "word-arrange", question: "Arrange: findings / The / suggest / that / limitations / had / study / the", answer: "The findings suggest that the study had limitations" },
      { id: "q5", type: "sentence-correction", question: "Fix: In conclusion, we can say that the data demonstrates the hypothesis.", answer: "In conclusion, the data demonstrates the hypothesis." },
    ]
  },
  {
    id: "quiz-20", title: "Literary Analysis", subject: "reading", level: "Advanced", timeLimit: 350,
    questions: [
      { id: "q1", type: "multiple-choice", question: "What is 'metaphor'?", options: ["A comparison using 'like' or 'as'", "A direct comparison without 'like' or 'as'", "Repetition of sounds", "Exaggeration for effect"], answer: "A direct comparison without 'like' or 'as'" },
      { id: "q2", type: "multiple-choice", question: "In literature, what does 'irony' mean?", options: ["Being funny", "When reality contradicts expectations", "Being sad", "Telling jokes"], answer: "When reality contradicts expectations" },
      { id: "q3", type: "multiple-choice", question: "What is the 'protagonist'?", options: ["The villain", "The main character", "A minor role", "The narrator"], answer: "The main character" },
      { id: "q4", type: "sentence-correction", question: "Fix: The symbolism of the dove represents peace throughout the novella.", answer: "The symbolism of the dove represents peace throughout the novella." },
      { id: "q5", type: "word-arrange", question: "Arrange: literary / The / devices / author / various / employed / has", answer: "The author has employed various literary devices" },
    ]
  },
  {
    id: "quiz-21", title: "Technology & Modern Vocabulary", subject: "vocabulary", level: "Intermediate", timeLimit: 200,
    questions: [
      { id: "q1", type: "multiple-choice", question: "What does 'API' stand for?", options: ["Application Program Interface", "Advanced Programming Item", "Automated Process Instruction", "Application Procedure Indicator"], answer: "Application Program Interface" },
      { id: "q2", type: "multiple-choice", question: "Complete: 'I need to ___ my password regularly for security.'", options: ["change", "update", "modify", "all of the above"], answer: "all of the above" },
      { id: "q3", type: "sentence-correction", question: "Fix: The software updates has been installing for two hours.", answer: "The software updates have been installing for two hours." },
      { id: "q4", type: "word-arrange", question: "Arrange: connection / a / stable / requires / Video / conference / internet", answer: "Video conference requires a stable internet connection" },
      { id: "q5", type: "multiple-choice", question: "What is 'cybersecurity'?", options: ["Computer games", "Protection against digital attacks", "Internet history", "Web design"], answer: "Protection against digital attacks" },
    ]
  },
  {
    id: "quiz-22", title: "Social Issues & Debate", subject: "vocabulary", level: "Advanced", timeLimit: 300,
    questions: [
      { id: "q1", type: "multiple-choice", question: "What does 'sustainability' mean in environmental context?", options: ["Making things last", "Meeting present needs without harming future generations", "Using resources slowly", "Not wasting time"], answer: "Meeting present needs without harming future generations" },
      { id: "q2", type: "sentence-correction", question: "Fix: The government has to address the issue about poverty.", answer: "The government has to address the issue of poverty." },
      { id: "q3", type: "multiple-choice", question: "Complete: 'Education is fundamental to ___ development.'", options: ["social", "sustainable", "human", "all of the above"], answer: "all of the above" },
      { id: "q4", type: "word-arrange", question: "Arrange: inequality / economic / has / on / significant / impact / society", answer: "Economic inequality has significant impact on society" },
      { id: "q5", type: "multiple-choice", question: "What is a 'demographic'?", options: ["A country's government", "A statistical characteristic of a population", "A type of graph", "A marketing strategy"], answer: "A statistical characteristic of a population" },
    ]
  },
  {
    id: "quiz-23", title: "Nuanced Grammar (Advanced)", subject: "grammar", level: "Advanced", timeLimit: 280,
    questions: [
      { id: "q1", type: "multiple-choice", question: "Use the correct form: 'I wish I ___ known about the meeting.'", options: ["had", "have", "would have", "should have"], answer: "had" },
      { id: "q2", type: "sentence-correction", question: "Fix: Despite of the challenges, the team succeeded.", answer: "Despite the challenges, the team succeeded." },
      { id: "q3", type: "multiple-choice", question: "Which is correct? 'Neither the manager nor the employees ___'", options: ["was", "were", "have", "is"], answer: "were" },
      { id: "q4", type: "word-arrange", question: "Arrange: must / important / that / be / It / thorough / the / analysis", answer: "It must be that the analysis is thorough" },
      { id: "q5", type: "sentence-correction", question: "Fix: The data suggests that students, which studied more, performed better.", answer: "The data suggests that students who studied more performed better." },
    ]
  },
  {
    id: "quiz-24", title: "TOEFL Style Comprehensive", subject: "reading", level: "Advanced", timeLimit: 400,
    questions: [
      { id: "q1", type: "multiple-choice", question: "Passage: 'Photosynthesis is the process by which plants convert light energy into chemical energy.' What is the main purpose of photosynthesis according to this?", options: ["To create light", "To convert light to chemical energy", "To feed animals", "To create oxygen"], answer: "To convert light to chemical energy" },
      { id: "q2", type: "multiple-choice", question: "What can be inferred about plants from the passage?", options: ["They need sunlight", "They are complex", "They are simple", "They don't need water"], answer: "They need sunlight" },
      { id: "q3", type: "multiple-choice", question: "The word 'convert' in the passage likely means?", options: ["Change", "Create", "Remove", "Add"], answer: "Change" },
    ]
  },
  {
    id: "quiz-25", title: "Idiomatic Expressions & Phrasal Verbs", subject: "vocabulary", level: "Intermediate", timeLimit: 220,
    questions: [
      { id: "q1", type: "multiple-choice", question: "What does 'break the ice' mean?", options: ["Literally break ice", "Start a conversation", "End a relationship", "Take a break"], answer: "Start a conversation" },
      { id: "q2", type: "multiple-choice", question: "Complete: 'I need to ___ up on my studies before the exam.'", options: ["catch", "pick", "look", "move"], answer: "catch" },
      { id: "q3", type: "sentence-correction", question: "Fix: She puts off her responsibilities always.", answer: "She is always putting off her responsibilities." },
      { id: "q4", type: "word-arrange", question: "Arrange: put / important / to / clients / We / first / our", answer: "We put important clients first" },
      { id: "q5", type: "multiple-choice", question: "What does 'give up' mean?", options: ["Surrender or stop trying", "Give something away", "Give a presentation", "Stop at a location"], answer: "Surrender or stop trying" },
    ]
  },
]

// ===== VIDEOS =====
export type Video = {
  id: string
  title: string
  subject: string
  duration: string
  thumbnail: string
  videoUrl: string
  watched: boolean
  notes?: string
  description: string
}

export const videos: Video[] = [
  { id: "v1", title: "The Alphabet Song", subject: "vocabulary", duration: "3:24", thumbnail: "/placeholder-video.jpg", videoUrl: "https://www.youtube.com/embed/75p-N9YKqNo", watched: true, description: "Sing along and learn the ABCs with this fun animated song!" },
  { id: "v2", title: "Colors of the Rainbow", subject: "vocabulary", duration: "4:15", thumbnail: "/placeholder-video.jpg", videoUrl: "https://www.youtube.com/embed/75p-N9YKqNo", watched: true, description: "Explore all the beautiful colors and learn their names." },
  { id: "v3", title: "Action Words Fun", subject: "grammar", duration: "5:30", thumbnail: "/placeholder-video.jpg", videoUrl: "https://www.youtube.com/embed/75p-N9YKqNo", watched: false, description: "Jump, run, dance! Learn action words with this energetic video." },
  { id: "v4", title: "Story: The Brave Mouse", subject: "reading", duration: "6:10", thumbnail: "/placeholder-video.jpg", videoUrl: "https://www.youtube.com/embed/75p-N9YKqNo", watched: false, description: "Follow the adventures of a tiny mouse on a big journey." },
  { id: "v5", title: "Phonics: Letter Sounds", subject: "listening", duration: "4:45", thumbnail: "/placeholder-video.jpg", videoUrl: "https://www.youtube.com/embed/75p-N9YKqNo", watched: false, description: "Learn how each letter sounds with fun examples." },
  { id: "v6", title: "Conversation Practice", subject: "speaking", duration: "5:00", thumbnail: "/placeholder-video.jpg", videoUrl: "https://www.youtube.com/embed/75p-N9YKqNo", watched: false, description: "Practice basic conversations with animated characters." },
  { id: "v7", title: "Writing Your Name", subject: "writing", duration: "3:50", thumbnail: "/placeholder-video.jpg", videoUrl: "https://www.youtube.com/embed/75p-N9YKqNo", watched: false, description: "Learn to write your name neatly with step-by-step guidance." },
  { id: "v8", title: "Numbers 1-20", subject: "vocabulary", duration: "4:30", thumbnail: "/placeholder-video.jpg", videoUrl: "https://www.youtube.com/embed/75p-N9YKqNo", watched: false, description: "Count from 1 to 20 with catchy tunes and colorful animations." },
]

// ===== BADGES =====
export type Badge = {
  id: string
  label: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: string
  category: "lesson" | "streak" | "quiz" | "special"
}

export const badges: Badge[] = [
  { id: "first-lesson", label: "First Steps", description: "Complete your first lesson", icon: "Footprints", earned: true, earnedDate: "2025-09-15", category: "lesson" },
  { id: "streak-7", label: "Week Warrior", description: "7-day learning streak", icon: "Flame", earned: true, earnedDate: "2025-09-22", category: "streak" },
  { id: "quiz-master", label: "Quiz Master", description: "Score 100% on any quiz", icon: "Trophy", earned: true, earnedDate: "2025-10-01", category: "quiz" },
  { id: "vocabulary-star", label: "Word Wizard", description: "Complete 10 vocabulary lessons", icon: "Sparkles", earned: true, earnedDate: "2025-10-15", category: "lesson" },
  { id: "speed-reader", label: "Speed Reader", description: "Complete a reading lesson in under 5 minutes", icon: "Zap", earned: true, earnedDate: "2025-11-01", category: "special" },
  { id: "streak-30", label: "Monthly Legend", description: "30-day learning streak", icon: "Crown", earned: false, category: "streak" },
  { id: "all-subjects", label: "Explorer", description: "Try all 6 subjects", icon: "Compass", earned: false, category: "special" },
  { id: "perfect-10", label: "Perfect 10", description: "Get 10 perfect quiz scores", icon: "Star", earned: false, category: "quiz" },
  { id: "grammar-guru", label: "Grammar Guru", description: "Complete all grammar lessons", icon: "GraduationCap", earned: false, category: "lesson" },
  { id: "social-butterfly", label: "Social Butterfly", description: "Complete all speaking lessons", icon: "Heart", earned: false, category: "special" },
]

// ===== LEADERBOARD =====
export const leaderboard = [
  { rank: 1, name: "Emma", avatar: "cat", xp: 3200, level: 15 },
  { rank: 2, name: "Alex", avatar: "fox", xp: 2450, level: 12 },
  { rank: 3, name: "Sam", avatar: "bear", xp: 2100, level: 11 },
  { rank: 4, name: "Lily", avatar: "rabbit", xp: 1850, level: 10 },
  { rank: 5, name: "Max", avatar: "lion", xp: 1600, level: 9 },
  { rank: 6, name: "Zoe", avatar: "panda", xp: 1400, level: 8 },
  { rank: 7, name: "Jake", avatar: "dog", xp: 1200, level: 7 },
  { rank: 8, name: "Mia", avatar: "owl", xp: 1000, level: 6 },
]

// ===== DAILY CHALLENGES =====
export const dailyChallenges = [
  { id: "dc-1", title: "Learn 5 New Words", description: "Expand your vocabulary today!", xpReward: 30, completed: true },
  { id: "dc-2", title: "Complete 1 Quiz", description: "Test your knowledge!", xpReward: 50, completed: false },
  { id: "dc-3", title: "Watch a Video Lesson", description: "Learn something new!", xpReward: 20, completed: false },
]

// ===== SPEAKING PROMPTS =====
export const speakingPrompts = [
  { id: "sp-1", text: "Hello! My name is...", difficulty: "Easy", category: "Greetings" },
  { id: "sp-2", text: "The quick brown fox jumps over the lazy dog.", difficulty: "Medium", category: "Tongue Twister" },
  { id: "sp-3", text: "She sells seashells by the seashore.", difficulty: "Hard", category: "Tongue Twister" },
  { id: "sp-4", text: "I like to eat apples and bananas.", difficulty: "Easy", category: "Food" },
  { id: "sp-5", text: "Peter Piper picked a peck of pickled peppers.", difficulty: "Hard", category: "Tongue Twister" },
  { id: "sp-6", text: "Today the weather is sunny and warm.", difficulty: "Medium", category: "Weather" },
]

// ===== PARENT WEEKLY DATA =====
export const weeklyProgress = [
  { day: "Mon", minutes: 25, lessonsCompleted: 2, xpEarned: 120 },
  { day: "Tue", minutes: 30, lessonsCompleted: 3, xpEarned: 180 },
  { day: "Wed", minutes: 15, lessonsCompleted: 1, xpEarned: 60 },
  { day: "Thu", minutes: 35, lessonsCompleted: 3, xpEarned: 200 },
  { day: "Fri", minutes: 20, lessonsCompleted: 2, xpEarned: 100 },
  { day: "Sat", minutes: 45, lessonsCompleted: 4, xpEarned: 250 },
  { day: "Sun", minutes: 30, lessonsCompleted: 2, xpEarned: 140 },
]

export const skillBreakdown = [
  { skill: "Vocabulary", score: 85, color: "var(--sky)" },
  { skill: "Grammar", score: 62, color: "var(--sunshine)" },
  { skill: "Reading", score: 78, color: "var(--mint)" },
  { skill: "Writing", score: 45, color: "var(--lavender)" },
  { skill: "Listening", score: 70, color: "var(--coral)" },
  { skill: "Speaking", score: 38, color: "var(--sky)" },
]
