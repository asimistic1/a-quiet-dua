export type ChapterCopy = {
  urdu: string[];
  english: string;
  micro?: string;
  title?: string;
  tagline?: string;
  urduTagline?: string;
  englishOnly?: boolean;
  isFeedback?: boolean;
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
    englishOnly: true,
    urdu: [],
    urduTagline: "٣ جون ٢٠٢٥ کا وعدہ آج بھی قائم ہے",
    english:
      "I have not forgotten June 3, 2025, nor the pure, Halal path we agreed upon. My promise remains an unbreakable vow. I will only bring the proposal to your family when you are truly ready and grant me your explicit permission. In the silence until that day, I will dedicate myself to matching your caliber, respecting your values, and becoming a man fully capable of honoring your dreams.",
    micro: "[ tap — a few quiet words ]",
  },
  {
    englishOnly: true,
    isFeedback: true,
    urdu: [],
    english:
      "If you want  to share a thought, I am here to listen. If not, I will continue to respect your silence. Your words are safe here.",
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
  sendQuietly: "[ Send quietly ]",
  sending: "[ Sending… ]",
  sent: "[ Sent. Thank you. ]",
  beginAgain: "[ begin again ]",
  writePlaceholder: "Click to write",
  milestones: ["NURSERY", "PRIMARY", "MIDDLE", "MATRIC", "FSC"] as const,
} as const;

export const TOTAL_CHAPTERS = chapters.length;

export const CHAPTER = {
  birthday: 0,
  opening: 1,
  apology: 2,
  promise: 3,
  openDoor: 4,
} as const;

/** Maps experience chapter → GoldenThread visual state (null = hidden) */
export const THREAD_STATE: Record<number, number | null> = {
  0: null,
  1: 0,
  2: 1,
  3: 4,
  4: 4,
};
