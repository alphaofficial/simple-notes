import { isDevelopment } from './app.config';

const validationConfig = {
	enableDebugMessages: isDevelopment,
};

export default validationConfig;
