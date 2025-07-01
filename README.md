# Zoom Video SDK UI Toolkit React sample

Use of this sample app is subject to our [Terms of Use](https://explore.zoom.us/en/video-sdk-terms/).

This repo is a [React](https://reactjs.org/) app generated via [Vite](https://vitejs.dev/) that uses the [Zoom Video SDK UI toolkit](https://developers.zoom.us/docs/video-sdk/web/) to start and joins sessions.

![Zoom Video SDK](https://github.com/zoom/videosdk-ui-toolkit-web/raw/main/uitoolkitgalleryview.png)

## Installation

To get started, clone the repo:

`$ git clone https://github.com/zoom/videosdk-ui-toolkit-react-sample.git`

## Setup

1. Once cloned, navigate to the `videosdk-ui-toolkit-react-sample` directory:

   `$ cd videosdk-ui-toolkit-react-sample`

1. Then install the dependencies:

   `$ npm install`

1. Open the `videosdk-ui-toolkit-react-sample` directory in your code editor.

1. Open the `src/App.js` file, and enter values for the variables:

   | Variable                   | Description |
   | -----------------------|-------------|
   | authEndpoint          | Required, your Video SDK auth endpoint that securely generates a Video SDK JWT. [Get a Video SDK auth endpoint here.](https://github.com/zoom/videosdk-auth-endpoint-sample) |
   | config | Your Video SDK [session details](https://developers.zoom.us/docs/video-sdk/web/ui-toolkit/#create-a-configuration-object) and [enabled features](https://developers.zoom.us/docs/video-sdk/web/ui-toolkit/#supported-features). The `videoSDKJWT` will be set from the response of your `authEndpoint`. |
   | role | Required, `0` to specify participant, `1` to specify host. |

   Example:

   ```js
   var authEndpoint = "http://localhost:4000";
   var config = {
      videoSDKJWT: "",
      sessionName: "SessionA",
      userName: "UserA",
      sessionPasscode: "abc123",
      featuresOptions: {
         virtualBackground: {
            enable: true,
            virtualBackgrounds: [
            {
               url: "https://images.unsplash.com/photo-1715490187538-30a365fa05bd?q=80&w=1945&auto=format&fit=crop",
            },
            ],
         },
      }
   };
   var role = 1;
   ```

1. Save `App.js`.

1. Run the app:

   `$ npm run dev`

## Usage

1. Navigate to http://localhost:5173 and click "Join Session".

## Deployment

You can deploy this app to Vercel, Netlify, or any static hosting provider. For example, to deploy to Vercel:

1. Install Vercel CLI (if not already):
   ```bash
   npm i -g vercel
   ```
2. Run:
   ```bash
   vercel
   ```

## Notes
- Do NOT hardcode your JWT in the frontend. Always fetch it from your backend auth endpoint.
- For more information, see the [Zoom Video SDK UI Toolkit documentation](https://marketplace.zoom.us/docs/sdk/video/web/ui-toolkit/overview/).

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://explore.zoom.us/docs/en-us/developer-support-plans.html) plans.
