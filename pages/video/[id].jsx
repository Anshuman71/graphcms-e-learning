import Link from "next/link";
import dynamic from "next/dynamic";
import { gql } from "graphql-request";
import { useEffect } from "react";
import hygraph from "../../graphql";
import Head from "next/head";

const Player = dynamic(() => import("../../components/VideoPlayer"), {
  ssr: false,
});

export default function DetailPage({ lesson }) {
  useEffect(() => {
    fetch("/api/updateViews", {
      method: "POST",
      headers: {
        "content-type": "Application/json",
      },
      body: JSON.stringify({
        id: lesson.id,
        views: lesson.views + 1,
      }),
    });
  }, []);
  return (
    <>
      <Head>
        <title>{lesson.title}</title>
      </Head>
      <div className="py-12 px-4 lg:px-0">
        <p className="text-xl mb-8">
          <Link href="/">
            <a className={"text-gray-600"}>Back</a>
          </Link>
        </p>
        <h1 className="text-3xl my-4">{lesson.title}</h1>
        <div className="aspect-video">
          <Player
            src={lesson.boldVideo.data.stream_url}
            poster={lesson.boldVideo.data.thumbnail}
          />
        </div>
        <p className="mt-4">Views {lesson.views}</p>
        <p className="mt-4">{lesson.boldVideo.data.description}</p>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const lessonQuery = gql`
    query Lesson($id: ID!) {
      lesson(where: { id: $id }) {
        id
        title
        videoId
        views
        boldVideo {
          data {
            thumbnail
            stream_url
            description
          }
        }
      }
    }
  `;
  const { lesson } = await hygraph.request(lessonQuery, { id: params.id });

  return {
    props: {
      lesson,
    },
  };
}
