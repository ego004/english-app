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
