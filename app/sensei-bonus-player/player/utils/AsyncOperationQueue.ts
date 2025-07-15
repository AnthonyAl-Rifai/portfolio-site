type AsyncOperation = () => Promise<void>;

class AsyncOperationQueue {
  private queue: AsyncOperation[];

  private isProcessing: boolean;

  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  // Method to add a task to the queue
  enqueue(task: AsyncOperation): void {
    this.queue.push(task);
    this.processQueue();
  }

  // Internal method to process the queue
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }
    this.isProcessing = true;

    const currentTask = this.queue.shift();
    if (currentTask) {
      try {
        await currentTask();
      } catch (error) {
        console.error("Error during async operation:", error);
        // Handle error as needed
      } finally {
        this.isProcessing = false;
        this.processQueue();
      }
    }
  }
}

export default AsyncOperationQueue;
