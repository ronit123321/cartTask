const { PRODUCTID } = require("./productId");
const {
  applyMacbookDiscount,
  applyAlexaDiscount,
  applyGoogleHomeDiscount,
} = require("../services/discountService");

const promotions = [
  {
    productId: PRODUCTID.GoogleHome,
    offers: [applyGoogleHomeDiscount],
  },
  {
    productId: PRODUCTID.MacBookPro,
    offers: [applyMacbookDiscount],
  },
  {
    productId: PRODUCTID.AlexaSpeaker,
    offers: [applyAlexaDiscount],
  },
  {
    productId: PRODUCTID.RaspberryPiB,
    offers: [],
  },
];

module.exports = {
  promotions,
};
