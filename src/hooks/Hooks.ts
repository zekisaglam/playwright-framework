import { BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import Driver from '../utils/Driver';
import Logger from '../utils/Logger';

setDefaultTimeout(60 * 1000); // 60 seconds default timeout for steps

BeforeAll(async function () {
  Logger.info('Initializing Playwright driver before all tests');
  await Driver.getInstance().init();
});

AfterAll(async function () {
  Logger.info('Closing Playwright driver after all tests');
  await Driver.getInstance().close();
});