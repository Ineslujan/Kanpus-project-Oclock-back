const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const url_server = process.env.URL_SERVER;

module.exports = {

    imgDownload: (req, res) => {
        console.log(url_server);
        let sampleFile;
        let uploadPath;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json('No files were uploaded.');
        }

        // The name of the input field (i.e. "sampleFile")
        // is used to retrieve the uploaded file
        sampleFile = req.files.sampleFile;

        if (sampleFile.size > 20000000) {
            return res.status(400).json('the file is too large');
        }

        if (sampleFile.mimetype == 'image/png' || sampleFile.mimetype == 'image/jpeg') {

            // Use the mv() method to place the file somewhere on 
            // your server
            let newFileName = uuidv4()
            if (sampleFile.mimetype == 'image/png') {
                console.log(newFileName + '.png');
                newFileName = newFileName + '.png'
            }
            if (sampleFile.mimetype == 'image/jpeg') {
                console.log(newFileName + '.jpg');
                newFileName = newFileName + '.jpg'
            }

            uploadPath = './public/avatar/' + newFileName;

            sampleFile.mv(uploadPath, function (err) {
                if (err)
                    return res.status(500).json(err);

                res.json({
                    imageName: newFileName,
                    imageUrl: url_server + 'avatar/' + newFileName
                });
            });

        } else {
            return res.status(400).json('No png or jpeg uploaded.');
        }
    }

}