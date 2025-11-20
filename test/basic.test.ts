// 基本测试
import { describe, expect, test } from 'vitest';
import { generateIdFromText, isMarkdownFile } from '../src/utils';

describe('基本功能测试', () => {
  test('应该识别 markdown 文件', () => {
    expect(isMarkdownFile('test.md')).toBe(true);
    expect(isMarkdownFile('test.markdown')).toBe(true);
    expect(isMarkdownFile('test.txt')).toBe(false);
  });

  test('应该生成正确的标题 ID', () => {
    expect(generateIdFromText('Hello World')).toBe('hello-world');
    expect(generateIdFromText('测试标题')).toBe('测试标题');
  });

  test('应该处理空字符串', () => {
    expect(generateIdFromText('')).toBe('');
  });
});
