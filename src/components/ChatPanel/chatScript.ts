import type { ActiveBuff } from '../../store/gameTypes';

interface KeywordRule {
  keywords: string[];
  buffType: 'positive' | 'negative';
  buffName: string;
  multiplier: number;
  durationMs: number;
  responses: string[];
}

export interface ChatResult {
  response: string;
  buff: ActiveBuff | null;
}

const RULES: KeywordRule[] = [
  {
    keywords: ['wilt', '枯', '死', 'ugly', 'きたない', 'みにくい'],
    buffType: 'negative',
    buffName: '傷ついた…',
    multiplier: 0.4,
    durationMs: 30000,
    responses: [
      'そんな…ひどい。 *ぷるぷる*',
      '…きこえてる。 *しおれる*',
      'なんでそんなこと言うの。',
    ],
  },
  {
    keywords: ['hate', '嫌い', '憎', 'きらい'],
    buffType: 'negative',
    buffName: 'しおれてる…',
    multiplier: 0.5,
    durationMs: 30000,
    responses: [
      '…そうなんだ。 *そっぽを向く*',
      'きらいって言われた…。',
      'しょんぼり。',
    ],
  },
  {
    keywords: ['ignore', '無視', '忘', 'むし'],
    buffType: 'negative',
    buffName: '無視された…',
    multiplier: 0.6,
    durationMs: 30000,
    responses: [
      '…ねえ、聞いてる？',
      'むししないで。 *ゆれる*',
      'さびしい。',
    ],
  },
  {
    keywords: ['love', '好き', '愛', 'すき', 'だいすき', 'ラブ'],
    buffType: 'positive',
    buffName: '愛されてる！',
    multiplier: 2.0,
    durationMs: 30000,
    responses: [
      'え、あの… *みどりになる*',
      'わあ…うれしい！！',
      'ふふ…わたしも。 *そわそわ*',
    ],
  },
  {
    keywords: ['beautiful', 'かわいい', 'きれい', 'すてき', 'lovely', 'pretty', 'cute'],
    buffType: 'positive',
    buffName: '褒めてもらった！',
    multiplier: 1.5,
    durationMs: 30000,
    responses: [
      'え…そんなこと言われたら…',
      'ほんとに！？ *はっぱが輝く*',
      'あのね、うれしすぎてくるくるしちゃう。',
    ],
  },
  {
    keywords: ['sun', 'sunshine', '日光', '光', 'ひかり', 'warm', 'あたたか'],
    buffType: 'positive',
    buffName: '日向ぼっこ！',
    multiplier: 1.8,
    durationMs: 30000,
    responses: [
      'あったかい…すき。 *のびをする*',
      'ひなたぼっこ最高！！',
      'もっとそっちに向いてていい？',
    ],
  },
  {
    keywords: ['water', 'みず', '水', '飲', 'drink', '水やり'],
    buffType: 'positive',
    buffName: 'うるおってる！',
    multiplier: 1.5,
    durationMs: 30000,
    responses: [
      'ごくごく… *うるおう*',
      'みずくれてありがとう！',
      'いい水だ〜！ *ぷるぷる*',
    ],
  },
];

const NO_MATCH_RESPONSES = [
  'ん？ どういう意味？',
  '*じっとみてる*',
  'よく分からないけどうなずく。',
  'ふうん。',
  '*はっぱをゆらす*',
  'そうなんだ〜。',
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function matchChat(input: string): ChatResult {
  const lower = input.toLowerCase();

  for (const rule of RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      const buff: ActiveBuff = {
        type: rule.buffType,
        name: rule.buffName,
        multiplier: rule.multiplier,
        expiresAt: Date.now() + rule.durationMs,
      };
      return { response: pickRandom(rule.responses), buff };
    }
  }

  return { response: pickRandom(NO_MATCH_RESPONSES), buff: null };
}
