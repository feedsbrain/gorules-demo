const gorules = require("@gorules/zen-engine");
const fs = require("fs/promises");
const testCases = require("./test-cases.json");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", async (_req, res) => {
  const rules = await fs.readFile("./3DS.json");
  const engine = new gorules.ZenEngine();

  const decision = engine.createDecision(rules);

  const results = await Promise.all(
    testCases.map(async (tc) => {
      return {
        ...tc,
        evaluation: await decision.evaluate(tc),
      };
    })
  );

  res.json({ status: "OK", ...results });
});

app.get("/fraud-profiles/:id", async (req, res) => {
  const rules = await fs.readFile("./3DS.json");
  const engine = new gorules.ZenEngine();

  const decision = engine.createDecision(rules);

  const profile = testCases.find((p) => p.userId === req.params.id);
  console.log(profile);

  const evaluation = await decision.evaluate(profile);
  res.json(evaluation.result);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
