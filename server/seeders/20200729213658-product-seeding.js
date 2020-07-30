'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Products', [{
    name: 'Talgeese EW',
    image_url: 'https://cdn.shopify.com/s/files/1/2786/5582/products/rg-oz-00ms-tallgeese-ew-ver-gp_clipped_rev_1_480x480.png?v=1584225940',
    price: 230000,
    stock: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'Sazabi',
    image_url: 'https://cdn.shopify.com/s/files/1/2786/5582/products/rg-msn-04-sazabi-gp_clipped_rev_1_480x480.png?v=1584225977',
    price: 380000,
    stock: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'RX-0 Unicorn Gundam',
    image_url: 'https://cdn.shopify.com/s/files/1/2786/5582/products/rg-rx-0-unicorn-gundam-01_3f562e5d-a4f6-45ce-a74c-b69dcfcf6afe_clipped_rev_1_1024x1024.png?v=1584225732',
    price: 490000,
    stock: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'Gundam Astray Red',
    image_url: 'https://cdn.shopify.com/s/files/1/2786/5582/products/rg-mbf-p02-gundam-astray-red-frame-03_clipped_rev_1_1024x1024.png?v=1584216274',
    price: 290000,
    stock: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'RX-178 Gundam MK-II',
    image_url: 'https://cdn.shopify.com/s/files/1/2786/5582/products/rg-rx-178-gundam-mk-ii-aeug-00_clipped_rev_1_1024x1024.png?v=1584215627',
    price: 285000,
    stock: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'Evangelion Unit-00 DX',
    image_url: 'https://cdn.shopify.com/s/files/1/2786/5582/products/153_3753_s_hcvxvulsfmm8klog5zuyp5rebues_clipped_rev_1_480x480.png?v=1596051759',
    price: 700000,
    stock: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'Gundam Astray Gold',
    image_url: 'https://cdn.shopify.com/s/files/1/2786/5582/products/rg-mbf-p01-re2-gundam-astray-gold-frame-amatsu-mina-00_clipped_rev_1_480x480.png?v=1584225658',
    price: 400000,
    stock: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'RX-78-2 Gundam',
    image_url: 'https://cdn.shopify.com/s/files/1/2786/5582/products/rg-rx-78-2-gundam-00_clipped_rev_2_480x480.png?v=1584215063',
    price: 330000,
    stock: 11,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Products', null, {});
  }
};
