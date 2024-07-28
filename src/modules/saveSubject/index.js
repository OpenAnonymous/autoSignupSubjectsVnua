import result from "../helpers/checkResult";
import { selectAll,saveSubjects } from "../../constants";
import store from "../../state/configStore";
import { setSaveSubjectsSuccess } from "../../state/rootReducer";

export default async function save(page){
    try {
        console.log('Saving subjects...');
        await page.waitForTimeout(500);
        const loadBtnSelectAll = await result(page.waitForSelector(selectAll,{timeout:5000}));
        if(loadBtnSelectAll){
            try{
                await page.waitForTimeout(500);
                await page.click(selectAll);
                await page.waitForTimeout(500);
                await page.click(saveSubjects);
                await page.waitForTimeout(500);
                console.log('Success');
                store.dispatch(setSaveSubjectsSuccess(true));
            }
            catch (e) {
                console.log('Error when click save subjects !');
                await page.close();
            }
        }
    } catch (error) {
        console.log('Error when starting save subjects !'); 
        await page.close();
    }
}