import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ngo_submissions',
        format: async (req, file) => {
            // Allow multiple file formats
            const allowedFormats = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png'];
            const fileExtension = file.originalname.split('.').pop().toLowerCase();
            return allowedFormats.includes(fileExtension) ? fileExtension : 'pdf';
        },
        public_id: (req, file) => `${file.originalname.split('.')[0]}-${Date.now()}`
    },
});

const fileFilter = (req, file, cb) => {
    // Allow multiple file types
    const allowedMimeTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/jpg',
        'image/png'
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`File type not allowed. Allowed types: ${allowedMimeTypes.join(', ')}`), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
        files: 1 // Only allow 1 file
    }
});

export default upload; 