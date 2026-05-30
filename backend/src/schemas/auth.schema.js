const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const registerSchema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3, maxLength: 50 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 }
  },
  required: ["username", "email", "password"],
  additionalProperties: false
};

const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 1 }
  },
  required: ["email", "password"],
  additionalProperties: false
};

module.exports = {
  validateRegister: ajv.compile(registerSchema),
  validateLogin: ajv.compile(loginSchema)
};
