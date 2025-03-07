// Connect to Ethereum provider
const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
let contract;

// Your deployed contract address
const contractAddress = "0x337025E7d564deD281a4316D55Ad99f9b1bFeb62";

// ABI (Add deleteTask and updateTask functions)
const abi = [
    {
        "anonymous": false,
        "inputs": [{ "indexed": false, "internalType": "uint256", "name": "taskId", "type": "uint256" }],
        "name": "TaskCompleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "uint256", "name": "taskId", "type": "uint256" },
            { "indexed": false, "internalType": "string", "name": "title", "type": "string" },
            { "indexed": false, "internalType": "string", "name": "description", "type": "string" },
            { "indexed": false, "internalType": "address", "name": "owner", "type": "address" }
        ],
        "name": "TaskCreated",
        "type": "event"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_taskId", "type": "uint256" }],
        "name": "completeTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "string", "name": "_title", "type": "string" },
            { "internalType": "string", "name": "_description", "type": "string" }
        ],
        "name": "createTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllTasks",
        "outputs": [
            {
                "components": [
                    { "internalType": "uint256", "name": "id", "type": "uint256" },
                    { "internalType": "string", "name": "title", "type": "string" },
                    { "internalType": "string", "name": "description", "type": "string" },
                    { "internalType": "bool", "name": "completed", "type": "bool" },
                    { "internalType": "address", "name": "owner", "type": "address" }
                ],
                "internalType": "struct TaskManager.Task[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_taskId", "type": "uint256" }],
        "name": "deleteTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_taskId", "type": "uint256" },
            { "internalType": "string", "name": "_newTitle", "type": "string" },
            { "internalType": "string", "name": "_newDescription", "type": "string" }
        ],
        "name": "updateTask",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Function to connect wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, abi, signer);
            document.getElementById("status").innerText = "Wallet Connected!";
        } catch (error) {
            console.error(error);
            alert("Wallet Connection Failed!");
        }
    } else {
        alert("Please install MetaMask!");
    }
}

// Function to create a task
async function createTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    try {
        const tx = await contract.createTask(title, description);
        await tx.wait();
        alert("Task Created Successfully!");
    } catch (error) {
        console.error(error);
        alert("Failed to create task");
    }
}

// Function to fetch all tasks
async function fetchTasks() {
    try {
        const tasks = await contract.getAllTasks();
        let taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        tasks.forEach(task => {
            let listItem = document.createElement("li");
            listItem.innerHTML = `
                ID: ${task.id} - ${task.title} - ${task.description} - Completed: ${task.completed}
                <button onclick="completeTask(${task.id})">Complete</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="updateTask(${task.id})">Update</button>
            `;
            taskList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
        alert("Failed to fetch tasks");
    }
}

// Function to mark a task as completed
async function completeTask(taskId) {
    try {
        const tx = await contract.completeTask(taskId);
        await tx.wait();
        alert("Task Completed Successfully!");
        fetchTasks();
    } catch (error) {
        console.error(error);
        alert("Failed to complete task");
    }
}

// Function to delete a task
async function deleteTask(taskId) {
    try {
        const tx = await contract.deleteTask(taskId);
        await tx.wait();
        alert("Task Deleted Successfully!");
        fetchTasks();
    } catch (error) {
        console.error(error);
        alert("Failed to delete task");
    }
}

// Function to update a task
async function updateTask(taskId) {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");
    if (!newTitle || !newDescription) {
        alert("Title and Description cannot be empty");
        return;
    }
    try {
        const tx = await contract.updateTask(taskId, newTitle, newDescription);
        await tx.wait();
        alert("Task Updated Successfully!");
        fetchTasks();
    } catch (error) {
        console.error(error);
        alert("Failed to update task");
    }
}

// Event Listeners for buttons
document.getElementById("connectBtn").addEventListener("click", connectWallet);
document.getElementById("createTaskBtn").addEventListener("click", createTask);
document.getElementById("fetchTasksBtn").addEventListener("click", fetchTasks);
