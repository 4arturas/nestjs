import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {TasksRepository} from "./tasks.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {TaskStatus} from "./task-status.enum";
import {User} from "../auth/user.entity";

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository) {
    }

    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto, user);
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

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.tasksRepository.findOne({ where: {id, user}});
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    async deleteTaskById(id: string, user: User): Promise<void> {
        const found = this.getTaskById(id, user);
        const result = await this.tasksRepository.delete({ id, user });
        if (result.affected === 0 )
            throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const taskToUpdate = await this.getTaskById(id, user);
        taskToUpdate.status = status;
        return await this.tasksRepository.save(taskToUpdate);
    }
}
