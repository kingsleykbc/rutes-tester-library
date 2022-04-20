import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import cookies from 'js-cookie';
import { SERVER_URI } from './config';

const httpLink = createHttpLink({
	uri: SERVER_URI
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = cookies.get('rutes-frontend-token');
	
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

export default apolloClient;
