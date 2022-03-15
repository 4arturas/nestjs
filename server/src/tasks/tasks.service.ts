import { Injectable } from '@nestjs/common';
import {Task, TaskStatus} from "./task.model";
import {v4 as uuid} from 'uuid';
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;

        let tempTasks = this.getAllTasks();
        if ( status ) {
            tempTasks = tempTasks.filter( (task) => task.status === status );
        }
        if ( search )
        {
            tempTasks = tempTasks.filter( (task) => {
                return task.title.includes(search) || task.description.includes(search);

            })
        }
        return tempTasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find( t => t.id === id );
    }

    deleteTaskById(id: string): void{
        this.tasks = this.tasks.filter( task => task.id !== id );
    }

    createTask( createTaskDto: CreateTaskDto ) {
        const task: Task = {
            id: uuid(),
            status: TaskStatus.OPEN,
            ...createTaskDto
        };
        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const taskToUpdate = this.getTaskById(id);
        taskToUpdate.status = status;
        this.tasks = this.tasks.filter( task => task.id !== id );
        this.tasks.push(taskToUpdate);
        return taskToUpdate;
    }
}
