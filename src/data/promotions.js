const { PRODUCTID } = require("./productId");
const {
  applyMacbookDiscount,
  applyAlexaDiscount,
  applyGoogleHomeDiscount,
} = require("../services/discountService");

const promotions = [
  {
    productId: PRODUCTID.GoogleHome,
    promotions: [applyGoogleHomeDiscount],
  },
  {
    productId: PRODUCTID.MacBookPro,
    promotions: [applyMacbookDiscount],
  },
  {
    productId: PRODUCTID.AlexaSpeaker,
    promotions: [applyAlexaDiscount],
  },
  {
    productId: PRODUCTID.RaspberryPiB,
    promotions: [],
  },
];

module.exports = {
  promotions,
};
