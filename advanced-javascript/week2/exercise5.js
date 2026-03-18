import { teas } from "./teas.js";
import fs from "fs";

function runSequentially(tasks, finalCallback) {
  function runNext(index) {
    if (index === tasks.length) {
      finalCallback();
      return;
    }

    function done() {
      runNext(index + 1);
    }

    tasks[index](done);
  }

  runNext(0);
}

const tasks = [
  (done) =>
    setTimeout(() => {
      console.log("Task 1");
      done();
    }, 300),
  (done) =>
    setTimeout(() => {
      console.log("Task 2");
      done();
    }, 200),
  (done) =>
    setTimeout(() => {
      console.log("Task 3");
      done();
    }, 100),
];

runSequentially(tasks, () => {
  console.log("All tasks complete!");
});
