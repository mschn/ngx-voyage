import { fileTypes } from "./file-types";

export interface File {
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
  name: string;
  size: number;
  modifiedDate: Date | string;
  type?: string;
}

export type FileSortFields = "name" | "size" | "modifiedDate" | "type";

export function isFileEqual(f1: File, f2: File) {
  return (
    f1.name === f2.name &&
    f1.isDirectory === f2.isDirectory &&
    f1.isFile === f2.isFile &&
    f1.size === f2.size &&
    f1.type === f2.type
  );
}

export function isFileSortField(
  field?: string | null,
): field is FileSortFields {
  return (
    field === "name" ||
    field === "size" ||
    field === "modifiedDate" ||
    field === "type"
  );
}

export interface FilePreviewOutput {
  path: string;
  cb: (data: Blob) => void;
}

export function getFileExtension(file: File) {
  return getExtension(file.name);
}

export function getExtension(name: string) {
  if (!name.includes(".")) {
    return undefined;
  }
  return name.split(".").pop()?.toLowerCase();
}

export function sortFiles(
  files: File[],
  field?: FileSortFields,
  order?: number,
): File[] {
  if (field == undefined || order == undefined) {
    return files;
  }

  return files.sort((f1, f2) => {
    const value1 = f1[field];
    const value2 = f2[field];
    let result = null;
    if (value1 == null && value2 != null) result = -1;
    else if (value1 != null && value2 == null) result = 1;
    else if (value1 == null && value2 == null) result = 0;
    else if (typeof value1 === "string" && typeof value2 === "string")
      result = value1.localeCompare(value2);
    else result = value1! < value2! ? -1 : value1! > value2! ? 1 : 0;
    return order * result;
  });
}

export function normalizeFile(file: File): File {
  addType(file);
  if (typeof file.modifiedDate === "string") {
    file.modifiedDate = new Date(file.modifiedDate);
  }
  return file;
}

export function addType(file: File) {
  if (file.isDirectory) {
    file.type = "FOLDER";
  } else {
    const ext = getExtension(file.name);
    if (!ext) {
      file.type = "DOCUMENT";
    } else if (!file.type) {
      const desc = fileTypes[ext]?.description;
      if (desc) {
        file.type = desc;
      } else {
        file.type = `${ext.toUpperCase()}`;
      }
    }
  }
}
