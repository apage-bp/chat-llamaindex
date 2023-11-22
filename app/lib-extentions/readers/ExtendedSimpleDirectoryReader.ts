import {
  SimpleDirectoryReader,
  FILE_EXT_TO_READER,
  SimpleDirectoryReaderLoadDataProps,
} from "llamaindex/src/readers/SimpleDirectoryReader";
import { CompleteFileSystem } from "llamaindex/src/storage/FileSystem";
import { JSONReader } from "./JSONReader";
import { Metadata, Document } from "llamaindex/src/Node";

type ReaderCallback = (
  category: "file" | "directory",
  name: string,
  status: ReaderStatus,
  message?: string,
) => boolean;
enum ReaderStatus {
  STARTED = 0,
  COMPLETE,
  ERROR,
}

export class ExtendedSimpleDirectoryReader extends SimpleDirectoryReader {
  constructor(observer?: ReaderCallback) {
    super(observer);
  }

  async loadData({
    directoryPath,
    fs,
    defaultReader,
    fileExtToReader = { ...FILE_EXT_TO_READER, json: new JSONReader() },
  }: SimpleDirectoryReaderLoadDataProps): Promise<Document<Metadata>[]> {
    // Ensure the return type matches
    return super.loadData({
      directoryPath,
      fs,
      defaultReader,
      fileExtToReader,
    });
  }
}
