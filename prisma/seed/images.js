const uuid = require("uuid");

const images = [
  {
    id: uuid.v4(),
    url: "https://placehold.jp/300x300.png",
    keyword: "300 * 300 a",
    usedCount: 1,
    reported: false,
    createdAt: new Date(2023, 7, 1),
  },
];

module.exports = { images };
