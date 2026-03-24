function runSequentially(tasks, finalCallback) {
  function runNext(i) {
    if (i === tasks.length) {
      finalCallback();
      return;
    }

    function done() {
      runNext(i + 1);
    }

    tasks[i](done);
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
