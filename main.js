class Task {
    constructor(taskId, description, dueDate) {
      this.taskId = taskId;
      this.description = description;
      this.dueDate = dueDate;
    }
  
    toString() {
      return `${this.taskId}. ${this.description} (${this.dueDate.toLocaleDateString()})`;
    }
  }
  
  class Schedule {
    constructor() {
      this.tasks = [];
    }
  
    addTask(description, dueDate) {
      const taskId = this.tasks.length + 1;
      const newTask = new Task(taskId, description, dueDate);
      this.tasks.push(newTask);
    }
  
    viewAllTasks() {
      if (this.tasks.length === 0) {
        console.log("スケジュールにタスクがありません。");
        return;
      }
  
      console.log("タスク一覧:");
      for (const task of this.tasks) {
        console.log(task);
      }
    }
  
    deleteTask(taskId) {
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        if (task.taskId === taskId) {
          this.tasks.splice(i, 1);
          console.log(`タスク ${taskId} を削除しました。`);
          return;
        }
      }
  
      console.log(`タスク ${taskId} は見つかりませんでした。`);
    }
  
    editTask(taskId) {
      for (const task of this.tasks) {
        if (task.taskId === taskId) {
          const newDescription = prompt("新しい説明を入力してください: ");
          let newDueDateStr = prompt("新しい期限を入力してください (YYYY-MM-DD): ");
  
          while (!isValidDate(newDueDateStr)) {
            newDueDateStr = prompt("無効な日付形式です。新しい期限を入力してください (YYYY-MM-DD): ");
          }
  
          const newDueDate = new Date(newDueDateStr);
          task.description = newDescription;
          task.dueDate = newDueDate;
          console.log(`タスク ${taskId} を更新しました。`);
          return;
        }
      }
  
      console.log(`タスク ${taskId} は見つかりませんでした。`);
    }
  }
  
  function isValidDate(dateString) {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return regex.test(dateString);
  }
  
  function main() {
    const schedule = new Schedule();
  
    while (true) {
      console.log("\n==== スケジュールアプリ ====\n");
      console.log("1. タスクを追加");
      console.log("2. すべてのタスクを表示");
      console.log("3. タスクを削除");
      console.log("4. タスクを編集");
      console.log("5. 終了");
  
      const choice = prompt("選択してください: ");
  
      switch (choice) {
        case "1":
          const description = prompt("タスクの説明を入力してください: ");
          let dueDateStr = prompt("期限を入力してください (YYYY-MM-DD): ");
  
          while (!isValidDate(dueDateStr)) {
            dueDateStr = prompt("無効な日付形式です。新しい期限を入力してください (YYYY-MM-DD): ");
          }
  
          const dueDate = new Date(dueDateStr);
          schedule.addTask(description, dueDate);
          break;
        case "2":
          schedule.viewAllTasks();
          break;
        case "3":
          const taskId = parseInt(prompt("削除したいタスクのIDを入力してください: "));
          schedule.deleteTask(taskId);
          break;
        case "4":
          const editTaskId = parseInt(prompt("編集したいタスクのIDを入力してください: "));
          schedule.editTask(editTaskId);
          break;
        case "5":
          break;
        default:
          console.log("無効な選択です。");
      }
    }
  }
  
  main();

  
  