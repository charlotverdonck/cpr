import { init as initCommands } from './commands';
import { init as initNavigation, switchPage } from './navigation';
import router from './router';

initCommands();
initNavigation(router);
switchPage('index');
