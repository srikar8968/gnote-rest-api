# gnote-rest-api
**gnote-rest-api** is a free open source notes public api which provides and handles all note related operations (add, update, archive, pin/bookmark, note theme, delete, bin,...).
It is built with NodeJs(Express) & MongoDB where you can integrate with any platforms and its great for SPA websites

## Getting Started
- Clone this repository to your local machine
- Run `npm install`
- Use your own db? Connect to MongoDB server in app.js 
```javascript
mongoose.connect('---server-code---', { useUnifiedTopology: true, useNewUrlParser: true });
```
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
   - Response:
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
```javascript
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
3. To get note by id `route: '/:id', method: GET`
   - Request url: `http://localhost:5000/notes/5ede587b23b9975020ef44af`
   - Response:
```json
{
    "code": 200,
    "message": "Fetched 'My First note' successfully",
    "__fetched": "2020-06-09T06:12:56.700Z",
    "note": {
        "pinned": true,
        "archived": false,
        "theme": "transparent",
        "_id": "5ede587b23b9975020ef44af",
        "title": "My First note",
        "note": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "created": "2020-06-08T15:25:47.743Z",
        "updated": "2020-06-08T18:04:15.784Z",
        "__v": 0
    }
}
```
4. To update note by id `route: '/:id', method: PATCH`
   - Request url: `http://localhost:5000/notes/5edf26e41b72928624dafec0`
   - Request Body:
```javascript
{
	"title": "my second note gain & again", // required
	"note": "Note body" // required
}
```
   - Response:
```json
{
    "code": 200,
    "message": "Updated note with id:'5edf26e41b72928624dafec0' successfully",
    "__fetched": "2020-06-09T06:18:24.978Z",
    "noteID": "5edf26e41b72928624dafec0"
}
```
5. To archive note `route: '/archive/:id/:condition', method: PATCH`. Here `:condition` param accepts `[add, remove]` values
   - Request url: `http://localhost:5000/notes/archive/5edf26e41b72928624dafec0/add` or `http://localhost:5000/notes/archive/5edf26e41b72928624dafec0/remove`
   - Response: 
```json
{
    "code": 200,
    "message": "Archived note with id:'5edf26e41b72928624dafec0' successfully",
    "__fetched": "2020-06-09T06:23:59.893Z",
    "noteID": "5edf26e41b72928624dafec0"
}
```
or
```json
{
    "code": 200,
    "message": "Note with id:'5edf26e41b72928624dafec0' removed from archive list",
    "__fetched": "2020-06-09T06:24:50.873Z",
    "noteID": "5edf26e41b72928624dafec0"
}
```
6. To pin/bookmark note `route: '/pin/:id/:condition', method: PATCH`. Here `:condition` param accepts `[add, remove]` values
   - Request url: `http://localhost:5000/notes/pin/5edf26e41b72928624dafec0/add` or `http://localhost:5000/notes/pin/5edf26e41b72928624dafec0/remove`
   - Response: 
```json
{
    "code": 200,
    "message": "Pinned note with id:'5edf26e41b72928624dafec0' successfully",
    "__fetched": "2020-06-09T06:23:59.893Z",
    "noteID": "5edf26e41b72928624dafec0"
}
```
or
```json
{
    "code": 200,
    "message": "Note with id:'5edf26e41b72928624dafec0' removed from pinned list",
    "__fetched": "2020-06-09T06:24:50.873Z",
    "noteID": "5edf26e41b72928624dafec0"
}
```
7. To change note theme `route: '/:id/add-theme', method: PATCH`
   - Request url: `http://localhost:5000/notes/5edf26e41b72928624dafec0/add-theme`
   - Request Body:
```javascript
{
	"theme": "#dcdcdc" // required, valid color code
}
```
   - Response:
```json
{
    "code": 200,
    "message": "Changed theme for note with id:'5edf26e41b72928624dafec0'",
    "__fetched": "2020-06-09T06:31:07.387Z",
    "noteID": "5edf26e41b72928624dafec0",
    "theme": "#dcdcdc"
}
```
8. To delete note `route: '/:id', method: DELETE`
   - Request url: `http://localhost:5000/notes/5edf26e41b72928624dafec0`
   - Response:
```json
{
    "code": 200,
    "__fetched": "2020-06-09T06:33:25.241Z",
    "messsage": "Note with id:'5edf26e41b72928624dafec0' deleted successfully"
}
```

Please post bugs, issues, or help requests here as GitHub issues.
