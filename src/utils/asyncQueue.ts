export default (maxRunning: number) => {
    let queue: Array<() => Promise<void>> = [];
    let dequeue: Array<Promise<void>> = [];
    let running: number = 0;

    return (request: () => Promise<void>) => {
        queue.push(async (): Promise<void> => {
            running++;

            try {
                await request();
            } finally {
                running--;

                if (queue.length > dequeue.length && running < maxRunning) {
                    dequeue.push(queue[dequeue.length]());
                }

                if (queue.length === dequeue.length) {
                    queue = [];
                    dequeue = [];
                }
            }
        });

        if (queue.length <= maxRunning) {
            dequeue.push(queue[dequeue.length]());
        }
    }
}
