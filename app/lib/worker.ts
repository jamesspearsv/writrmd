interface Task<T = unknown> {
  promise: () => Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
}

export default class TaskWorker {
  private queue: Task[] = [];
  private working = false;

  /**
   * Add a new operation to the task queue
   * @param promise An function that contains an operation provided to the worker
   * @returns The result of the provided operation
   */
  add<T>(promise: Task<T>['promise']) {
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

  /**
   * Internal function to process items in the task queue
   * @returns Void
   */
  private async processQueue() {
    // check if the worker is active or if the queue is empty
    if (this.working) return;
    const task = this.queue.shift();
    if (!task) return;

    this.working = true;
    // start the worker process
    try {
      // todo: figure out how to return type of resolved promise that is given to queue
      const result = await task.promise();
      task.resolve(result);
    } catch {
      task.reject('Task failed');
    } finally {
      // finish the current task and begin next
      this.working = false;
      this.processQueue();
    }
  }
}
