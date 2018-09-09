let Parser = require('rss-parser');
let fs = require('fs')
let moment = require('moment')
let parser = new Parser();

const readFile = (path, callback) => {
  fs.readFile(path, 'utf8', function(err, contents) {
    if (err) {
      return console.log(err);
    }

    callback(contents)
  });
}

const writeFile = (contents, date, title) => {

  const formattedDate = moment(date).format('YYYY-MM-DD');
  const formattedTitle = encodeURIComponent(title)

  const filePath = `_posts/${formattedDate}-${formattedTitle}.md`

  fs.writeFile(filePath, contents, function(err) {
    if(err) {
        return console.log("Write error: " , err);
    }

      console.log("The file was saved!");
  });
}

(async () => {

  const rssLink = "https://anchor.fm/s/511d5b4/podcast/rss"

  let feed = await parser.parseURL(rssLink);

  const item = feed.items[0]
  const title = item.title
  const date = item.pubDate
  const content = item.content.replace(`
FOR MORE BOY$NITE:
http://boysnite.us`, "")

  readFile('_example-posts/__template.md', (contents) => {
    const file = contents.replace("%TITLE", title).replace("%CONTENT", content);

    writeFile(file, date, title)
  })

})();
