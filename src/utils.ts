import ansi from "../static/codes.ts";

export const toUint8Array = (text: string) => new TextEncoder().encode(text);

export const print = (str: string) => Deno.stdout.write(toUint8Array(str));

// Source - https://stackoverflow.com/a/39914235
// Posted by Dan Dascalescu, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-26, License - CC BY-SA 4.0

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function setCharAt(str: string, index: number, chr: string) {
  if (index > str.length - 1 || index < 0) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

export function findLongest(arr: string[]): number {
  let longest = arr[0].length;
  for (const element of arr) {
    if (longest < element.length) longest = element.length;
  }

  return longest;
}

// Magic number hell
export async function selectionMenu(
  question: string,
  options: string[],
) {
  Deno.stdin.setRaw(true, { cbreak: true });

  const decoder = new TextDecoder();

  const extraPadding = 4 as const;
  const selectWidth = 4 as const;

  const longestElement = findLongest(options);
  const longestString = longestElement > question.length
    ? longestElement
    : question.length;
  const extraWidth = (num: string) => longestString + extraPadding - num.length;

  const menu = [
    ansi.box.cornerUL + ansi.box.hor.repeat(extraWidth("") + selectWidth + 1) +
    ansi.box.cornerUR,

    ansi.box.ver + " " + question +
    " ".repeat(extraWidth(question) + selectWidth) + ansi.box.ver,
    // Subtract one to compensate for the space in the beginning

    ansi.box.ver + " ".repeat(extraWidth("") + selectWidth + 1) + ansi.box.ver,

    ...options.map((option) =>
      ansi.box.intersectR + " [ ] " + option +
      " ".repeat(extraWidth(option)) + ansi.box.ver
    ),

    ansi.box.cornerDL + ansi.box.hor.repeat(extraWidth("") + selectWidth + 1) +
    ansi.box.cornerDR,
  ];

  let index = 0;

  for (let j = 0; j <= 3 + options.length; j++) {
    let str = menu[j];
    if (j === index + 3) str = setCharAt(str, 3, "x");
    print(str + "\n");
  }

  for await (const chunk of Deno.stdin.readable) {
    const text = decoder.decode(chunk);
    if (text === ansi.chars.upArrow && index > 0) {
      index--;
    } else if (text === ansi.chars.downArrow && index < options.length - 1) {
      index++;
    } else if (text === ansi.codes.carriageReturn) {
      break;
    }

    print(ansi.codes.upBegin.repeat(8));

    for (let j = 0; j <= 3 + options.length; j++) {
      let str = menu[j];
      if (j === index + 3) str = setCharAt(str, 3, "x");
      print(str + "\n");
    }
  }

  return index;
}
