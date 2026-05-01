import PublicLayout from "@/Layouts/PublicLayout";
import { Hero } from "@/Components/Public/sections/Hero";
import { About } from "@/Components/Public/sections/About";
import {
    Services,
    type ServiceItem,
} from "@/Components/Public/sections/Services";
import { Skills, type SkillItem } from "@/Components/Public/sections/Skills";
import {
    Experience,
    type ExperienceItem,
} from "@/Components/Public/sections/Experience";
import {
    Projects,
    type ProjectItem,
} from "@/Components/Public/sections/Projects";
import {
    EducationSection,
    type EducationItem,
    type CertificationItem,
} from "@/Components/Public/sections/EducationSection";
import {
    Testimonials,
    type TestimonialItem,
} from "@/Components/Public/sections/Testimonials";
import {
    Pricing,
    type PricingPlan,
} from "@/Components/Public/sections/Pricing";
import {
    BlogPreview,
    type PostItem,
} from "@/Components/Public/sections/BlogPreview";
import { Contact } from "@/Components/Public/sections/Contact";

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

export default function Home(props: HomeProps) {
    return (
        <PublicLayout>
            <Hero />
            <About />
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
        </PublicLayout>
    );
}
