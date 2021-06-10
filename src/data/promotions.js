const { PRODUCTID } = require("./productId");
const {
  applyAlexaDiscount,
  applyGoogleHomeDiscount,
} = require("../services/discountService");

const PROMOTION_TYPE = Object.freeze({
  FREEBIE: "FREEBIE",
  DISCOUNT: "DISCOUNT",
  BUNDLE: "BUNDLE",
});

const promotions = [
  {
    type: PROMOTION_TYPE.BUNDLE,
    productId: PRODUCTID.GoogleHome,
    condition: {
      cartUnit: 3,
      offerCondition: 2,
      productId: PRODUCTID.GoogleHome,
    },
    offers: [applyGoogleHomeDiscount],
  },
  {
    type: PROMOTION_TYPE.FREEBIE,
    productId: PRODUCTID.MacBookPro,
    condition: {
      cartUnit : 1,
      offerCondition : 0,
      productId: PRODUCTID.RaspberryPiB,
    },
    offers: [],
  },
  {
    type: PROMOTION_TYPE.DISCOUNT,
    productId: PRODUCTID.AlexaSpeaker,
    condition: {
      cartUnit: 4,
      offerCondition: 10,
      productId: PRODUCTID.AlexaSpeaker,
    },
    offers: [applyAlexaDiscount],
  },
];

module.exports = {
  promotions,
  PROMOTION_TYPE,
};
