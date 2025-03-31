// export const errorHandler = (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ error: err.message || "Internal Server Error" });
//   };

// middleware/errorMiddleware.js
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
  };
//   In production, consider using morgan("combined") for more detailed logs