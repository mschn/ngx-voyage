import { IconType } from "../icon";
import { File, getFileExtension } from "./model";

export function getFileIcon(file: File): IconType {
  const ext = getFileExtension(file);
  if (ext) {
    return fileTypes[ext]?.icon ?? "file";
  }
  return "file";
}

export const ImageExtensions = ["png", "jpg", "jpeg", "gif", "svg"];
export const TextExtensions = [
  "css",
  "html",
  "ts",
  "sh",
  "js",
  "xml",
  "yml",
  "yaml",
  "md",
  "txt",
  "json",
];
export const PreviewExtensions = ["pdf", ...ImageExtensions, ...TextExtensions];

export function canPreviewFile(file: File) {
  const ext = getFileExtension(file);
  if (ext) {
    return PreviewExtensions.includes(ext);
  }
  return false;
}

export const fileTypes: Record<
  string,
  { icon: IconType; description: string }
> = {
  css: { icon: "file-code", description: "CSS_DOCUMENT" },
  csv: { icon: "file-lines", description: "CSV_DOCUMENT" },
  doc: { icon: "file-word", description: "WORD_DOCUMENT" },
  docx: { icon: "file-word", description: "WORD_DOCUMENT" },
  gif: { icon: "file-video", description: "GIF_IMAGE" },
  gz: { icon: "file-zipper", description: "ARCHIVE" },
  html: { icon: "file-code", description: "HTML_DOCUMENT" },
  jpeg: { icon: "file-image", description: "JPG_IMAGE" },
  jpg: { icon: "file-image", description: "JPG_IMAGE" },
  js: { icon: "file-code", description: "JS_DOCUMENT" },
  json: { icon: "file-code", description: "JSON_DOCUMENT" },
  log: { icon: "file-lines", description: "LOG_DOCUMENT" },
  md: { icon: "file-code", description: "MARKDOWN_DOCUMENT" },
  mov: { icon: "file-video", description: "QUICKTIME_MOVIE" },
  mp3: { icon: "file-audio", description: "MP3_AUDIO" },
  mp4: { icon: "file-video", description: "MP4_MOVIE" },
  mpg: { icon: "file-video", description: "MPEG_MOVIE" },
  pdf: { icon: "file-pdf", description: "PDF_DOCUMENT" },
  png: { icon: "file-image", description: "PNG_IMAGE" },
  py: { icon: "file-code", description: "PY_DOCUMENT" },
  sh: { icon: "file-code", description: "SHELL_SCRIPT" },
  svg: {
    icon: "file-image",
    description: "SVG_IMAGE",
  },
  tar: { icon: "file-zipper", description: "ARCHIVE" },
  ts: { icon: "file-code", description: "TS_DOCUMENT" },
  txt: { icon: "file-lines", description: "PLAIN_TEXT" },
  xls: { icon: "file-excel", description: "EXCEL_DOCUMENT" },
  xlsx: { icon: "file-excel", description: "EXCEL_DOCUMENT" },
  xml: { icon: "file-code", description: "XML_DOCUMENT" },
  yaml: { icon: "file-code", description: "YAML_DOCUMENT" },
  yml: { icon: "file-code", description: "YAML_DOCUMENT" },
  zip: { icon: "file-zipper", description: "ARCHIVE" },
};
