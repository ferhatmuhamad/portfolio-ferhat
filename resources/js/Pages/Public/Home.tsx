import { lazy, Suspense } from "react";
import PublicLayout from "@/Layouts/PublicLayout";
import { Hero } from "@/Components/Public/sections/Hero";
import { About } from "@/Components/Public/sections/About";
import type { ServiceItem } from "@/Components/Public/sections/Services";
import type { SkillItem } from "@/Components/Public/sections/Skills";
import type { ExperienceItem } from "@/Components/Public/sections/Experience";
import type { ProjectItem } from "@/Components/Public/sections/Projects";
import type {
    EducationItem,
    CertificationItem,
} from "@/Components/Public/sections/EducationSection";
import type { TestimonialItem } from "@/Components/Public/sections/Testimonials";
import type { PricingPlan } from "@/Components/Public/sections/Pricing";
import type { PostItem } from "@/Components/Public/sections/BlogPreview";

// Below-the-fold sections — code-split so the initial JS bundle stays small
// (this is the #1 cause of the 5-10s blank screen on mobile).
const Services = lazy(() =>
    import("@/Components/Public/sections/Services").then((m) => ({
        default: m.Services,
    })),
);
const Skills = lazy(() =>
    import("@/Components/Public/sections/Skills").then((m) => ({
        default: m.Skills,
    })),
);
const Experience = lazy(() =>
    import("@/Components/Public/sections/Experience").then((m) => ({
        default: m.Experience,
    })),
);
const Projects = lazy(() =>
    import("@/Components/Public/sections/Projects").then((m) => ({
        default: m.Projects,
    })),
);
const EducationSection = lazy(() =>
    import("@/Components/Public/sections/EducationSection").then((m) => ({
        default: m.EducationSection,
    })),
);
const Testimonials = lazy(() =>
    import("@/Components/Public/sections/Testimonials").then((m) => ({
        default: m.Testimonials,
    })),
);
const Pricing = lazy(() =>
    import("@/Components/Public/sections/Pricing").then((m) => ({
        default: m.Pricing,
    })),
);
const BlogPreview = lazy(() =>
    import("@/Components/Public/sections/BlogPreview").then((m) => ({
        default: m.BlogPreview,
    })),
);
const Contact = lazy(() =>
    import("@/Components/Public/sections/Contact").then((m) => ({
        default: m.Contact,
    })),
);

interface HomeProps {
    services: ServiceItem[];
    skills: SkillItem[];
    experiences: ExperienceItem[];
    projects: ProjectItem[];
    educations: EducationItem[];
    certifications: CertificationItem[];
    testimonials: TestimonialItem[];
    pricingPlans: PricingPlan[];
    posts: PostItem[];
}

const SectionFallback = () => (
    <div className="min-h-[40vh] w-full" aria-hidden />
);

export default function Home(props: HomeProps) {
    return (
        <PublicLayout>
            <Hero />
            <About />
            <Suspense fallback={<SectionFallback />}>
                <Services services={props.services} />
                <Skills skills={props.skills} />
                <Experience items={props.experiences} />
                <Projects items={props.projects} />
                <EducationSection
                    educations={props.educations}
                    certifications={props.certifications}
                />
                <Testimonials items={props.testimonials} />
                <Pricing plans={props.pricingPlans} />
                <BlogPreview posts={props.posts} />
                <Contact />
            </Suspense>
        </PublicLayout>
    );
}
