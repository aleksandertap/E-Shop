export const getProductsDataFromJson = async () => {
  try {
    const data = await fetch("./data.json");
    return data.json();
  } catch (error) {
    console.error(error);
  }
};