# TaskManager Smart Contract - Hardhat Project  

This project implements a **Task Management System** using a Solidity smart contract. It allows users to **create, edit, delete, and mark tasks as completed** while ensuring that only the task owner can modify or delete their tasks.  

The contract is developed and deployed using **Hardhat**, an Ethereum development environment that facilitates testing, debugging, and smart contract deployment.  

## Features  

- Create a task with a title and description.  
- Edit a task (only the task owner can modify).  
- Mark a task as completed.  
- Delete a task (only the task owner can delete).  
- Fetch all tasks stored in the blockchain.  

## Technology Stack  

- **Smart Contract Language:** Solidity 0.8.28  
- **Blockchain:** Ethereum/Polygon (Testnet)  
- **Development Framework:** Hardhat  
- **Storage Mechanism:** `mapping(uint => Task)`  
- **Ethereum Provider:** Alchemy / Infura  
- **Wallet:** MetaMask (for deploying and interacting with the contract)  

---

## Deployment Steps  

### 1. Install Dependencies  

Ensure you have **Node.js** installed. Then, install Hardhat and the necessary dependencies:  

```shell
npm install
npm install --save-dev hardhat ethers dotenv
```

### 2. Compile the Smart Contract  

Run the following command to compile the contract and check for any errors:  

```shell
npx hardhat compile
```

### 3. Deploy the Smart Contract  

1. Create a `.env` file in the root directory and add your **Alchemy/Infura API key** and **wallet private key** (ensure this file is listed in `.gitignore` to prevent accidental commits).  
   
2. Deploy the contract to the **Sepolia Testnet**:  

   ```shell
   npx hardhat run scripts/deploy.js --network sepolia
   ```

3. Copy and save the **contract address** displayed in the terminal after deployment.  

---

## Example Transactions (Using Hardhat Console)  

### 1. Create a Task  

```shell
await contract.createTask("Learn Solidity", "Complete TaskManager Smart Contract");
```

### 2. Fetch a Task  

```shell
const task = await contract.getTask(0);
console.log(task);
```

### 3. Mark a Task as Completed  

```shell
await contract.completeTask(0);
```

### 4. Edit a Task  

```shell
await contract.editTask(0, "Master Solidity", "Learn advanced Solidity concepts");
```

### 5. Delete a Task  

```shell
await contract.deleteTask(0);
```

---

## Contract Information  

- **Contract Address:** `0xeF9585013e72570e04B286f1AaC0C69458d90505`  
- **Testnet Used:** `Sepolia`  
- **ABI File:** Available in `artifacts/contracts/TaskManager.json`  

---

## License  

This project is licensed under the **MIT License**.  

---

### Notes  

- The `.env` file must be created manually and should include:  
  ```
  ALCHEMY_API_KEY=your_alchemy_api_key
  PRIVATE_KEY=your_wallet_private_key
  ```
- Make sure **MetaMask** is connected to the Sepolia Testnet before interacting with the deployed contract.  
