import React, { Component } from "react";
import { RichText } from "prismic-reactjs";
import Head from "next/head";

import { getBlogPostAPI } from "../api";
import linkResolver from "../helpers";
import DefaultLayout from "../layouts";

export default class BlogPost extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const response = await getBlogPostAPI(slug);
    return {
      post: response,
    };
  }

  render() {
    const post = this.props.post.data;
    return (
      <DefaultLayout>
        <Head>
          <title key="title">{post.title[0].text}</title>
        </Head>
        <article>
          <h1>{post.title.length ? post.title[0].text : ""}</h1>
          {RichText.render(post.body, linkResolver)}
        </article>
      </DefaultLayout>
    );
  }
}
