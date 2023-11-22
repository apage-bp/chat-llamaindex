import { Document } from "llamaindex/src/Node";
import { DEFAULT_FS, GenericFileSystem } from "llamaindex/src/storage";
import { BaseReader } from "llamaindex/src/readers/base";

/**
 * Reads JSON documents, with options to help determine relationships between nodes.
 */
export class JSONReader implements BaseReader {
  private levelsBack: number | null;

  constructor(levelsBack: number | null = null) {
    this.levelsBack = levelsBack;
  }

  private static async *depthFirstYield(
    jsonData: any,
    levelsBack: number,
    path: string[],
  ): AsyncGenerator<string> {
    if (typeof jsonData === "object" && !Array.isArray(jsonData)) {
      for (const [key, value] of Object.entries(jsonData)) {
        const newPath = [...path, key];
        yield* JSONReader.depthFirstYield(value, levelsBack, newPath);
      }
    } else if (Array.isArray(jsonData)) {
      for (const value of jsonData) {
        yield* JSONReader.depthFirstYield(value, levelsBack, path);
      }
    } else {
      const newPath = path.slice(-levelsBack);
      newPath.push(JSON.stringify(jsonData));
      yield newPath.join(" ");
    }
  }

  private async parseJsonContent(jsonContent: any): Promise<Document[]> {
    const documents: Document[] = [];
    if (this.levelsBack === null) {
      const jsonOutput = JSON.stringify(jsonContent, null, 0);
      const lines = jsonOutput.split("\n");
      const usefulLines = lines.filter((line) => !/^[{}\[\],]*$/.test(line));
      documents.push(new Document({ text: usefulLines.join("\n") }));
    } else {
      const lines = JSONReader.depthFirstYield(
        jsonContent,
        this.levelsBack,
        [],
      );
      for await (const line of lines) {
        // Using for await...of for async generator
        documents.push(new Document({ text: line }));
      }
    }
    return documents;
  }

  async loadData(
    file: string,
    fs: GenericFileSystem = DEFAULT_FS,
  ): Promise<Document[]> {
    const content = await fs.readFile(file, { encoding: "utf-8" });
    let data: any;
    if (file.endsWith(".jsonl")) {
      data = content.split("\n").map((line) => JSON.parse(line));
    } else {
      data = JSON.parse(content);
    }
    const documents = this.parseJsonContent(data);
    return documents;
  }
}
