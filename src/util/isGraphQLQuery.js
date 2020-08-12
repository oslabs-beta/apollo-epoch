import isJsonString from '../Utility/isJsonString';

const isGraphQLQuery = (req) => {
  if (isJsonString(req)) {
    console.log(req);
    const queryObj = JSON.parse(req);
    if (typeof queryObj === 'object') {
      if (queryObj.query || queryObj.variables) return true;
    }
  }
  return false;
};

const isValidRequest: (req: any) => boolean = (req) => {
  if (req.request.postData) console.log(req);
  // if(req.request.url && req.request.url.indexOf('graphql') > -1) return true;
  if (req.request.postData && isValidGraphQL(req.request.postData)) return true;
  if (req.request.postData.text && isValidGraphQL(req.request.postData.text)) return true;

  return false;
};

export default isValidRequest;
