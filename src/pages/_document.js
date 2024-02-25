import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body>
        {/* <!-- Messenger Chat plugin Code --> */}

        {/* <!-- Your Chat plugin code --> */}
        <div id="fb-customer-chat" className="fb-customerchat"></div>
        <Script
          id="messenger-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `{var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "104518709202912");
            chatbox.setAttribute("attribution", "biz_inbox");}`,
          }}
        ></Script>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
