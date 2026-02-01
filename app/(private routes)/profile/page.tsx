import ProfilePage from "@/components/ProfilePage/ProfilePage";
import { Metadata } from "next";

type Props = {
  readonly params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {} = await params;
  return {
    title: `User: `,
    description: `Profile page by user`,
    openGraph: {
      title: "Memo",
      description: `Profile page by user`,
      url: `https://08-zustand-seven-amber.vercel.app/profile/`,
      images: [
        {
          url: "https://chatgpt.com/s/m_6971b723ea4c8191a1496962fa999a34",
          width: 1200,
          height: 630,
          alt: "Poster with logo",
        },
      ],
    },
  };
}

function Profile() {
  return <ProfilePage />;
}

export default Profile;
