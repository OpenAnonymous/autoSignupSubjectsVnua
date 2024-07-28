import result from "../helpers/checkResult";
import { signupSubjectS, inputSubjectS, inputSubjectBtnS, subjects, selectorSubjects } from "../../constants";
import store from "../../state/configStore";
import { setPreventReloadBrowser } from "../../state/rootReducer";
import save from "../saveSubject";

export default async function signupSubject(page) {
    console.log('Signup for subjects');
    const test1 = await result(page.waitForSelector(signupSubjectS,{timeout:5000}));
    if (test1) {
        try {
            await page.waitForTimeout(500);
            await page.click('a[href="Default.aspx?page=dkmonhoc"]');
            await page.waitForTimeout(500);

            const input = await result(page.waitForSelector(inputSubjectS,{timeout:5000}));
            if (input) {
                try {
                    await page.waitForTimeout(500);
                    await page.fill(inputSubjectS, subjects[0]);
                    await page.waitForTimeout(500);
                    await page.click(inputSubjectBtnS);
                    await page.waitForTimeout(1000);
                    const sub = await result(page.waitForSelector(selectorSubjects,{timeout:5000}));
                    if (sub) {
                        try {
                            const elements = await page.evaluate((selector) => {
                                return Array.from(document.querySelectorAll(selector)).map(el => el.id);
                            }, selectorSubjects);

                            let i = 0;
                            let checkboxFound = false;

                            while (i < elements.length) {
                                const id = elements[i];
                                const checkbox = await page.locator(`[id="${id}"]`);
                                try {
                                    const isDisabled = await checkbox.isDisabled();
                                    if (isDisabled) {
                                        console.error(`Nhóm ${subjects[0]} thứ ${i} đã hết slot`);
                                    } else {
                                        await checkbox.check();
                                        console.log(`\x1b[36m"+"Đã đăng ký thành công nhóm ${subjects[0]} thứ ${i} cho bạn!`);
                                        checkboxFound = true;
                                        save(page);
                                        break;
                                    }
                                } catch (error) {
                                    console.error(`Lỗi khi kiểm tra hoặc chọn checkbox với ID ${id}`);
                                    await page.close();
                                }
                                i++;
                            }

                            if (!checkboxFound) {
                                console.error("Tất cả các nhóm đã hết slot cho bạn!");
                                store.dispatch(setPreventReloadBrowser(true));
                            }

                            await page.close();

                        } catch (error) {
                            console.error("Lỗi khi lấy và xử lý các checkbox:", error);
                            await page.close();
                        }

                    } else {
                        console.error("Không tìm thấy phần tử với selectorSubjects");
                        await page.close();
                    }
                } catch (error) {
                    console.error("Lỗi khi thao tác với input:", error);
                    await page.close();
                }

            } else {
                console.error("Không tìm thấy input môn học");
                await page.close();
            }
        } catch (error) {
            console.error("Lỗi khi thực hiện signup subjects:", error);
            await page.close();
        }

    } else {
        console.error('Không tìm thấy button signupSubjectS');
        await page.close();
    }
}
