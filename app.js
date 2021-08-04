require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const {models, sequelize} = require('./models');
const bookmark = require('./models/bookmark');
const methodOverride = require('method-override');


// sequelize.sync().then(async() => {
//   await models.Bookmark.create(
//     {
//       url: 'http://localhost:3000',
//       description: 'Bookmarksssss are the best'
//     }
//   )
//   const bookmarks = await models.Bookmark.findAll({
//     where: {
//       description: 'Bookmarksssss are the best'
//     }
//   })
//   console.log(bookmarks)
// })


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.get('/bookmark', async (req, res) => {
  const bookmarks = await models.Bookmark.findAll({})

  res.render('index.ejs', {
    bookmarks: bookmarks

  });
})

app.post('/bookmark', async (req, res) => {
  await models.Bookmark.create(
        {
          url: req.body.url,
          description: req.body.desc,
          name: req.body.name
        }
      )

  res.redirect('/bookmark');
})

app.delete('/bookmark/:id', async (req, res) => {
  await models.Bookmark.destroy({
    where: {
      id: req.params.id
    }
  })

  res.redirect('/bookmark')

})




app.listen(port, () => {
  console.log("running");
})
