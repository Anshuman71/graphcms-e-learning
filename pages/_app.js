import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <main className={"max-w-[990px] mx-auto py-4"}>
        <NavBar />
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
}

export default MyApp;
