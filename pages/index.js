import Head from "next/head";
import { signOut } from "next-auth/react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>LinkedIn</title>
      </Head>
      <Header />
      {/* <button onClick={signOut}>Sign Out</button> */}
    </div>
  );
}
