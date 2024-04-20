import { app } from './index';

const PORT = process.env.API_PORT || 3003;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})