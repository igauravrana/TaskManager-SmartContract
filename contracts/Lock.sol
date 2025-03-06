// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract TaskManager {
    struct Task {
        uint id;
        string title;
        string description;
        bool completed;
        address owner;
    }

    mapping(uint => Task) public tasks;
    uint public nextTaskId;

    event TaskCreated(uint taskId, string title, string description, address owner);
    event TaskCompleted(uint taskId);
    event TaskEdited(uint taskId, string newTitle, string newDescription);
    event TaskDeleted(uint taskId);

    modifier onlyOwner(uint _taskId) {
        require(tasks[_taskId].owner == msg.sender, "Not task owner");
        _;
    }

    function createTask(string memory _title, string memory _description) public {
        tasks[nextTaskId] = Task(nextTaskId, _title, _description, false, msg.sender);
        emit TaskCreated(nextTaskId, _title, _description, msg.sender);
        nextTaskId++;
    }

    function getTask(uint _taskId) public view returns (Task memory) {
        return tasks[_taskId];
    }

    function completeTask(uint _taskId) public onlyOwner(_taskId) {
        tasks[_taskId].completed = true;
        emit TaskCompleted(_taskId);
    }

    function editTask(uint _taskId, string memory _newTitle, string memory _newDescription) 
        public onlyOwner(_taskId) 
    {
        tasks[_taskId].title = _newTitle;
        tasks[_taskId].description = _newDescription;
        emit TaskEdited(_taskId, _newTitle, _newDescription);
    }

    function deleteTask(uint _taskId) public onlyOwner(_taskId) {
        delete tasks[_taskId];
        emit TaskDeleted(_taskId);
    }

    function getAllTasks() public view returns (Task[] memory) {
        Task[] memory allTasks = new Task[](nextTaskId);
        for (uint i = 0; i < nextTaskId; i++) {
            allTasks[i] = tasks[i];
        }
        return allTasks;
    }
}
