export type ChapterCopy = {
  urdu: string[];
  english: string;
  micro?: string;
  title?: string;
  tagline?: string;
  englishOnly?: boolean;
};

export const chapters: ChapterCopy[] = [
  {
    englishOnly: true,
    urdu: [],
    title: "Happy 22nd Birthday, Javeria",
    tagline:
      "July 20, 2004 — The day this world was graced with you, and my life's greatest Naimat was born into the arms of your Ammi Jan.",
    english:
      "Happy 22nd Birthday, Javeria. May Allah keep you in His deepest protection, place endless Barakah in your third year of nursing, and make the knowledge you seek a source of light. Above all, may He grant your heart absolute ease, peace, and Sakinah in every way.",
    micro: "[ tap — a few quiet words ]",
  },
  {
    urdu: ["خاموشی کی اپنی ایک زبان ہوتی ہے۔"],
    english:
      "Silence has its own language. Tonight I've borrowed a few minutes of it — a handful of quiet words, and then I'll give it back.",
    micro: "[ tap — a few quiet words ]",
  },
  {
    urdu: [
      "مجھ سے غلطی ہوئی۔ آپ نے منع کیا تھا، پھر بھی میں نے آپ کی دوست سے رابطہ کیا۔ میں دل سے شرمندہ ہوں۔",
    ],
    english:
      "I was wrong. You asked me not to reach out — and I still contacted your friend to plan a surprise. That crossed a line you had drawn clearly. I won't explain it away. I'm sorry, Javeria. It will not happen again.",
  },
  {
    urdu: ["نرسری سے ایف ایس سی تک — پندرہ برس، ایک ہی راستہ۔"],
    english:
      "Nursery to FSc. Chalk dust and morning assemblies, winter uniforms and exam-week nerves — fifteen years of the same small world. I remember more of it than I could ever say. And that memory asks for nothing today; it only wanted to be honored.",
  },
  {
    urdu: [
      "اللہ آپ کے ہاتھوں میں شفا اور آپ کے علم میں برکت عطا فرمائے۔",
    ],
    english:
      "Third year at DHQ Sahiwal — long shifts, heavy books, learning to steady other people through their worst days. That takes a strength most people never have to find. The journey is yours alone, and it deserves its own salute. May every patient you care for leave a silent dua in your favor.",
  },
  {
    urdu: [
      "٣ جون کا وعدہ قائم ہے — صحیح وقت پر، صحیح طریقے سے۔",
      "جو حد آپ نے کھینچی، وہی میرا ادب ہے — جو وقت آپ نے مانگا، وہی میری دعا ہے۔",
    ],
    english:
      "The promise of June 3rd stands exactly where you placed it: the proper way, at the right time, through your family's door. Nothing before that, and nothing less than that. Until then your space is yours — this page does not ask you to reply. It only keeps its word.",
  },
];

export const ui = {
  tapPrompt: "[ tap — a few quiet words ]",
  continue: "continue",
  letterModeOpen: "read as one letter · مکمل خط",
  letterModeReturn: "return",
  letterModeTitle: "A Quiet Dua",
  back: "Go back one chapter",
  audioPlay: "Play ambient sound",
  audioMute: "Mute ambient sound",
  progress: "Chapter progress",
  milestones: ["NURSERY", "PRIMARY", "MIDDLE", "MATRIC", "FSC"] as const,
} as const;

export const TOTAL_CHAPTERS = chapters.length;

/** Chapter index helpers after birthday moved to first */
export const CHAPTER = {
  birthday: 0,
  opening: 1,
  apology: 2,
  years: 3,
  healer: 4,
  promise: 5,
} as const;
