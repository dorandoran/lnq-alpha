const template = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
      <style>
        html {
          display: flex;
          justify-content: center;
          margin: 10em;
        }
        body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        h2 {
          font-family: sans-serif;
          padding-left: auto;
          padding-right: auto;
        }
        form {}
        p {
          font-family: Impact, Charcoal, sans-serif;
          padding-left: auto;
          padding-right: auto;
        }
        button {
          width: 6em;
          padding-left: auto;
          padding-right: auto;
        }
      </style>
      </head>
      <body>
        <h2>LNQ-Alpha Indexing</h2>
        <form id="lnqform" name="lnqindex" action="/indexAll" method="POST">
          <p>Delete and reindex firestore data?</p>
          <button type="submit" form="lnqform">Index</button>
        </form>
      </body>
    </html>
  `
}

module.exports = template
