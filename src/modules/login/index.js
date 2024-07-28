import { inputLogin, inputPassword, submitLogin, username, password, signupSubjectS } from "../../constants";
import result from "../helpers/checkResult";
import signupSubject from "../signupSubject";

export default async function login(page) {
  try {
    console.log(`start try login...`)
    await page.waitForTimeout(500);
    const test1 = await result(page.waitForSelector(inputLogin,{timeout:5000}));
    if (test1) {
      try {
        await page.waitForTimeout(200);
        await page.fill(inputLogin, username);

        await page.waitForTimeout(200);
        await page.fill(inputPassword, password);

        await page.waitForTimeout(200);
        await page.click(submitLogin);

        await page.waitForTimeout(500);

        const isFound = await result(page.isVisible(signupSubjectS,{timeout:5000}));
        if (isFound) {
          console.log('login successful !');
          await page.waitForTimeout(500);
          signupSubject(page);
        }else{
          console.log('dkmonhoc not found');
          await page.close();
        }

      } catch (e) {
          console.error("login failed . restart browser...")
          await page.close();
        }
    }
    else {
      console.error("failed to load inputbox . restart browser...")
      
      await page.close();
    }
  }
   catch (error) {
    console.error("failed to load visible inputbox . restart browser...")
    console.error(error)
    await page.close();
  }
}
