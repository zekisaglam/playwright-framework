module.exports = {
  default: `
    --require-module ts-node/register
    --require src/**/*.ts
    --publish-quiet
    --format @cucumber/pretty-formatter
    --format html:reports/cucumber-report.html
  `
};