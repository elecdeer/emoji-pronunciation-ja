const fetch = require("node-fetch");
const convert = require("xml-js");
const fs = require("fs").promises;

const downloadAnnotationXml = async () => {
  return fetch("https://raw.githubusercontent.com/unicode-org/cldr/master/common/annotations/ja.xml")
    .then(res => res.text());
}

const pickOutData = async (srcJson) => {
  const annotations = srcJson.ldml.annotations.annotation;

  return annotations.reduce((map, item) => {
    // console.log(item);

    if(!("type" in item._attributes && item._attributes.type === "tts")) return map;

    const curr = {...map};
    curr[item._attributes.cp] = item._text;

    return curr;
  }, {});
}


(async () => {
  const xml = await downloadAnnotationXml();
  const json = convert.xml2js(xml, {compact: true, spaces: 2});

  const destJson = await pickOutData(json);

  await fs.writeFile("./data/pronunciation.json", JSON.stringify(destJson, null, "\t"));

  console.log("complete");
})();
