import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import GetEntryLoad from "./Components/Home";
import { CONTENTSTACK_API_KEY, CONTENTSTACK_DELIVERY_KEY, CONTENTSTACK_ENVIRONMENT } from "./contentstack.config";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: `https://graphql.contentstack.com/stacks/${CONTENTSTACK_API_KEY}?environment=${CONTENTSTACK_ENVIRONMENT}`,
    headers: {
      access_token: CONTENTSTACK_DELIVERY_KEY,
    },
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      {" "}
      <GetEntryLoad />
    </ApolloProvider>
  );
}

export default App;
