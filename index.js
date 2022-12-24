const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const MINIMUM_BALANCE = 10;
const wallet = "J7A5XwBwh9vBHBqXFvnbvKC7SaQ4ztHua4oL2z8LY5vP";

app.post("/webhooks", async (req, res) => {
  console.log("HELLO");
  const { body } = req;
  if (body?.type == "WITHDRAW") {
    const txn = body.nativeTransfers.find(x => x.fromUserAccount == wallet)
    if (!txn) { return; }
    const { data } = await axios.get(`https://api.helius.xyz/v0/${wallet}/balances?api-key=J7A5XwBwh9vBHBqXFvnbvKC7SaQ4ztHua4oL2z8LY5vP`)
    const { nativeBalance: balanceRemaining } = data
    if (balanceRemaining < MINIMUM_BALANCE) {
      invokeAlertingFunction();
    }
  }
})

app.listen(port, () => {
  console.log(`Example server listening on port ${port}`);
})