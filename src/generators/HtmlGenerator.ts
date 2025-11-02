// HTML 生成器
import { dirname, join } from 'path';
import { TreeNode, Heading } from '../types/index.js';
import { copyFile, writeFile } from 'fs/promises';
import { AbstractGenerator } from './AbstractGenerator.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class HtmlGenerator extends AbstractGenerator {
  protected async generateAssets(tree: TreeNode, title: string): Promise<void> {
    // 生成主页面
    await this.generateIndexPage(tree, title);
    
    // 生成各个文档页面
    await this.generateDocumentPages(tree);
    
    // 生成样式文件
    await this.generateStyles();
    
    // 生成脚本文件
    await this.generateScripts();
  }
  constructor(outputDir: string) {
    super(outputDir);
    this.name = 'html';
  }

  /**
   * 生成主页面
   */
  private async generateIndexPage(tree: TreeNode, title: string): Promise<void> {
    const html = await this.generateHtmlTemplate(title, tree, tree.children[0]?.content || '');
    const indexPath = join(this.outputDir, 'index.html');
    await writeFile(indexPath, html, 'utf-8');
  }

  /**
   * 生成文档页面
   */
  private async generateDocumentPages(tree: TreeNode): Promise<void> {
    await Promise.all(tree.children.map(async (node) => {
      if (node.content) {
        const html = await this.generateHtmlTemplate(node.title, tree, node.content, node.headings);
        const fileName = this.getFileName(node.title) + '.html';
        const filePath = join(this.outputDir, fileName);
        await writeFile(filePath, html, 'utf-8');
      }
    }));
  }

  /**
   * 生成 HTML 模板
   */
  private async generateHtmlTemplate(title: string, tree: TreeNode, content: string, headings?: Heading[]): Promise<string> {
    const sidebar = await this.generateSidebar(tree);
    const toc = headings ? await this.generateTableOfContents(headings) : '';
    const htmlContent = await this.markdownParser.toHtml(content);
    const html = await this.render('page.ejs', {
      title,
      sidebar,
      toc,
      htmlContent,
    });

    return html;
  }

  /**
   * 生成侧边栏
   */
  private async generateSidebar(tree: TreeNode): Promise<string> {
    return await this.generateSidebarItems(tree.children, 0);
  }

  /**
   * 生成侧边栏项目
   */
  private async generateSidebarItems(nodes: TreeNode[], level: number): Promise<string> {
//     let html = '';
    
//     for (const node of nodes) {
//       const indent = '  '.repeat(level);
//       const fileName = node.path ? this.getFileName(node.title) + '.html' : 'index.html';
      
//       html += `${indent}<div class="sidebar-item level-${level}">
// ${indent}  <a href="${fileName}" class="sidebar-link">${node.title}</a>
// `;
      
//       if (node.children.length > 0) {
//         html += `${indent}  <div class="sidebar-children">
// ${this.generateSidebarItems(node.children, level + 1)}
// ${indent}  </div>
// `;
//       }
      
//       html += `${indent}</div>
// `;
//     }
    const html = await this.render('left-side.ejs', {
        nodes,
        level,
        getFileName: this.getFileName,
    });
    return html;
  }

  /**
   * 生成目录
   */
  private async generateTableOfContents(headings: Heading[]): Promise<string> {
    return this.generateTocItems(headings, 0);
  }

  /**
   * 生成目录项目
   */
  private async generateTocItems(headings: Heading[], level: number): Promise<string> {
//     let html = '<ul class="toc-list">';
    
//     for (const heading of headings) {
//       html += `<li class="toc-item level-${heading.level}">
//         <a href="#${heading.id}" class="toc-link">${heading.text}</a>
// `;
      
//       if (heading.children.length > 0) {
//         html += this.generateTocItems(heading.children, level + 1);
//       }
      
//       html += '</li>';
//     }
    
//     html += '</ul>';
    const html = await this.render('toc.ejs', {
        headings,
        level,
    });
    return html;
  }
  private async copyFile(src: string, dest: string): Promise<void> {
    await copyFile(join(__dirname, 'static', src), join(this.outputDir, dest));
  }

  /**
   * 生成样式文件
   */
  private async generateStyles(): Promise<void> {
    await this.copyFile('styles.css', 'styles.css');
  }

  /**
   * 生成脚本文件
   */
  private async generateScripts(): Promise<void> {
    await this.copyFile('script.js', 'script.js');
  }


}
