import { enUS, fr, Locale } from "date-fns/locale";
import { messages as messagesEn, Messages } from "./en.messages";
import { messages as messagesFr } from "./fr.messages";

export function getMessages(): Messages {
  if (navigator.language.startsWith("fr")) {
    return messagesFr;
  }
  return messagesEn;
}

export function getDateFnsLocale(): Locale {
  if (navigator.language.startsWith("fr")) {
    return fr;
  }
  return enUS;
}
