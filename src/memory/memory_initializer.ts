
/** Current version of memory, used to determine if we should check for top level memory changes. */
export const CURRENT_MEMORY_VERSION = "2";

/** Static helper for initializing top level memory. */
export class MemoryInitializer {
	static shouldReboot(): boolean {
		if (!Memory.current_memory_version || Memory.current_memory_version != CURRENT_MEMORY_VERSION) {
			return true;
		}
		return false;
	}

	static Initialize(): void {
		console.log("Initializing memory to version " + CURRENT_MEMORY_VERSION);

		this.initializeOtherMemory();

		Memory.current_memory_version = CURRENT_MEMORY_VERSION;
	}

	private static initializeOtherMemory(): void {
		if (!Memory.spawns) {
			Memory.spawns = {};
		}
		if (!Memory.headquarters) {
			Memory.headquarters = {
				bases: {}
			};
		}
		Memory.globalId = 1;

	}
}