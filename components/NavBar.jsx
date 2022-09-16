import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

export default function NavBar() {
  const { user } = useUser();
  return (
    <nav
      className={
        "flex justify-between items-center p-2 px-4 border-b-4 border-b-blue-500"
      }
    >
      <h1 className={"text-blue-800 font-semibold text-2xl"}>
        Amazing learning
      </h1>
      {user ? (
        <div className={"flex items-center"}>
          <p className={"mr-2"}>Hi, {user.name}</p>
          <Link passHref href={"/api/auth/logout"}>
            <a className={"py-1 px-2 text-gray-100 rounded bg-orange-600"}>
              Logout
            </a>
          </Link>
        </div>
      ) : (
        <Link passHref href={"/api/auth/login"}>
          <a className={"py-1 px-2 text-gray-100 rounded bg-green-700"}>
            Login
          </a>
        </Link>
      )}
    </nav>
  );
}