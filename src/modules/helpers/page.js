import authentication from "../evenAuthCaptcha";

export default async function Page(browser) {
    let page = await browser.newPage();
    try {
        console.log('init new Page');
        await page.goto('https://daotao.vnua.edu.vn/', { timeout: 10000 });
        console.log("Load vnua.daotao successfully !")
        await authentication(page);
    } catch (error) {
        console.error('init page false : reinit Page...');
        await page.close();
    }
}

