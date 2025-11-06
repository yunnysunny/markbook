// 基本测试
import { isMarkdownFile, generateHeadingId } from "../src/utils";

describe('基本功能测试', () => {
  test('应该识别 markdown 文件', () => {
    expect(isMarkdownFile('test.md')).toBe(true);
    expect(isMarkdownFile('test.markdown')).toBe(true);
    expect(isMarkdownFile('test.txt')).toBe(false);
  });

  test('应该生成正确的标题 ID', () => {
    expect(generateHeadingId('Hello World')).toBe('hello%20world');
    expect(generateHeadingId('测试标题')).toBe(encodeURIComponent('测试标题').toLocaleLowerCase());
    expect(generateHeadingId('Special & Characters!')).toBe(encodeURIComponent('special & characters!'));
  });

  test('应该处理空字符串', () => {
    expect(generateHeadingId('')).toBe('');
  });
});
