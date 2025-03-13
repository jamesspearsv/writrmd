interface Task {
  promise: () => Promise<unknown>;
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}

export default class TaskWorker {
  private queue: Task[] = [];
  private working = false;

  add(promise: () => Promise<unknown>) {
    // return a promise to calling function to pass back data and error info
    return new Promise((resolve, reject) => {
      this.queue.push({
        promise,
        resolve,
        reject,
      });

      // start worker when a new task is added to the queue
      this.processQueue();
    });
  }

  private async processQueue() {
    // check if the worker is active or if the queue is empty
    if (this.working) return;
    const task = this.queue.shift();
    if (!task) return;

    this.working = true;
    console.log('### Starting worker');
    // start the worker process
    try {
      const result = await task.promise();
      task.resolve(result);
    } catch {
      task.reject('Task failed');
    } finally {
      // finish the current task and begin next
      console.log('### Finished working');
      this.working = false;
      this.processQueue();
    }
  }
}
