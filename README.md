# gnote-rest-api
**gnote-rest-api** is a free open source notes public api which provides and handles all note related operations (add, update, archive, pin/bookmark, note theme, delete, bin,...).
It is built with NodeJs(Express) & MongoDB where you can integrate with any platforms and its great for SPA websites

## Getting Started
- Clone this repository to your local machine
- Run `npm install`
- Use your own db? Connect to MongoDB server in app.js `javascript mongoose.connect('---server-code---', { useUnifiedTopology: true, useNewUrlParser: true });`
- If your using your own domain add your db password in nodemon.json env field
- Rum `npm start` to start working with api.

## API Reference
- BaseUrl for all api endpoints is **http://localhost:5000/notes**
- By default baseUrl provides all current note's list.
- By default all success api responses comes with some extra data fields
  - **code**: The response status code,
  - **message**: Feedback response message,
  - **__length**: Count of the response data (only for array[objs]),
  - **__fetched**: Last fetched api response date & time,
  - **notes**: Response (only for array[objs]),
  - **note**: Response (only for single obj),
  - **noteID**: Unique id of the note (only for patch & delete requests)
- For error responses api provides error Object containing
  - **status**: Response status code,
  - **message**: Error message

## Routes
1. To get all current notes `route: '/', method: GET`
  - response:
```json
{
    "code": 200,
    "message": "Fetched all records",
    "__length": 6,
    "__fetched": "2020-06-09T05:52:48.681Z",
    "notes": [
        {
            "pinned": true,
            "archived": false,
            "theme": "transparent",
            "_id": "5ede587b23b9975020ef44af",
            "title": "My First note",
            "note": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "created": "2020-06-08T15:25:47.743Z",
            "updated": "2020-06-08T18:04:15.784Z"
        },
        {
            "pinned": false,
            "archived": false,
            "theme": "transparent",
            "_id": "5ede5a92e022b25cec91dd7d",
            "title": "Updated second note again & again",
            "note": null,
            "created": "2020-06-08T15:34:42.428Z",
            "updated": "2020-06-08T17:05:39.118Z"
        }
    ]
}
```
2. To add note `route: '/', method: POST` 
  - Request body:
```json
{
  "title": "my second note", // required
  "note": "Note body", // required
  "pinned": true, // default 'false'
  "archived": false, // default 'false'
  "theme": "#cccc", // default 'transparent'
}
  ```
  - Response:
```json
{
  "code": 200,
  "message": "Added 'my second note gain' successfully",
  "__fetched": "2020-06-09T06:06:30.279Z",
  "note": {
      "pinned": true,
      "archived": false,
      "theme": "#cccc",
      "_id": "5edf26e41b72928624dafec0",
      "title": "my second note",
      "note": "Note body",
      "created": "2020-06-09T06:06:28.994Z",
      "updated": "2020-06-09T06:06:28.994Z",
      "__v": 0
  }
}
```

Please post bugs, issues, or help requests here as GitHub issues.
