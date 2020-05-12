

export class IdUtil {
	currentId: number;

	constructor(currentId: number) {
		this.currentId = currentId;
	}

	createId(): string {
		const nextId = `-${Game.time}_${this.currentId}`;
		this.currentId += 1;

		return nextId;
	}	
}