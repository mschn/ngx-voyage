import { Messages, messages as messagesEn } from "./en.messages";
import { messages as messagesFr } from "./fr.messages";

export function getMessages(): Messages {
  if (navigator.language.startsWith("fr")) {
    return messagesFr;
  }
  return messagesEn;
}
