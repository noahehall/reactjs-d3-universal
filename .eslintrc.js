"use strict";

module.exports = {
  "extends": [
    "eslint-config-ct-fletcher"
  ],
  "rules": {
    'line-comment-position': [
      "error", {
        "position": "above",
        "ignorePattern": "eslintignore"
      },
    ],
    'prefer-reflect': 0,
  }
}
