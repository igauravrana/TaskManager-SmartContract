# Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a TaskManager smart contract that allows users to create, edit, delete, and mark tasks as completed. The contract ensures that only the task owner can modify or delete their tasks.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js --network sepolia
```

## 🚀 Features

✅ **Add a task** with title and description.  
✏️ **Edit a task** (only the owner can modify).  
✅ **Mark a task as completed**.  
🗑 **Delete a task** (only the owner can delete).  
📜 **Fetch all tasks**.  

## 📌 Smart Contract Details

- **Language:** Solidity `0.8.28`  
- **Blockchain:** Ethereum/Polygon (Testnet)  
- **Storage:** `mapping(uint => Task)`  

## 🛠 Deployment Steps

### **1️⃣ Install Dependencies**

Ensure you have **Node.js**, **Hardhat**, and **ethers.js** installed.

```shell
npm install
npm install --save-dev hardhat ethers dotenv
```

### **2️⃣ Compile the Smart Contract**

```shell
npx hardhat compile
```

### **3️⃣ Deploy the Contract (Hardhat)**

1. Set up a `.env` file with your **Alchemy/Infura API key** and **wallet private key**.
2. Deploy with:

   ```shell
   npx hardhat run scripts/deploy.js --network sepolia
   ```

3. Copy the **contract address** from the terminal.

## 📡 Example Transactions (Hardhat Console)

### **1️⃣ Create a Task**

```shell
await contract.createTask("Learn Solidity", "Complete TaskManager Smart Contract");
```

### **2️⃣ Fetch a Task**

```shell
const task = await contract.getTask(0);
console.log(task);
```

### **3️⃣ Mark a Task as Completed**

```shell
await contract.completeTask(0);
```

### **4️⃣ Edit a Task**

```shell
await contract.editTask(0, "Master Solidity", "Learn advanced Solidity concepts");
```

### **5️⃣ Delete a Task**

```shell
await contract.deleteTask(0);
```

## 🔗 Contract Information

- **Contract Address:** `0xYOUR_CONTRACT_ADDRESS`  
- **Testnet Used:** `Sepolia`  
- **ABI File:** Available in `artifacts/contracts/TaskManager.json`  

## 📜 License

This project is licensed under the **MIT License**.
```
