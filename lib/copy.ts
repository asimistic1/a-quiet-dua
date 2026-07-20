export type ChapterCopy = {
  urdu: string[];
  english: string;
  micro?: string;
};

export const chapters: ChapterCopy[] = [
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
  {
    urdu: ["سالگرہ مبارک، جویریہ", "اللہ آپ کو اپنی امان میں رکھے۔"],
    english:
      "Happy 22nd birthday. May Allah protect you, bless your third year, put barakah in your knowledge, and give your heart ease in every way. This page ends here, asking for nothing. It was built slowly, and only to say: you were remembered today — with respect, with gratitude, and with dua. Back to sabr.",
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
