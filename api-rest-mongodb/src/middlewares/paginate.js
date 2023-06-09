import IncorrectRequest from "../errors/IncorrectRequest.js";

async function paginate(req, res, next) {
  try {
    let { limit = 5, page = 1, order = "_id:-1" } = req.query;

    let [sortingField, sortDirection] = order.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    sortDirection = parseInt(sortDirection);

    const result = req.result;

    if (limit > 0 && page > 0) {
      const resultPageable = await result.find()
        .sort({ [sortingField]: sortDirection })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      res.status(200).json(resultPageable);
    } else {
      next(new IncorrectRequest());
    }
  } catch (erro) {
    next(erro);
  }
}

export default paginate;