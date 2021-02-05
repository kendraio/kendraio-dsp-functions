const aws = require('aws-sdk');
const get = require('lodash.get');

aws.config.update({
    'accessKeyId': process.env.DSP1_AWS_ACCESS_KEY_ID,
    'secretAccessKey': process.env.DSP1_AWS_SECRET_ACCESS_KEY,
    'region': 'eu-west-2',
});

const S3_BUCKET = 'dsp1-track-uploads';

module.exports = async (req, res) => {
    // Verify that this handler is being called as an action by checking the provided secret
    if (process.env.ACTION_SECRET_ENV !== req.headers['x-action-secret']) {
        res.status(400).send('missing action secret');
        return;
    }

    const trackId = get(req, 'body.input.trackId');
    const userId = get(req, 'body.session_variables.x-hasura-user-id');

    if (!trackId || !userId) {
        res.status(400).send('bad request');
        return;
    }

    const s3 = new aws.S3();
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: `${userId}/${trackId}`,
        Expires: 900,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
            return res.status(500).send(err);
        }
        return res.json({
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${userId}/${trackId}`
        });
    });
}
