export default (req, _res, next) => {
  console.log("INCOMING REQUEST", req.method, req.url);
  console.log("INCOMING REQUEST HEADERS", JSON.stringify(req.headers, null, 2));
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("INCOMING REQUEST BODY", JSON.stringify(req.body, null, 2));
  }
  next();
};
