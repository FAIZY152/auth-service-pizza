import app from './App';
import { AppDataSource } from './config/data-source';
import { Config } from './config/fileImport';
import Logger from './config/Logger';

const StartServer = () => {
  try {
    const PORT = Config.PORT;
    AppDataSource.initialize().then(() => {
      Logger.info('Database Connected');
      app.listen(PORT, () => {
        Logger.info('Server is Running', { port: PORT });
      });
    });
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
};
StartServer();
