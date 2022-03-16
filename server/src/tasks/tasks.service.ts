import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {TasksRepository} from "./tasks.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {TaskStatus} from "./task-status.enum";

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository) {
    }

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto);
    }

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    //
    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //
    //     let tempTasks = this.getAllTasks();
    //     if ( status ) {
    //         tempTasks = tempTasks.filter( (task) => task.status === status );
    //     }
    //     if ( search )
    //     {
    //         tempTasks = tempTasks.filter( (task) => {
    //             return task.title.includes(search) || task.description.includes(search);
    //
    //         })
    //     }
    //     return tempTasks;
    // }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    async deleteTaskById(id: string): Promise<void> {
        const found = this.getTaskById(id);
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0 )
            throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const taskToUpdate = await this.getTaskById(id);
        taskToUpdate.status = status;
        return await this.tasksRepository.save(taskToUpdate);
    }
}
