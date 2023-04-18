# Wizard News Pt. 1 (Completed)
This finished lab has the answers for everything but the extras.

## Main Takeaways
- Morgan: 
	- logs requests along with some other info depending upon configuration
	- helps debugging 
	- allows creation of log files
	
	
- Volleyball:
	- also logs http cycles
	- helps teach beginner programmers how HTTP servers and asynch works
- Data immutability
	- we want to export the functions that provide the data, not the data itself. this ensures the data does not change
- req.params.id
	- this is crucial to express. req.params is basically whatever comes in place of the :id. 
	- so if the URI is localhost:1337/posts/id, then req.params.id will give you whatever the user types after posts/
## Utilizing Request Parameters
Request Parameters (how to make multiple pages in Express)

first, create a find function:
```
const find = (id) => {
  const post = data.find(post => post.id === +id);
  return { ...post };
}
```
then, create the html to run along with highlighting the app.get route:
```
app.get('/posts/:id', (req, res) => {
  const post = find(req.params.id)
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
```
## Useful Snippets

### Array.find()

It returns the first element in the provided array that satisfies the testing condition. In the case provided, if the id of the post matches, that post specifically will be returned
```
const find = (id) => {
  const post = data.find(post => post.id === +id);
  return { ...post };
}
// e.g. posts.find(1) will return the first post as an object
```

### Remove Commas From an Array
```
posts
    .map((post) => post.title )
    .join('')
```


