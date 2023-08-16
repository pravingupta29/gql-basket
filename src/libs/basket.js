const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { generate } = require("shortid");

const baskets = require("../../data/basket.data");
const writeFile = promisify(fs.writeFile);

const saveBasket = async (allBaskets = baskets) => {
  const fileName = path.join(__dirname, "../../data/basket.data.json");
  const fileContents = JSON.stringify(allBaskets, null, 2);

  try {
    await writeFile(fileName, fileContents);
    const basketCount = allBaskets.length;
    console.log(`${basketCount} address saved`);
  } catch (error) {
    console.error("Error saving address");
    console.error(error);
  }
};

const getBasket = (basketId) => {
  return baskets.find((basket) => basket.id === basketId);
};

const getBasketByUserId = (userId) => {
  return baskets.find((basket) => basket.userId === userId);
};

const getEntry = (productId, entries) => {
  return entries.find((entry) => entry.productId === productId);
};

const addItem = (item, userId) => {
  let newBasket;
  //   const basket = getBasketByUserId(userId);

  //   if (basket) {
  //     const entry = getEntry(item.productId, basket.entries);
  //     if (entry) {

  //     } else {

  //     }
  //   } else {
  newBasket = {
    id: generate(),
    userId,
    entries: [
      {
        ...item,
      },
    ],
  };
  //   }

  saveBasket([...baskets, { ...newBasket }]);
};

module.exports = {
  addItem,
  getBasket,
};
