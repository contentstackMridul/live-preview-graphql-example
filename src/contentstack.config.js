//@ts-nocheck
import Contentstack from "contentstack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

// CONTENTSTACK CONFIGS => CHANGE THESE ACCORDING TO YOUR CONFIG
export const CONTENTSTACK_API_KEY = "";
export const CONTENTSTACK_DELIVERY_KEY = "";
export const CONTENTSTACK_ENVIRONMENT = "";
export const CONTENTSTACK_MANAGEMENT_KEY = "";


export const CONTENTSTACK_CONTENT_TYPE_UID = "";
export const CONTENTSTACK_ENTRY_UID = "";


export const Stack = Contentstack.Stack({
  api_key: CONTENTSTACK_API_KEY,
  delivery_token: CONTENTSTACK_DELIVERY_KEY,
  environment: CONTENTSTACK_ENVIRONMENT,
  live_preview: {
    enable: true,
    // SET YOU HOST ACCORDING TO YOUR REGION
    host: "api.contentstack.io",
    management_token: CONTENTSTACK_MANAGEMENT_KEY,
  },
});

ContentstackLivePreview.init({
  stackSdk: Stack,
  enable: true,
  clientUrlParams: {
    // SET YOU HOST ACCORDING TO YOUR REGION : IMPORTANT OF LIVE PREVIEW EDIT BUTTON FUNCTIONALITY
    host: "app.contentstack.com",
  },
  // For edit button configuration
  editButton:{
    enable:true,
    position:'top-center',
    exclude:["outsideLivePreviewPortal"]
  }
});

export const onLiveEdit = ContentstackLivePreview.onLiveEdit;

// To know more about live preview configuration check => https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-preview-for-your-website/#client-side-rendering-csr
