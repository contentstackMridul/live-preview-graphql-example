import { gql } from "@apollo/client";
import { CONTENTSTACK_CONTENT_TYPE_UID, CONTENTSTACK_ENTRY_UID } from "../contentstack.config";

export const LOAD_ENTRY = gql`
  query {
    ${CONTENTSTACK_CONTENT_TYPE_UID}(uid: "${CONTENTSTACK_ENTRY_UID}") {
      single_line
      title
      url
    }
  }
`;
