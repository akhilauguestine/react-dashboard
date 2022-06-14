let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Post Model
let postSchema = require("../models/Post");

// CREATE Post
router.post("/new-post", (req, res, next) => {
  postSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ PostId
router.get("/get-postid", (req, res) => {
  postSchema.find({}).sort({ "post_id": -1 }).limit(1)
    .then(data => {
      data.map((d, k) => {
        pid = d.post_id
        if (pid) {
          res.json(pid + 1);
        } else {
          res.json(1);
        }

      })
    })
    .catch(error => {
      console.log(error);
    })
});

// READ PostType
router.get("/get-posttype/:id", (req, res) => {
  let ptype;
  postSchema.find({ post_id: req.params.id })
    .then(data => {
      data.map((d, k) => {
        if (d.meta_key == 'post-type') {
          ptype = d.meta_value
          res.json(ptype);
        }
      })
    })
    .catch(error => {
      res.json(error);
    })
});

// UPDATE post
router.route("/update-post/:id")
  // Get Single Post
  .get((req, res) => {
    let data;
    postSchema.find({ post_id: req.params.id })
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        res.json(error);
      })
  })

  // Update Post Data
  .put((req, res, next) => {
    const query = { post_id: req.params.id, meta_key: req.body.meta_key }
    const update = { meta_value: req.body.meta_value }
    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    };
    postSchema.findOneAndUpdate(query, update, options, function (err, data) {
      if (err) {
        return next(error);
      }
      else {
        res.json(data);
      }
    });
  });

// Delete Post
router.delete("/delete-post/:id",
  (req, res, next) => {
    postSchema.deleteMany(
      { post_id: req.params.id }, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({
            msg: data,
          });
        }
      });
  });

// READ PostList
router.get("/get-postlist/:id", (req, res) => {
  let postIds = [];

  postSchema.find({ meta_key: 'post-type', meta_value: req.params.id })
    .then(data => {
      data.map((d, k) => {
          postIds[k] = d.post_id
          // res.json(k);
          // res.json(d);
      })
      postSchema.find().where('post_id').in(postIds)
      .then(datas => {
        res.json(datas);
      })
      
    })
    .catch(error => {
      res.json(error);
    })
    // res.json(data);
});

// READ Posts
router.get("/", (req, res) => {
  postSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;