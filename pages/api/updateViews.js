import { gql } from "graphql-request";
import hygraph from "../../graphql";

const updateViews = gql`
  mutation UpdateLesson($id: ID!, $views: Int!) {
    updateLesson(data: { views: $views }, where: { id: $id }) {
      views
    }
  }
`;

const publishLesson = gql`
  mutation PublishLesson($id: ID!) {
    publishLesson(to: PUBLISHED, where: { id: $id }) {
      id
      stage
    }
  }
`;

export default async function handler(request, response) {
  const { id, views } = request.body;
  await hygraph.request(updateViews, { id, views });
  await hygraph.request(publishLesson, { id });
  response.status(200).json({ message: "updated" });
}