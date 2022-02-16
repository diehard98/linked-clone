import Head from "next/head";
import { signOut } from "next-auth/react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Feed from "../components/Feed";

export default function Home() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  });

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          <Feed />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Check if the user is authenticated on the server...
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }

  // Get posts on SSR
  // const { db } = await connectToDatabase();
  // const posts = await db
  //   .collection("posts")
  //   .find()
  //   .sort({ timestamp: -1 })
  //   .toArray();

  // // Get Google News API
  // const results = await fetch(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  // ).then((res) => res.json());

  return {
    props: {
      session,
      // articles: results.articles,
      // posts: posts.map((post) => ({
      //   _id: post._id.toString(),
      //   input: post.input,
      //   photoUrl: post.photoUrl,
      //   username: post.username,
      //   email: post.email,
      //   userImg: post.userImg,
      //   createdAt: post.createdAt,
      // })),
    },
  };
}
