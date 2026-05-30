const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const scoreSchema = {
  type: "object",
  properties: {
    userId: { type: "string", minLength: 1 },
    game: { enum: ["Memory", "Sudoku", "Tic Tac Toe", "Snake"] },
    score: { type: "integer", minimum: -100 }
  },
  required: ["userId", "game", "score"],
  additionalProperties: false
};

module.exports = {
  validateScore: ajv.compile(scoreSchema)
};
