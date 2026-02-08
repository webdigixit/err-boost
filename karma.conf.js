module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['test/**/*.test.ts'],
    preprocessors: { '**/*.ts': ['typescript'] },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};