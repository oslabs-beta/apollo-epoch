const { createWatchCompilerHost } = require("typescript");

const getNetworkResponses = () => {
  chrome.devtools.network.onRequestFinished.addListener((HAR) => {
    // const res = HAR.getContent((whatever) => console.log(whatever));
    console.log('HAR', HAR);
  });
};

export default getNetworkResponses;
