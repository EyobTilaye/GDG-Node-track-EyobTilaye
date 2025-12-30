const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        success: "false",
        message: "Something went wrong",
        error: err.message,
    });
};

export default errorHandler;
