export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Mongoose duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Duplicate field value entered",
            error: err.message,
        });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((error) => ({
            field: error.path,
            message: error.message,
        }));

        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors,
        });
    }

    // Joi validation error
    if (err.isJoi) {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: err.details,
        });
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID format",
            error: err.message,
        });
    }

    // Default to 500 server error
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error",
    });
};
export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page not found",
    });
};
