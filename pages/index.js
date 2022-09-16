import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import hygraph from "../graphql";
import { gql } from "graphql-request";

const Home = ({ lessons }) => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <Head>
        <title>Amazing learning with GraphCMS</title>
      </Head>
      <section className={"mt-6"}>
        {user ? (
          <div className={"px-4"}>
            <h2 className={"text-3xl"}>All lessons</h2>
            <ul className="grid gap-y-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
              {lessons.map((lesson) => (
                <li key={lesson.id} className="flex flex-col">
                  <Link href={`/video/${lesson.id}`}>
                    <a>
                      <div className="relative aspect-video">
                        <Image
                          layout="fill"
                          alt={lesson.title}
                          src={lesson.boldVideo.data.thumbnail}
                          objectFit="cover"
                          objectPosition="center"
                          className="block w-full h-full rounded-lg"
                        />
                      </div>
                      <p className={"text-sm"}>{lesson.title}</p>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className={"text-center"}>
            Please{" "}
            <Link passHref href={"/api/auth/login"}>
              <a className={"text-blue-500"}>Login</a>
            </Link>{" "}
            to access E-learning content.
          </p>
        )}
      </section>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const lessonsQuery = gql`
    {
      lessons {
        id
        title
        videoId
        boldVideo {
          data {
            thumbnail
          }
        }
      }
    }
  `;
  const data = await hygraph.request(lessonsQuery);
  const lessons = data.lessons;
  return {
    props: {
      lessons
    },
  };
}