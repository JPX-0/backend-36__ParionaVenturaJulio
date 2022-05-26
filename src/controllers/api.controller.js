import formatResponse from "../../utils/formatter/send.format.js";
import STATUS from "../../utils/constants/api.constants.js";

const getRandom = async (res, cant) => {
  let qty;
  if(isNaN(cant)) qty = 500000;
  else qty = cant;
  const dataRandom = [];
  for(let i = 0; i < qty; i++) {
    dataRandom.push(Math.floor(Math.random() * 1000) + 1);
  }
  const dataRepeat = [];
  const dataObject = {};
  for (let i = 0; i < dataRandom.length; i++) {
    const elem = dataRandom[i];
    if(!dataRepeat.includes(elem)) {
      dataRepeat.push(elem);
      dataObject[`${elem}`] = 1;
    } else dataObject[`${elem}`]++;
  }
  return res.status(STATUS.OK.code).json(formatResponse(false, STATUS.OK, dataObject));
}

export { getRandom };