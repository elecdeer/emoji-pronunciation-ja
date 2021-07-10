
// @ts-ignore
import rawData from "./data/pronunciation.json";


export const data: Readonly<Record<string, string | undefined>> = rawData;

const getRegexPattern = () => {
  const keys = Object.keys(data).join("|");
  return `(${keys})`;
}

export const emojiRegexPattern: Readonly<string> = getRegexPattern();

/**
 * 絵文字にマッチする正規表現オブジェクトを新しく生成し返す
 * @param flags
 */
export const getEmojiRegExp = (flags: string = "gu"): RegExp => {
  return new RegExp(emojiRegexPattern, flags);
}

/**
 * 引数の絵文字1文字の発音を返す
 * 存在しない場合は引数をそのまま返す
 * @param emoji
 */
export const getPronunciation = (emoji: string): string => {
  return data[emoji] ?? emoji;
}

/**
 * 引数の絵文字1文字に発音が存在するかを返す
 * @param str
 */
export const existsPronunciation = (str: string): boolean => {
  return !!data[str];
}



