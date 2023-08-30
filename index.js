const rules = require("@gorules/zen-engine");
const fs = require("fs/promises");
const testCases = require("./test-cases.json");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  res.json({ status: "OK" });
});

app.get("/fraud-profiles/:id", async (req, res) => {
  // Example filesystem content, it is up to you how you obtain content
  const content = await fs.readFile("./fraud-rules.json");
  const engine = new rules.ZenEngine();

  const decision = engine.createDecision(content);

  const profile = testCases.find((p) => p.userId === req.params.id);
  console.log(profile);

  const evaluation = await decision.evaluate(profile);
  res.json(evaluation.result);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
