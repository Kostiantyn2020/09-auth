import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMe } from "@/lib/api/serverApi";

type Props = {
  params: { slug?: string[] };
};

export async function generateMetadata(): Promise<Metadata> {
  const user = await getMe();
  return {
    title: `User: ${user.email}`,
    description: `Profile page of ${user.email}`,
    openGraph: {
      title: `User: ${user.email}`,
      description: `Profile page of ${user.username}`,
      url: `https://08-zustand-seven-amber.vercel.app/profile/`,
      images: [
        {
          url: "https://chatgpt.com/s/m_6971b723ea4c8191a1496962fa999a34",
          width: 1200,
          height: 630,
          alt: user.username,
        },
      ],
    },
  };
}

export default async function Profile() {
  const user = await getMe();

  return (
  <section style={{ maxWidth: 600, margin: "0 auto" }}>
    <h1>ProfilePage</h1>

    <Image
      src={user.avatar || "/avatar-placeholder.png"}
      alt={user.username}
      width={120}
      height={120}
      priority
    />

    <p>
      <b>Username:</b> {user.username}
    </p>

    <p>
      <b>Email:</b> {user.email}
    </p>

    <Link href="/profile/edit">Edit profile</Link>
    </section>
  );
}
