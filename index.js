const rules = require("@gorules/zen-engine");
const fs = require("fs/promises");
const testCases = require("./test-cases.json");

(async () => {
  // Example filesystem content, it is up to you how you obtain content
  const content = await fs.readFile("./fraud-rules.json");
  const engine = new rules.ZenEngine();

  const decision = engine.createDecision(content);

  testCases.forEach(async (c) => {
    const result = await decision.evaluate(c);
    console.log({
      ...result,
      description: c.description,
    });
  });
})();
