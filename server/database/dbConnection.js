import mongoose from "mongoose";

export const connection = () => {
    mongoose.connect(process.env.URI, {
        dbName: "gdgc_auth"
    }).then(() => {
        console.log("Connected to database successfully...");
    }).catch((err) => {
        console.log("Some error occurred while connecting to database");
        console.error(err); // always log the real error
    });
};
