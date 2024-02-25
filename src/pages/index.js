import Head from "next/head";
import Home from "../components/home/home";
export default function Page() {
  
  return (
    <>
      <Head>
        <title>Dược Tây Nam</title>
        <meta name="description" content="Dược Tây Nam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* <!-- description --> */}
        <meta
          property="og:image:alt"
          content="Giải pháp cho mọi vấn đề của bạn | Sản phẩm phù hợp nhu cầu | Hệ sinh thái hoàn chỉnh"
        ></meta>
        <meta
          name="description"
          content="Giải pháp cho mọi vấn đề của bạn | Sản phẩm phù hợp nhu cầu | Hệ sinh thái hoàn chỉnh"
        />
        <meta
          name="keywords"
          content="Giải pháp cho mọi vấn đề của bạn | Sản phẩm phù hợp nhu cầu | Hệ sinh thái hoàn chỉnh"
        />
        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp="name" content="Dược Tây Nam © by TPSoft" />
        <meta
          itemProp="description"
          content="Giải pháp cho mọi vấn đề của bạn | Sản phẩm phù hợp nhu cầu | Hệ sinh thái hoàn chỉnh"
        />
        <meta itemProp="image" content="/BG_SEO_TNP.png" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="/" />
        <meta property="og:site_name" content="duoctaynam.vn" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dược Tây Nam © by TPSoft" />
        <meta
          property="og:description"
          content="Giải pháp cho mọi vấn đề của bạn | Sản phẩm phù hợp nhu cầu | Hệ sinh thái hoàn chỉnh"
        />
        <meta property="og:image" content="/BG_SEO_TNP.png" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dược Tây Nam © by TPSoft" />
        <meta
          name="twitter:description"
          content="Giải pháp cho mọi vấn đề của bạn | Sản phẩm phù hợp nhu cầu | Hệ sinh thái hoàn chỉnh"
        />
        <meta name="twitter:image" content="/BG_SEO_TNP.png" />
        <link rel="icon" type="image/png" href="/Logo_TPSPharma_mini.png" />
      </Head>

      <Home />
    </>
  );
}
