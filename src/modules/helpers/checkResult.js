export default async function result(test){
    try {
        return await test 
    } catch (error) {
        return false
    }
}