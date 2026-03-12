const {Router} = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');

const Blog = require('../models/blog');
const Comment = require('../models/comment')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
})

const upload = multer({ storage: storage });


router.get('/add-blog',(req, res)=>{
    return res.render('blog',{
        user : req.user
    })
})

router.get('/:id', async (req, res)=>{
  const blog = await Blog.findById(req.params.id).populate('createdBy');
  const comments = await Comment.find({blogId:req.params.id}).populate('createdBy');
  return res.render('viewBlog',{
    user: req.user,
    blog,
    comments
  })
})

router.post('/comment/:blogId', async (req, res)=>{
  const {content} = req.body;
  await Comment.create({
    content, 
    createdBy:req.user._id,
    blogId: req.params.blogId,
  })
  return res.redirect(`/blog/${req.params.blogId}`)
})

router.post('/delete/:id', async(req, res)=>{
  const blog = await Blog.findById(req.params.id);
  if(blog.createdBy.toString() !== req.user._id.toString()){
    return res.status(403).send('Not allowed')
  }
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/');
})

router.post('/',upload.single('coverImage'), async (req, res)=>{
    const {body, title} = req.body;
    const blog = await Blog.create({
        body, 
        title,
        createdBy : req.user._id,
        coverImageUrl:`/uploads/${req.file.filename}`
    })
    return res.redirect('/');
})

module.exports = router;





