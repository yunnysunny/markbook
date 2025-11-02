/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    // Download Chrome (default `skipDownload: false`).
    chrome: {
      downloadBaseUrl: 'https://npmmirror.com/mirrors/chrome-for-testing/',
    },
};