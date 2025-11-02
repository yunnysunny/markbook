import { existsSync, mkdirSync } from "fs";
import { MarkdownParser } from "../core/MarkdownParser";
import { TreeNode } from "../types";
import { Tpl } from "../utils/tpl";
import { join, dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export abstract class AbstractGenerator {
    protected outputDir: string;
    protected markdownParser: MarkdownParser;
    protected name: string = '';

    constructor(outputDir: string) {
        this.outputDir = outputDir;
        this.markdownParser = new MarkdownParser();
    }
    protected abstract generateAssets(tree: TreeNode, title: string): Promise<void>;
    protected async render(filename: string, data: any): Promise<string> {
      return await Tpl.renderFileAsync(join(__dirname, 'tpls', this.name, filename), data);
    }

    public async generate(tree: TreeNode, title: string = 'GitBook'): Promise<void> {
        // 确保输出目录存在
        if (!existsSync(this.outputDir)) {
            mkdirSync(this.outputDir, { recursive: true });
        }
        await this.generateAssets(tree, title);
    }
    /**
   * 获取文件名
   */
  protected getFileName(title: string): string {
    return encodeURIComponent(title)
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}