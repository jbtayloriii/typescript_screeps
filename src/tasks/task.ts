

export interface Task {

	execute(): void;

	serialize(): TaskMemory;
}