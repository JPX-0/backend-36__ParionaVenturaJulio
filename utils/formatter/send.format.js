const formatResponse = (error, status, content) => {
  let message = null;
  let data = null;
  if(typeof content == "string") message = content
  else data = content
  return { 
    error, 
    success: !error,
    statusTag: status.tag,
    statusCode: status.code,
    message,
    data
  }
};

export default formatResponse;