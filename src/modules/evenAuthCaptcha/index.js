import { inputLogin, authTextSelector, inputSelector, submitButtonSelector } from '../../constants/index';
import result from '../helpers/checkResult';
import login from '../login';

export default async function authentication(page) {
  try {
    console.log(`try verify captcha ...`);
    const test1 = await result(page.waitForSelector(authTextSelector));
    if (test1) {
      try {
        await page.waitForTimeout(500);
        const authText = await page.locator(authTextSelector).textContent();
        if(authText){
            try {
              await page.waitForTimeout(500);
              await page.fill(inputSelector, authText);
              await page.waitForTimeout(500);
              await page.click(submitButtonSelector);
              await page.waitForTimeout(1000);
              const isFound = await page.isVisible(inputLogin);
              if (isFound) {
                  console.log('verifyCaptcha successful !');
                  login(page);
              }
              else{
                console.log('inputLogin not found');
                await page.close();
              }
            } catch (error) {
              console.error('failed to fill auth text captcha');
              await page.close();
            }
        }
        else{
          console.error('failed to get auth text captcha');
          await page.close();
        }
      } catch (e) {
        console.error('failed to load auth text captcha');
        await page.close();
      }
    }
    else{
      console.log('authTextCaptcha not found');
      await page.close();
    }
  } catch (error) {
      await page.close();
  }
}
