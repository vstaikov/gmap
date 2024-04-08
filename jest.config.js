module.exports = {
  preset: "react-native",
  testEnvironment: "node",
  setupFiles: ["./jest.setup.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setupFilesAfterEnv.ts"],
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@csp|@react-native|react-native|react-native-config|kdbush)/)",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "(/__tests__/.*(\\.|/)(helper))\\.[jt]sx?$",
  ],
};
