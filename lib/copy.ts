export type ChapterCopy = {
  urdu: string[];
  english: string;
  micro?: string;
  title?: string;
  tagline?: string;
  urduTagline?: string;
  englishOnly?: boolean;
};

export const chapters: ChapterCopy[] = [
  {
    englishOnly: true,
    urdu: [],
    title: "Happy 22nd Birthday, Javeria Maqbool",
    tagline:
      "July 20, 2004 — The day this world was graced with you, and my life's greatest Naimat was born into the arms of your Ammi Jan.",
    english:
      "Happy 22nd Birthday, Javeria. May Allah keep you secure in His Hifz, bless the noble knowledge you gather in the wards this year, and illuminate your path ahead. My deepest, quietest prayer is that He grants your heart absolute ease, unwavering peace, and profound Sakinah in every matter of your life.",
    micro: "[ tap — a few quiet words ]",
  },
  {
    englishOnly: true,
    urdu: [],
    title: "A Quiet Apology & A Distant Wish",
    english:
      "I am truly sorry for reaching out after you explicitly asked me to stay disconnected. I don't want to ruin your day or overstep again, but I couldn't control the need to wish you a happy birthday. I kept this link very simple and diligent. It is only here to deliver my birthday wishes and my sincerest apologies for the hurdles and mistakes I constantly create for you. I promise to step back into the distance after this.",
    micro: "[ tap — a few quiet words ]",
  },
  {
    englishOnly: true,
    urdu: [],
    title: "The Weight of My Mistake",
    urduTagline:
      "میری غفلت نے آپ کے اصولوں کو ٹھیس پہنچائی، جس کے لیے میں شرمندہ ہوں۔",
    english:
      "I know I have no Halal right to approach you, to speak to you, or even to wish you. Yet, in my eagerness to make your day memorable, I bypassed the boundaries you strictly set and reached out to your friend. My intention was born of care, but my actions lacked the profound respect your principles deserve. Everything went wrong, and Allah knows the depth of my shame and regret.",
    micro: "[ tap — a few quiet words ]",
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
  letterModeOpen: "read as letter",
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
