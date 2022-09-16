import { GraphQLClient } from "graphql-request";

const hygraph = new GraphQLClient(process.env.HYGRAPH_URL);
hygraph.setHeader("Authorization", `Bearer ${process.env.API_TOKEN}`);
export default hygraph;