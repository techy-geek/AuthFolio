
import {app} from "./app.js";

app.get('/', (req, res) => {
  res.send('AuthFolio Backend is running ✅');
});


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`);
})
