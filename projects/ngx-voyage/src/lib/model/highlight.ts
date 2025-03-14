import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import javascript from "highlight.js/lib/languages/javascript";
import markdown from "highlight.js/lib/languages/markdown";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";

import { LanguageFn } from "highlight.js";
import { getExtension } from "./model";

export const highlightTypes: Record<
  string,
  { languageName: string; language: LanguageFn }
> = {
  ts: { languageName: "typescript", language: typescript },
  js: { languageName: "javascript", language: javascript },
  html: { languageName: "xml", language: xml },
  md: { languageName: "markdown", language: markdown },
  json: { languageName: "json", language: json },
};

export function getLanguageClass(filename: string) {
  const ext = getExtension(filename);
  if (ext && highlightTypes[ext]) {
    return `language-${highlightTypes[ext].languageName}`;
  }
  return "";
}

export function highlight(filename: string) {
  const ext = getExtension(filename);
  if (ext && highlightTypes[ext]) {
    hljs.registerLanguage(
      highlightTypes[ext].languageName,
      highlightTypes[ext].language,
    );
    hljs.highlightAll();
  }
}
