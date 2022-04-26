const config = {
    verbose: true,
    testEnvironment: "jsdom",
    moduleFileExtensions: [
        "js",
        "json",
        // tell Jest to handle `*.vue` files
        "vue"
    ],
    transform: {
        // process `*.vue` files with `vue-jest`
        ".*\\.(vue)$": "@vue/vue2-jest",
        ".*\\.(js)$": "babel-jest"
    }
  };
  
  module.exports = config;