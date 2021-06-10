const { applyBundlePromotions } = require("./bundleService");
const { applyDiscountPromotions } = require("./discountService");
const { applyFreebiePromotions } = require("./freebieService");

module.exports = {
  applyBundlePromotions,
  applyDiscountPromotions,
  applyFreebiePromotions,
};
