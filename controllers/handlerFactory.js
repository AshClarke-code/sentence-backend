const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/APIFeatures");

exports.getAll = (Model, dataName) =>
  catchAsync(async (req, res, next) => {
    
    const features = new APIFeatures(Model.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    const docs = await features.query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        [dataName]: docs,
      },
    });
  });

exports.createOne = (Model, dataName) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        [dataName]: doc,
      },
    });
  });

exports.getOne = (Model, dataName) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc)
      return next(new AppError("No document found matching that ID!", 404));

    res.status(201).json({
      status: "success",
      data: {
        [dataName]: doc,
      },
    });
  });

exports.updateOne = (Model, dataName) =>
  catchAsync(async (req, res, next) => {

    const doc = await Model.findById(req.params.id);

    if (!doc) return next(new AppError(`No ${dataName} with that ID`, 404));

    //I do it this way in case i need to trigger doc middleware

    Object.keys(req.body).forEach((key) => {
      doc[key] = req.body[key];
    });

    await doc.save();

    res.status(200).json({
      status: "success",
      data: {
        [dataName]: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc)
      return next(new AppError("No document found matching that ID!", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
