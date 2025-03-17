import { Messages, messages as messagesEn } from "./en.messages";
import { messages as messagesFr } from "./fr.messages";

export function getMessages(): Messages {
  if (navigator.language.startsWith("fr")) {
    return messagesFr;
  }
  return messagesEn;
}

export function isToday(date: Date): boolean {
  return isSameDate(new Date(), date);
}

export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDate(date, yesterday);
}

function isSameDate(d1: Date, d2: Date): boolean {
  return (
    d1.getUTCDate() === d2.getUTCDate() &&
    d1.getUTCMonth() === d2.getUTCMonth() &&
    d1.getUTCFullYear() === d2.getUTCFullYear()
  );
}
