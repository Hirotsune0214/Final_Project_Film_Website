import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Head from "next/head";
import React from "react";

const search = () => {
  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <div>
        <Layout>
          <Search />
        </Layout>
      </div>
    </>
  );
};

export default search;
