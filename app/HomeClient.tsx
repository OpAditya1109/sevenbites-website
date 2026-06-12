  "use client";

  import { useState } from "react";
  import { motion } from "framer-motion";
  import Link from "next/link";
  import { Zap, MapPin, ShieldCheck, Star, Mail, ChevronRight, Package, ArrowUpRight } from "lucide-react";
  import HeroSection from "@/components/HeroSection";
  import CategoryCard from "@/components/CategoryCard";
  import RestaurantCard from "@/components/RestaurantCard";
  import FAQSection from "@/components/FAQSection";
  import { categories, restaurants, testimonials, faqs, stats, howItWorks } from "@/lib/data";

  const whyUs = [
    {
      icon: Zap,
      title: "Lightning fast delivery",
      desc: "Your food arrives hot and fresh in under 45 minutes, guaranteed — or we make it right.",
      big: true,
      color: "#FFF3EC",
      iconColor: "#E23744",
    },
    {
      icon: MapPin,
      title: "Live order tracking",
      desc: "Know exactly where your order is, from kitchen to your doorstep.",
      color: "#F1F6F2",
      iconColor: "#3F6B4F",
    },
    {
      icon: ShieldCheck,
      title: "Trusted restaurants",
      desc: "Every kitchen verified for quality, hygiene, and food safety.",
      color: "#FBF1DE",
      iconColor: "#F2A93B",
    },
    {
      icon: Package,
      title: "Secure ordering",
      desc: "Payments and personal data are always encrypted and safe.",
      color: "#F6EDE0",
      iconColor: "#2A2220",
    },
  ];

  function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
    return (
      <span
        className={`inline-block font-mono-label text-[11px] mb-3 ${
          dark ? "text-[#F2A93B]" : "text-[#E23744]"
        }`}
      >
        {children}
      </span>
    );
  }

  export default function HomeClient() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
      if (email) {
        setSubscribed(true);
        setEmail("");
      }
    };

    return (
      <>
        <HeroSection />

        {/* Categories — menu board */}
        <section className="py-24 bg-[#2A2220]" id="categories">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <SectionLabel dark>What are you craving?</SectionLabel>
              <h2 className="font-display font-semibold text-4xl sm:text-5xl text-[#FBF5EC]">
                Tonight&apos;s <span className="italic text-[#F2A93B]">menu board</span>
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-x-12">
              {categories.map((cat, i) => (
                <CategoryCard key={cat.name} {...cat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Restaurants */}
        <section className="py-20 bg-[#F6EDE0]" id="restaurants">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
            >
              <div>
                <SectionLabel>Top picks tonight</SectionLabel>
                <h2 className="font-display font-semibold text-4xl text-[#2A2220]">
                  Popular restaurants
                </h2>
              </div>
              <Link
                href="/restaurants"
                className="flex items-center gap-1 text-[#E23744] font-mono-label text-[11px] hover:gap-2 transition-all"
              >
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((r, i) => (
                <RestaurantCard key={r.id} {...r} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us — bento */}
        <section className="py-20 bg-white" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <SectionLabel>Why SevenBites</SectionLabel>
              <h2 className="font-display font-semibold text-4xl text-ink mb-4">
                Built around your appetite
              </h2>
              <p className="text-[#8a7a68] max-w-xl mx-auto">
                We obsess over every detail so your food arrives perfect, every time.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:grid-flow-row-dense gap-5">
              {whyUs.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className={`rounded-2xl p-7 border border-[#EFE7DA] transition-all duration-300 hover:shadow-lg ${
                      item.big ? "lg:col-span-2 lg:row-span-2 flex flex-col justify-between" : ""
                    }`}
                    style={{ backgroundColor: item.color }}
                  >
                    <div>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                      >
                        <Icon className="w-6 h-6" style={{ color: item.iconColor }} />
                      </div>
                      <h3
                        className={`font-display font-semibold text-ink mb-2 ${
                          item.big ? "text-2xl" : "text-lg"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-[#6b5d4f] leading-relaxed ${
                          item.big ? "text-base max-w-sm" : "text-sm"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                    {item.big && (
                      <p className="font-mono-label text-[11px] text-primary mt-8 flex items-center gap-1.5">
                        Average delivery: 32 minutes <ArrowUpRight className="w-3.5 h-3.5" />
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works — receipt strip */}
        <section className="py-20 bg-gradient-to-br from-[#2A2220] to-[#3a2c27]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <SectionLabel dark>Simple process</SectionLabel>
              <h2 className="font-display font-semibold text-4xl text-[#FBF5EC] mb-4">
                How it works
              </h2>
              <p className="text-[#a4937f] max-w-md mx-auto">
                From craving to your door in four easy steps.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative text-center p-6"
                >
                  {/* Connector line */}
                  {i < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] right-[-50%] h-0 border-t-2 border-dashed border-white/10" />
                  )}
                  <div className="w-16 h-16 bg-[#E23744] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-black/30 -rotate-3">
                    {step.icon}
                  </div>
                  <span className="font-mono-label text-[11px] text-[#F2A93B] mb-2 block">
                    Item {step.step} / 04
                  </span>
                  <h3 className="font-display font-semibold text-lg text-[#FBF5EC] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#a4937f] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-[#FBF5EC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <SectionLabel>Customer love</SectionLabel>
              <h2 className="font-display font-semibold text-4xl text-[#2A2220]">
                What our customers say
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-6 border border-[#EDE3D3] hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-[#F2A93B] text-[#F2A93B]" />
                    ))}
                  </div>
                  <p className="font-display italic text-[#3a2c27] text-base leading-relaxed mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#EDE3D3]">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: t.color }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-[#2A2220] text-sm">{t.name}</p>
                      <p className="font-mono-label text-[10px] text-[#a4937f]">{t.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats — the tally / receipt */}
        <section className="py-16 bg-[#FBF5EC]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(42,34,32,0.1)] border border-[#EDE3D3] p-8 sm:p-10"
            >
              <p className="font-mono-label text-[11px] text-[#a4937f] text-center mb-6">
                — The SevenBites tally —
              </p>
              <div className="space-y-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <span className="text-xl">{stat.icon}</span>
                    <span className="font-display text-lg text-[#2A2220]">{stat.label}</span>
                    <span className="dotted-leader" />
                    <span className="font-mono-label text-sm text-[#E23744]">{stat.value}</span>
                  </div>
                ))}
              </div>
              <div className="perforation my-6" />
              <p className="text-center font-mono-label text-[10px] text-[#a4937f]">
                Thank you for choosing SevenBites
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[#F6EDE0]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="font-display font-semibold text-4xl text-[#2A2220]">
                Frequently asked questions
              </h2>
            </motion.div>
            <FAQSection items={faqs} />
          </div>
        </section>

        {/* Newsletter — VIP table */}
        <section className="py-20 bg-[#FBF5EC]" id="order">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-[#2A2220] p-10 sm:p-14 text-center border-2 border-dashed border-[#F2A93B]/30"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-7 h-7 text-[#F2A93B]" />
                </div>
                <SectionLabel dark>VIP table</SectionLabel>
                <h2 className="font-display font-semibold text-3xl text-[#FBF5EC] mb-3">
                  Get first dibs on the good stuff
                </h2>
                <p className="text-[#a4937f] mb-8 max-w-md mx-auto">
                  Subscribe for early access to new restaurants, secret menu drops, and
                  offers we don&apos;t post anywhere else.
                </p>

                {subscribed ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-2 bg-[#F2A93B] text-[#2A2220] font-semibold px-6 py-3 rounded-2xl"
                  >
                    🎉 You&apos;re on the list — welcome to SevenBites!
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-3 max-w-md mx-auto bg-[#FBF5EC] rounded-2xl p-2 shadow-xl">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 text-sm text-[#2A2220] placeholder-[#b3a695] outline-none px-3 py-2 bg-transparent"
                    />
                    <button
                      onClick={handleSubscribe}
                      className="bg-[#E23744] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#c92e3a] transition-all hover:scale-105"
                    >
                      Subscribe
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }