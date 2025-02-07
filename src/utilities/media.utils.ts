import multer from 'multer';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/tmp/my-uploads');
	},
	filename: function (req, file, callback) {
		const [filename, fileExtension] = file.originalname.split('.');
		callback(null, filename + '-' + Date.now() + '.' + fileExtension);
	},
});

export const upload = multer({ storage: storage });
