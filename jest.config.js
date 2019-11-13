module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^vue$': 'vue/dist/vue.common.js',
    '^main/(.*)$': '<rootDir>/src/$1',
    '^packages/(.*)$': '<rootDir>/src/components/$1',
    '^yak-ui/components/(.*)$': '<rootDir>/src/components/$1',
    '^yak-ui/(.*)$': '<rootDir>/$1'
  }
}
