// NWS Simple Mode — plain-language lesson content.
//
// Lesson shape (one idea per step):
// - bridge:  one info step that connects from the previous section
//            ("You learned X. Now you will use it for Y.")
// - teach:   info steps that explain the idea, then walk through a
//            worked example with Maya (same $50/week job in every
//            section, so examples build on each other)
// - guide:   a question WITH a hint in its text (cued practice)
// - check:   a question with no hint (can you do it alone?)
// - simulate: the tool, or an applied question (use it for real)
// - next:    section id of the following section; the done screen
//            offers it as the next step ("Next up: ...")
//
// Design rules for this file:
// - Short sentences. Everyday words. No jargon: never "evidence", "mastery",
//   "scaffolding", "retrieval", "transfer", "protocol", or "evaluation".
// - Question choices: keep the correct answer within the FIRST TWO choices,
//   because the grown-ups' settings can limit questions to 2 choices.
// - Feedback is always kind first ("Good try.") then the idea, plainly.
// - No idioms, no shame language, no red/green-only correctness cues.
// - Money amounts stay budget-relative: examples use Maya's $50/week so the
//   same lesson works whether a learner has $25 or $200.

export const SIMPLE_SECTIONS = [
  {
    id: 'needs',
    name: 'Needs and Wants',
    tagline: 'What do you really need?',
    next: 'savings',
    steps: [
      { text: 'Meet Maya. She earns $50 each week at her campus job. She is learning to handle money one step at a time. You will practice with her.' },
      { text: 'A need is something you must have to live safe and healthy. Food. A safe place to sleep. Medicine you need.' },
      { text: 'A want is something nice to have. New shoes when your old shoes still work. Candy. A new video game.' },
      { text: 'Watch Maya sort her list. Bus pass to get to work: need. The bus gets her to her job. New headphones: want. Her old ones still work. Ask: what is it for?' },
      {
        text: 'Maya did her list. Now you try. Remember: a need keeps you safe and healthy.',
        question: 'Which one is a need?',
        choices: [
          { label: 'Dinner', correct: true },
          { label: 'Candy' },
          { label: 'A new video game' }
        ],
        correctNote: "That's right. Dinner keeps you fed.",
        tryAgainNote: 'Good try. A need keeps you safe and healthy. Dinner is a need.'
      },
      {
        text: 'No hints this time.',
        question: 'Which one is a want?',
        choices: [
          { label: 'A toy', correct: true },
          { label: 'Medicine' },
          { label: 'A winter coat' }
        ],
        correctNote: 'Right. A toy is fun, but you can live without it.',
        tryAgainNote: 'Good try. Medicine and a warm coat keep you safe. A toy is a want.'
      },
      { text: 'Tricky part: it depends. A phone can be a need for work calls, or a want for games. Ask: what is it for?' },
      {
        text: "Maya's old backpack broke. She needs one for school.",
        question: 'Maya buys a plain backpack for school. Need or want?',
        choices: [
          { label: 'Need', correct: true },
          { label: 'Want' }
        ],
        correctNote: 'Right. She needs it for school. Ask: what is it for?',
        tryAgainNote: 'Good try. She needs it for school, so it is a need.'
      }
    ]
  },
  {
    id: 'savings',
    name: 'Saving for Later',
    tagline: 'Keep some money safe.',
    next: 'pacing',
    steps: [
      { text: 'You learned needs and wants. Maya pays for her needs first. Now she keeps some money safe for later.' },
      { text: 'Saving means keeping money for later. Not spending it today.' },
      { text: 'Watch Maya. She gets $50. First she moves $5 to savings. Then she spends what is left. Saving first means it really happens.' },
      { text: 'Even $1 counts. Small savings grow over time.' },
      {
        text: 'Maya gets $50 and wants to save $5. Remember: saving first means it really happens.',
        question: 'When should she move the $5 to savings?',
        choices: [
          { label: 'Right away, before spending', correct: true },
          { label: 'At the end of the week, if money is left' }
        ],
        correctNote: 'Right. First, before spending.',
        tryAgainNote: 'Good try. If you wait, there is often nothing left. Save first.'
      },
      {
        text: 'No hints this time.',
        question: 'You get $20. What is a good choice?',
        choices: [
          { label: 'Save $2 first, then spend the rest', correct: true },
          { label: 'Spend all $20 today' }
        ],
        correctNote: 'Good choice. Saving first means it really happens.',
        tryAgainNote: 'Good try. If you spend first, there is often nothing left to save.'
      },
      { text: 'Savings can turn into a need later. Like money for a surprise car repair. Maya calls this her safety money.' },
      {
        text: 'Maya saved $5 each week for 4 weeks.',
        question: 'How much did she save in all?',
        choices: [
          { label: '$20', correct: true },
          { label: '$5' },
          { label: '$9' }
        ],
        correctNote: 'Right. $5 x 4 weeks = $20.',
        tryAgainNote: 'Good try. $5 each week for 4 weeks: $5 x 4 = $20.'
      }
    ]
  },
  {
    id: 'pacing',
    name: 'Make Money Last',
    tagline: 'Stretch money across days.',
    next: 'spending',
    steps: [
      { text: 'Maya saves $5 first. She has $45 left for the week. Now she makes it last until more money comes.' },
      { text: 'Money has to last until more comes in. Maya divides her money by the days.' },
      { text: 'Watch: $45 left. 7 days until more money. $45 divided by 7 is about $6 a day. That is her daily number.' },
      {
        text: 'Maya has $45 and 7 days. Her daily number is about $6. Remember: one day of spending should be near $6.',
        question: 'Maya spends $12 on lunch Monday. What happens?',
        choices: [
          { label: 'She has less for the other days', correct: true },
          { label: 'Nothing changes' }
        ],
        correctNote: 'Right. $12 is two days of money in one day.',
        tryAgainNote: 'Good try. $12 is about two days of her $6. The other days get less.'
      },
      { tool: 'pacing' },
      { text: 'If the daily amount feels small, that is the plan working. A little each day beats broke on Friday.' }
    ]
  },
  {
    id: 'spending',
    name: 'Spend Smart',
    tagline: 'Get the most from your money.',
    next: 'paycheck',
    steps: [
      { text: 'Maya knows her daily number: about $6. Now she spends that $6 smart.' },
      { text: 'A sale is only a good deal if you needed the thing anyway.' },
      {
        text: 'Candy is on sale. Maya did not plan to buy candy. Remember: a sale on something you do not need is not saving.',
        question: 'What is smart?',
        choices: [
          { label: 'Skip it', correct: true },
          { label: 'Buy a lot because it is cheap' }
        ],
        correctNote: "Right. A sale on something you don't need is not saving money.",
        tryAgainNote: "Good try. Cheap candy you didn't need still costs money."
      },
      { text: 'Watch Maya compare. Big bag of rice: $8 for 8 cups. Small bag: $5 for 4 cups. She checks what one cup costs. Big bag: $1 a cup. Small bag: $1.25 a cup. The big bag wins.' },
      {
        text: 'No hints this time. Check what one cup costs.',
        question: 'Big bag of rice: $8 for 8 cups. Small bag: $5 for 4 cups. Which costs less per cup?',
        choices: [
          { label: 'The big bag', correct: true },
          { label: 'The small bag' }
        ],
        correctNote: 'Right. $1 a cup beats $1.25 a cup.',
        tryAgainNote: 'Good try. Big bag: $8 divided by 8 = $1 a cup. Small bag: $5 divided by 4 = $1.25 a cup.'
      },
      { text: 'Count the trip too. A cheap deal far away can cost more in gas than you save.' },
      {
        text: 'Maya needs rice. The big bag is $8. Her daily number is $6.',
        question: 'The big bag costs more than one day of money. What can Maya do?',
        choices: [
          { label: 'Save a little each day, then buy the big bag', correct: true },
          { label: 'Buy the small bag every week instead' }
        ],
        correctNote: 'Right. Planning ahead lets her get the better deal.',
        tryAgainNote: 'Good try. The small bag costs more per cup. Saving a little each day gets her the better deal.'
      }
    ]
  },
  {
    id: 'paycheck',
    name: 'Payday',
    tagline: 'What you really get to keep.',
    next: 'subscriptions',
    steps: [
      { text: 'Maya earns money each week. But her paycheck shows a bigger number first. Here is why.' },
      { text: "Your paycheck shows a big number. You don't get to keep all of it. Some is taken out first." },
      { text: 'Watch: Maya worked 20 hours at $12 an hour. That is $240. After money is taken out, she keeps about $200. The $200 is hers to plan with.' },
      { tool: 'paycheck' },
      {
        text: 'No hints this time.',
        question: 'Which number do you plan your spending with?',
        choices: [
          { label: 'Take-home pay', correct: true },
          { label: 'The big number before deductions' }
        ],
        correctNote: 'Right. Plan with what actually reaches you.',
        tryAgainNote: 'Good try. The big number shrinks first. Take-home pay is yours to plan with.'
      }
    ]
  },
  {
    id: 'subscriptions',
    name: 'Monthly Costs',
    tagline: 'Small costs add up.',
    steps: [
      { text: 'Maya plans with her take-home pay. But some costs come back every month, even when she forgets them.' },
      { text: 'Some costs come back every month. Music. Games. Apps. They charge you again and again.' },
      { text: 'Watch Maya count: one $10 app each month. $10 x 12 months = $120 a year. Small costs add up.' },
      { tool: 'subscriptions' },
      {
        text: 'Remember: $10 a month is $120 a year.',
        question: 'A $10-a-month app Maya never uses. What is smart?',
        choices: [
          { label: 'Cancel it', correct: true },
          { label: 'Keep paying' }
        ],
        correctNote: "Right. That's $120 a year back in your pocket.",
        tryAgainNote: 'Good try. $10 x 12 months = $120 a year for something unused.'
      },
      {
        text: 'No hints this time.',
        question: 'Maya pays $8 a month for music and $5 a month for a game. How much is that per year?',
        choices: [
          { label: '$156', correct: true },
          { label: '$13' }
        ],
        correctNote: 'Right. $8 + $5 = $13 a month. $13 x 12 = $156 a year.',
        tryAgainNote: 'Good try. Add first: $8 + $5 = $13 a month. Then $13 x 12 = $156 a year.'
      }
    ]
  },
  {
    id: 'help',
    name: 'Quick Help',
    tagline: 'Fast answers.',
    steps: [
      { text: 'Quick answers from everything you practiced.' },
      {
        cards: [
          { q: 'How much can I spend today?', a: 'Money you have divided by days until more money comes.' },
          { q: 'Need or want?', a: 'Must-have = need. Nice-to-have = want. Ask: what is it for?' },
          { q: 'When do I save?', a: 'First, before spending. Even $1 counts.' },
          { q: 'Is the sale a good deal?', a: 'Only if you needed it anyway.' },
          { q: 'What is take-home pay?', a: 'Pay minus what is taken out. Plan with this number.' },
          { q: 'What does it cost per year?', a: 'Monthly cost x 12.' }
        ]
      }
    ]
  }
];
