import { StartedTestContainer } from 'testcontainers';

export {};

declare global {
	// eslint-disable-next-line vars-on-top, no-var
	var containers: StartedTestContainer[];
}
