import { chromium } from 'playwright';
import Page from './modules/helpers/page';
import store from './state/configStore';

async function loadAutoWeb() {
  while (true) {
    const browser = await chromium.launch({ headless: false });
    try {
      await Page(browser);
      try {
        const state = store.getState();
        if (state.bot.preventReloadBrowser) {
          console.log('đã hết slot đăng kí Bot ngừng quá trình spam');
          break;
        }
        if(state.bot.saveSubjectsSuccess){
          console.log('đã lưu thành công Bot ngừng quá trình spam');
          break;
        }
      }
      catch (e) {
        console.error('Error : Failed to load bot state');
        break;
      }
    } catch (error) {
      console.error('Error : failed to launch Chromium browser');
      await new Promise(resolve => setTimeout(resolve, 3000)); 
    } finally {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
}

loadAutoWeb();
