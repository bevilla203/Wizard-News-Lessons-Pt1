const express = require("express");
const app = express();
const volleyball = require('volleyball');
const PORT = 1337;
const { list, find } = require('./postBank');
const postBank = require('./postBank');
const timeAgo = require('node-time-ago');

// middleware
app.use(volleyball);
app.use(express.static('public'));


const posts = postBank.list();

// defining time
console.log(timeAgo(new Date()));
// what is the time of the post if i take time now and compare it to the string given?




app.get('/', (req, res) => {
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span> <a href='/posts/${post.id}'>
            ${post.title} </a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
        )
        .join('')}
    </div>
  </body>
</html>`;
  res.send(html);
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = find(req.params.id)
  if (!post.id) {
    // If the post wasn't found, set the HTTP status to 404 and send Not Found HTML
    res.status(404);
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <img src="/dumbledore-404.gif" />
      </div>
    </body>
    </html>`;
    res.send(html);
  }
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      <div class='news-list'> <strong> ${post.title} </strong> <span> (by ${post.name})</span>
    </div>
   <div class='news-list'> ${post.content} </div>
    </div> 
  </body>
</html>`;
  res.send(html);
})

app.get('/titles', (req, res) => {

  const html = `
    <html>
     <head>
       <title>My site</title>
     </head>
     <body>

       ${posts.map((post) => {
    return (`<li>${post.title}</li>`)
  }).join(' ')
       }

     </body>
    </html>
  `;
  res.send(html);
});



app.get('/authors', (req, res) => {
  const html = `
    <html>
     <head>
       <title>My site</title>
     </head>
     <body>

       ${posts
         .map((post) => {
           return `<li>${post.name}</li>`;
         })
         .join(' ')}

     </body>
    </html>
  `;
  res.send(html);
});



app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
