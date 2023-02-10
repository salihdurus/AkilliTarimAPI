const mongoose = require("mongoose")

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Veritabanına başarıyla bağlandı !");
    })
    .catch((err) => {
        console.log(err.message);
    })