import ejs from "ejs";

export class Tpl {
  static render(tpl: string, data: any): string {
    return ejs.render(tpl, data);
  }
  static renderFileSync(path: string, data: any): string {
    return ejs.renderFile(path, data);
  }
  static async renderFileAsync(path: string, data: any): Promise<string> {
    return new Promise((resolve, reject) => {
        ejs.renderFile(path, data, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    })
        
  }
}