import HolyLoader from "holy-loader";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/app/providers";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HolyLoader color="#868686" />
      <TopBanner />
      <Providers>
        <TopNavbar />
        {children}
      </Providers>
      <Footer />
    </>
  );
}
