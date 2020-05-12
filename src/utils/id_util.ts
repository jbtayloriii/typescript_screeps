

export class IdUtil implements IIdUtil {
	currentId: number;

	constructor(currentId: number) {
		this.currentId = currentId;
	}

	public createId(): string {
		const nextId = `-${Game.time}_${this.currentId}`;
		this.currentId += 1;

		return nextId;
	}

	public getCurrentId(): number {
		return this.currentId;
	}
}