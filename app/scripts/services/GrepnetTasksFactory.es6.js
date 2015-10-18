export default (storage) => {
    let tasks = storage.load('grepnet-tasks') || [];

    return {
        add: (task) => {
            task.state = 'new';
            tasks.unshift(task);

            storage.save('grepnet-tasks', tasks);
        },

        edit: (index, task) => {
            task.state = 'new';
            tasks[index] = task;

            storage.save('grepnet-tasks', tasks);
        },

        remove: (index) => {
            tasks.splice(index, 1);

            storage.save('grepnet-tasks', tasks);
        },

        getAll: () => {
            return tasks;
        },

        at: (index) => {
            return tasks[index];
        }
    };
};