import app from './app';
import { scanFiles } from './services/fileService';
import { setFiles } from './store/slices/fileSlice';
import { store } from './store/store';
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
            // On app start we scan and set files to redux state
            const filesInTheDir = scanFiles();
            store.dispatch(setFiles(filesInTheDir));
        });
    } catch (error) {
        console.error('Server error:', error);
        process.exit(1);
    }
};

startServer();
