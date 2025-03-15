import { File } from "./model";
export function getFileMock(file: Partial<File>): File {
  return {
    isDirectory: false,
    isFile: true,
    isSymbolicLink: false,
    modifiedDate: new Date("2020-01-01"),
    name: "foo.txt",
    size: 1024,
    ...file,
  };
}
