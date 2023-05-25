import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_ENTRY } from "../GraphQL/Queries";
import { CONTENTSTACK_CONTENT_TYPE_UID, CONTENTSTACK_ENTRY_UID, Stack, onLiveEdit } from "../contentstack.config";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import Contentstack from "contentstack";
import "@contentstack/live-preview-utils/dist/main.css";



function GetEntryLoad() {
  const { error, loading, data } = useQuery(LOAD_ENTRY);
  const [entry, setEntry] = useState([]);
  useEffect(() => {
    // setting entry state whenever data is changed
    if (data) {
      setEntry(data[CONTENTSTACK_CONTENT_TYPE_UID]);
    }
  }, [data]);



  const updateData = async () => {
    const query = await Stack.ContentType(CONTENTSTACK_CONTENT_TYPE_UID).Entry(
      CONTENTSTACK_ENTRY_UID
    );

    const fetchedData = await ContentstackLivePreview.getGatsbyDataFormat(
      query,
      "contentstack" // prefixing the data with "contentstack" text. you can set this according to you or leave empty string
    );

    if (fetchedData) {
      // this => `contentstack_${toCamelCase(CONTENTSTACK_CONTENT_TYPE_UID)}` will be converted into camel case. Suppose if your content type uid is "csr_demo" the final string would be "contentstackCsrDemo"
      const entry = fetchedData?.[toCamelCase(`contentstack_${CONTENTSTACK_CONTENT_TYPE_UID}`)];

      // ADDING DATA-CSLP ATTRIBUTE DATA TO ENTRY DATA => addEditableTags(entry: EntryModel, contentTypeUid: string, tagsAsObject: boolean, locale?: string)
      Contentstack.Utils.addEditableTags(entry, CONTENTSTACK_CONTENT_TYPE_UID, true, entry.locale);
      setEntry(entry);
    }
  };

  React.useEffect(() => {
    // This 'onLiveEdit' method will call 'updateData' whenever there is a modification in the entry content
    // To know more click on => https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-preview-for-your-website/#client-side-rendering-csr
    onLiveEdit(updateData);
  }, []);

  return (
    <div>
       {/* {...entry.$?.title} => For edit button functionality  */}
      <h1 {...entry.$?.title}>Title : {entry.title}</h1>
      <p {...entry.$?.single_line}>Single Line: {entry.single_line}</p>
    </div>
  );
}

export default GetEntryLoad;

// this is util function to convert the string into camelCase
function toCamelCase(str){
  let newStr = "";
  if(str){
    let wordArr = str.split(/[-_]/g);
    for (let i in wordArr){
      if(i > 0){
        newStr += wordArr[i].charAt(0).toUpperCase() + wordArr[i].slice(1);
      }else{
        newStr += wordArr[i]
      }
    }
  }else{
    return newStr
  }
  return newStr;
}
