import app from './App';
import { ConfigFiles } from './config/fileImport';
import Logger from './config/Logger';

const StartServer = () => {
  try {
    const PORT = ConfigFiles.PORT;
    app.listen(PORT, () => {
      Logger.info('Server is Running', { port: PORT });
    });
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
};
StartServer();
