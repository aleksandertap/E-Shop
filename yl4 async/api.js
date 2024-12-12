export const getProductsData = async() => {
    try{
         const data = await fetch("./data.json")
         return data.json()
    }catch(error){
        console.log(error)
    }
    
   
}