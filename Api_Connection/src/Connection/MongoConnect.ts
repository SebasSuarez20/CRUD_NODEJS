
import mongoose from 'mongoose';
import dotenv from "dotenv";

class MongoConnect {

  public MongoURL: string = "";

  constructor() {
    this.MongoURL = "mongodb://127.0.0.1:27017/DbTask";
  }

  public ConnectionSuccesFull() {
    mongoose.connect(this.MongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }).then((res) => {
      console.log('Connection Succesfull');
    }).catch((err) => {
      console.error("No se puede conectar.");
    })

  }

}

export { MongoConnect }