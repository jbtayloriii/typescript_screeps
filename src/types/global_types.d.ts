declare var global: {
	// TODO: interfaces so we can strongly type
	contractManager: any; // IContractManager;
	idUtil: IIdUtil;
	hq: IHeadquarters;
};

interface IIdUtil {
	getCurrentId(): number;
	createId(): string;
}

interface IContractManager {
	getCreepContract(): CreepContract;

	serialize(): void;
}

interface IHeadquarters {
	checkWorld(): void;
	processResourceRequests(): void;
	execute(): void;
	serialize(): void;
}
