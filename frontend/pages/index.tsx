import Head from "next/head";
import Content from "@/components/container/Content";
import HomeMainImage from "@/components/HomeMainImage";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>CineReviewHub</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <HomeMainImage />
        <Content />
      </Layout>
    </>
  );
}
