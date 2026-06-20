import Link from "next/link";
import { notFound } from "next/navigation";
import ParallaxHero from "../../components/parallax-hero";
import { getLoanBySlug } from "@/lib/api-server";

export default async function LoanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loan = await getLoanBySlug(slug);

  if (!loan) {
    notFound();
  }

  const title = String(loan.title ?? "Loan Product");
  const subtitle = String(loan.subtitle ?? loan.description ?? "");
  const heroImage = String(loan.heroImage ?? "/hero.jpg");

  return (
    <>
      <ParallaxHero
        title={title}
        subtitle={subtitle}
        backgroundImage={heroImage}
      />

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-besley font-medium text-white mb-6">
            {title}
          </h2>
          {loan.description && (
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {String(loan.description)}
            </p>
          )}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {loan.interestRateFrom && (
              <div className="bg-[#2d3544] p-4 rounded-lg">
                <p className="text-sm text-gray-400">Rate from</p>
                <p className="text-white font-semibold">{String(loan.interestRateFrom)}</p>
              </div>
            )}
            {loan.minimumDeposit && (
              <div className="bg-[#2d3544] p-4 rounded-lg">
                <p className="text-sm text-gray-400">Minimum deposit</p>
                <p className="text-white font-semibold">{String(loan.minimumDeposit)}</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/book-consultation"
              className="bg-[#00a69c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d8a99]"
            >
              Book consultation
            </Link>
            <Link
              href="/loans"
              className="border border-[#00a69c] text-[#00a69c] px-6 py-3 rounded-lg font-semibold hover:bg-[#00a69c] hover:text-white"
            >
              All loan products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
