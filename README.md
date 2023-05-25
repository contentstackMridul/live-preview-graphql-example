# Live Preview GraphQl Example
This is an example of Live Preview GraphQl implementation.

## Prerequisite
1. Contentstack account
2. Stack Api Key 
3. Publish Environment
4. Contentstack Delivery Token
5. Contentstack Management Token
> Please check [this](https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-preview-for-your-website/#client-side-rendering-csr) for more info on this.

## Usage
1. Step 1: Create a content type with `single line textbox` and `url` field and then create a entry with this content type
2. Step 2: Add you own credentials in `contentstack.config.js` 
3. Step 3: Install all the dependencies
    ```bash
    npm install
    ```
4. Step 4: Start the example application
    ```bash
    npm start
    ```
> Note: The example will start on `localhost:3000`

## Important Files
1. `contentstack.config.js`
    This file contain configuration related to `Contentstak SDK` and `Contentstack live preview SDK`
2. `Components/Home.js`
    This file contain all the implementation of live preview added to the component
