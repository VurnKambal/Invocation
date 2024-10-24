import React from "react";
import { Card, CardContent } from "./ui/card";
import { Github, Linkedin, Mail } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Rafhael Malabanan",
      role: "Lead Developer",
      image: "/images/profile/rafhael.jpg",
      socials: {
        github: "#",
        linkedin: "https://www.linkedin.com/in/rafhael-malabanan-780305307/",
        email: "#",
      },
    },
    {
      name: "Kenneth Iino",
      role: "UI/UX Designer",
      image: "/images/profile/kenneth.jpg",
      socials: {
        github: "#",
        linkedin: "#",
        email: "#",
      },
    },
    {
      name: "Veronical Mallari",
      role: "Frontend Developer",
      image: "/images/profile/veronica.jpg",
      socials: {
        github: "#",
        linkedin: "#",
        email: "#",
      },
    },
    {
      name: "John Brent Dizon",
      role: "Smart Contract Developer",
      image: "/images/profile/John.png",
      socials: {
        github: "#",
        linkedin: "#",
        email: "#",
      },
    },
    {
      name: "Leone Nucup",
      role: "Blockchain Engineer",
      image: "/images/profile/leone.jpg",
      socials: {
        github: "#",
        linkedin: "#",
        email: "#",
      },
    },
    {
      name: "Verniel Kent Batiller",
      role: "Full Stack Developer",
      image: "/images/profile/verniel.jpg",
      socials: {
        github: "#",
        linkedin: "#",
        email: "#",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-8">
      {/* Hero Section */}
      <div className="relative h-96 mb-16 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white">ABOUT US</h1>
        </div>
      </div>

      {/* What We Do Section */}
      <Card className="mb-16 bg-white/10 backdrop-blur">
        <CardContent className="grid md:grid-cols-2 gap-8 p-8">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src="/api/placeholder/600/400"
              alt="Team at work"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-6">WHAT WE DO</h2>
            <p className="text-gray-200">
              At DinoNFT Gacha, we're a team of passionate developers and
              designers pushing the boundaries of blockchain gaming. Our
              innovative platform combines the thrill of gacha mechanics with
              the uniqueness of dinosaur-themed NFTs, creating an engaging
              collecting experience powered by blockchain technology.
            </p>
            <p className="text-gray-200">
              We specialize in developing secure smart contracts, creating
              unique digital assets, and building user-friendly interfaces that
              make NFT collecting accessible and exciting for everyone. Our team
              brings together expertise in blockchain development, smart
              contract security, and creative design to deliver a
              next-generation NFT gaming platform.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Team Section */}
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">OUR TEAM</h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Meet the talented developers and designers behind DinoNFT Gacha. Our
            diverse team brings together expertise in blockchain technology,
            smart contract development, and creative design to create an
            exceptional NFT collecting experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur hover:bg-white/20 transition-colors"
            >
              <CardContent className="p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-300 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.socials.github}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={member.socials.linkedin}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.socials.email}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default About;
