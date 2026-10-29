import { PageHeader } from "@/components/shared/page-header";
import { Cta } from "@/components/shared/cta";
import { site } from "@/site.config";
import { HistoryTimeline } from "./components/history-timeline";

export function AboutPage() {
  return (
    <>
      {/*<PageHeader title={`About ${site.name}`} subtitle={site.description} />
       <section className="container-page prose-section">
  <h2 style={{ textAlign: "center" }}>Our Goal</h2>
  <p style={{ textAlign: "center" }}>
    To create a volunteer website for &ldquo;Plaridel.&rdquo;
  </p>

  <h2 style={{ textAlign: "center" }}>Our Purpose</h2>
  <p style={{ textAlign: "center" }}>
    To connect people with local volunteer opportunities.
  </p>

  <h2 style={{ textAlign: "center" }}>Our Mission</h2>
  <p style={{ textAlign: "center" }}>
    To encourage people to help and serve the community.
  </p>

  <h2 style={{ textAlign: "center" }}>Our Vision</h2>
  <p style={{ textAlign: "center" }}>
    To build a better and stronger Plaridel.
  </p>
</section>*/}

<HistoryTimeline />
      <Cta />
    </>
  );
}
