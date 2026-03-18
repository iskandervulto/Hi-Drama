import { getRecentReviews } from "@/lib/sanity";
import HeroSection from "@/components/home/HeroSection";
import RecentReviews from "@/components/home/RecentReviews";
import TVSchedule from "@/components/home/TVSchedule";
import AboutStrip from "@/components/home/AboutStrip";
import SocialsCTA from "@/components/home/SocialsCTA";

export default async function HomePage() {
  const reviews = await getRecentReviews(4);

  return (
    <>
      <HeroSection />
      <RecentReviews reviews={reviews} />
      <TVSchedule />
      <AboutStrip />
      <SocialsCTA />
    </>
  );
}
