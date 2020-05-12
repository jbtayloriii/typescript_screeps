

export interface Base {

	run(): void;

	processResourceRequests(): void;

	serialize(): BaseMemory;
}