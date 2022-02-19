const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler, validationResult, postValidator, grabCommentCount, grabFollows, grabLikes } = require('./utils')
const db = require('../db/models');
const { requireAuth } = require('../auth')
const s3 = require('../s3');


router.get('/s3Url', async (req, res) => {
  console.log("MADE IT TO THE /s3Url ROUTE");
    const url = await s3.generateUploadURL();
    res.send({url})
})



router.post('/add-image', requireAuth, csrfProtection, asyncHandler(async (req, res, next) => {

  const user_id = req.session.auth.userId;

  const { path, title, description } = req.body

  console.log("PATH: ", path);

  const newImage = await db.Post.create({
    user_id,
    title,
    path,
    description
  })

  res.json(newImage)
}))


module.exports = router;
