import { Card, CardContent } from "@/src/components/ui/card";

type TestimonialProps = {
  quote: string;
  name: string;
  title: string;
};

const Testimonial = ({ quote, name, title }: TestimonialProps) => (
  <Card className="bg-background">
    <CardContent className="p-6">
      <div className="mb-4 flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="h-5 w-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-muted-foreground mb-4">{quote}</p>
      <div className="flex items-center">
        <div className="bg-muted mr-4 h-10 w-10 overflow-hidden rounded-full">
          <svg
            className="text-muted-foreground h-full w-full"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-muted-foreground text-sm">{title}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "As a philosophy student, DeepThink has been an incredible study tool. Being able to discuss concepts directly with the philosophers I'm studying has deepened my understanding in ways textbooks never could.",
      name: "Emma R.",
      title: "Philosophy Student",
    },
    {
      quote:
        "I've always been intimidated by philosophy, but DeepThink makes these complex ideas accessible. Having Kant explain his categorical imperative directly to me finally made it click!",
      name: "Marcus T.",
      title: "Self-learner",
    },
    {
      quote:
        "Setting up a debate between Aristotle and Sartre on the nature of virtue was mind-blowing. The Pro plan's multi-philosopher feature has completely transformed how I approach philosophical ideas.",
      name: "Sophie L.",
      title: "Professor",
    },
  ];

  return (
    <section className="bg-muted/50 w-full py-16">
      <h2 className="mb-12 text-center text-3xl font-bold">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            quote={testimonial.quote}
            name={testimonial.name}
            title={testimonial.title}
          />
        ))}
      </div>
    </section>
  );
};
