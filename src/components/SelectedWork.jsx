// SelectedWork.jsx
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import AIInterviewer from "../assets/AI-Interviewer.png";
import fusion from "../assets/fusion.png";
import tremor from "../assets/tremor.png";
import HospitalDemo from "../assets/Hospital_demo.png";

const projects = [
  {
    id: "01",
    title: "AI Interviewer Platform",
    subtitle: "AI-assisted conversational experience",

    description:
      "Built an AI-driven interview platform focused on adaptive conversational flow, structured interaction systems, and dynamic candidate experiences instead of rigid scripted interviews.",

    tags: [
      "Conversational UX",
      "AI Systems",
      "Adaptive Logic",
      "Interaction Design",
    ],

    align: "left",
    image: AIInterviewer,
    liveLink: "https://interviewai.run.place/"
  },

  {
    id: "02",
    title: "FusionLog",
    subtitle: "Logistics platform & client delivery",

    description:
      "Designed and developed a modern logistics website focused on responsive architecture, operational clarity, client communication, and scalable frontend delivery.",

    tags: [
      "Client Systems",
      "Responsive Architecture",
      "Deployment",
      "Frontend Engineering",
    ],

    align: "right",
    image: fusion,
    liveLink: "https://fusionlogis.com"
  },

  {
    id: "03",
    title: "Healthcare Communication System",
    subtitle: "AI-assisted patient communication workflows",

    description:
      "Designed a modern healthcare communication system concept combining patient inquiry handling, appointment workflows, AI-assisted interaction, and WhatsApp automation for clinics and hospitals.",

    tags: [
      "AI Assistance",
      "Workflow Automation",
      "Communication Systems",
      "Product Design",
    ],

    align: "left",
    image: HospitalDemo,
    liveLink: "https://hospital-demo-smoky.vercel.app"
  },

  {
    id: "04",
    title: "Tremor-Ball",
    subtitle: "Realtime seismic visualization",

    description:
      "Developed a realtime earthquake visualization platform handling live API data, responsive rendering, and interaction-focused data presentation systems.",

    tags: [
      "Realtime APIs",
      "Data Visualization",
      "Live Systems",
      "Interactive Motion",
    ],

    align: "right",
    image: tremor,
    liveLink: "https://tremor-ball.vercel.app"
  },
];

export default function SelectedWork() {
  const containerRef = useRef(null);


  return (
      <section ref={containerRef} id="projects" className="relative h-full py-20 md:py-30 overflow-hidden\ work-gradient">

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.025] mix-blend-soft-light pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }}
          />
        </div>

        <div className="relative z-20 max-w-[1600px] mx-auto px-6 md:px-12 ">

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="mb-30"
          >
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/40 mb-10">
              SELECTED WORK
            </p>

            <h2 className="google-sans-flex text-[#F5F1EB] text-[4rem] md:text-[6rem] lg:text-[7rem] leading-[0.92] tracking-[-0.02em] max-w-5xl">
              Modern
              <br />
              digital systems,
              <br />
              product-focused
              <br />
              web experiences.
            </h2>

            <p className="mt-10 max-w-2xl text-white/55 text-lg leading-[1.9]">
              A collection of products shaped through engineering,
              interaction design, iteration, and systems thinking.
            </p>
          </motion.div>

          {/* Projects */}
          <div className="space-y-30">

            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  y: 120,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1,
                }}
                viewport={{ once: true, amount: 0.2 }}
                data-billa-project
                className={`
                grid grid-cols-1 lg:grid-cols-12 gap-12 items-center
              `}
              >

                {/* Left / Right Alternating */}
                <div
                  className={`
                  ${project.align === "left"
                      ? "lg:col-span-5"
                      : "lg:col-span-5 lg:order-2"
                    }
                `}
                >

                  {/* Project Number */}
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-14 h-[1px] bg-[#A68A64]/70" />

                    <span className="text-sm tracking-[0.3em] text-white/35">
                      {project.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="google-sans-flex text-[#F5F1EB] text-[3rem] md:text-[5rem] leading-[0.95] tracking-[-0.05em]">
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="mt-6 text-[#A68A64] uppercase tracking-[0.25em] text-[11px]">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-10 text-white/60 leading-[1.9] text-[15px] max-w-lg">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-12 flex flex-wrap gap-4">
                    {project.tags.map((tag) => (
                      <div
                        key={tag}
                        className="border border-white/[0.08] px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-black hover:bg-[#A68A64] transition-colors duration-300 rounded-3xl"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>                  
                </div>

                {/* Visual Side */}
                <div
                  className={`
                  ${project.align === "left"
                      ? "lg:col-span-7"
                      : "lg:col-span-7 lg:order-1"
                    }
                `}
                >

                  <div className="relative group overflow-hidden rounded-[32px] border border-white/[0.06] bg-[#111111] aspect-[16/10]">
                  <a className="absolute z-20 bottom-5 left-5 bg-black/60 backdrop-blur-lg px-5 py-3 flex gap-2 rounded-3xl text-white/60 hover:text-white duration-300" href={project.liveLink} target="_blank" rel="noopener noreferrer">Visit <ExternalLink size={20}/></a>

                    {/* Project Image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Cinematic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent z-10" />

                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[#A68A64]/[0.03]" />

                    {/* Ambient Blur */}
                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[70%] h-32 bg-[#A68A64]/10 blur-[120px]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
}