// import { , Request,Response,NextFunction } from "express";

// const errorHandler = (err: Error, req:Request, res: Response, next: NextFunction) => {

//     console.error(err.stack);
    
//     // Set the response status code based on the error type
//     if ((err as Error).status) {
//         res.status(err.status).json({ error: err.message });
//     } else {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
    
//     // Optionally, you can log the error to an external service here
// }


// export default errorHandler;