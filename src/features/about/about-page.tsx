import { PageHeader } from "@/components/shared/page-header";
import { Cta } from "@/components/shared/cta";
import { site } from "@/site.config";

export function AboutPage() {
  return (
    <>
      <PageHeader title={`About ${site.name}`} subtitle={site.description} />
      <section className="container-page prose-section">
        <h2 style={{textAlign: "center"}}>Our Goal</h2>
        <p style={{textAlign: "center"}}>
          To create a volunteer website for &ldquo;Plaridel.&rdquo;
        </p>
        <h2 style={{textAlign: "center"}}>Our Purpose</h2>
        <p style={{textAlign: "center"}}>
          To connect people with local volunteer opportunities.
        </p>
        <h2 style={{textAlign: "center"}}>Our Mission</h2>
        <p style={{textAlign: "center"}}>
          To encourage people to help and serve the community.
        </p>
        <h2 style={{textAlign: "center"}}>Our Vision</h2>
        <p style={{textAlign: "center"}}>
          To build a better and stronger Plaridel.
        </p>
        <h2><a href="https://plaridelbulacanlgu.ph/about-us/history/" target="_blank">1595 — Earliest Documented Historical Reference</a></h2>
        <p>
          Historical accounts trace records of the area now known as Plaridel to 1595. The locality was described as a largely undeveloped plain with thick vegetation and cogon grass, crossed by the Angat and Tabang rivers. The exact date of the area's original settlement remains uncertain.
        </p>
        <h2><a href="https://dioceseofmalolos.ph/wp-content/uploads/2022/12/THE-JUBILEE-CHURCHES-OF-THE-DIOCESE-OF-MALOLOS-FOR-THE-500-YEARS-OF-CHRISTIANITY-IN-THE-PHILIPPINES.pdf" target="_blank">1602 — Establishment of St. James the Apostle Parish</a></h2>
        <p>
          The Diocese of Malolos identifies St. James the Apostle Parish in Plaridel as having been founded by Augustinian missionaries in 1602. The parish became an important center of religious and community life.
        </p>
        <h2><a href="https://philhistoricsites.nhcp.gov.ph/registry_database/labanan-sa-quingua-plaridel-abril-23-1899/" target="_blank">1899 — Battle of Quingua</a></h2>
        <p>
          During the Philippine–American War, Filipino revolutionary forces fought American troops in the Battle of Quingua. The encounter became a significant event in the struggle for Philippine independence and remains an important part of Plaridel's historical identity.
        </p>
        <h2><a href="https://ldr.senate.gov.ph/legislative-issuance/act-no-932" target="_blank">1903 — Quingua and Pulilan Combined</a></h2>
        <p>
          Act No. 932 reorganized municipalities in Bulacan and combined the territories of Quingua and Pulilan under the municipality of Quingua, with the municipal seat remaining in Quingua.
        </p>
        <h2><a href="https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/29/24069" target="_blank">1936 — Quingua Renamed Plaridel</a></h2>
        <p>
          Commonwealth Act No. 26 officially changed the municipality's name from Quingua to Plaridel in honor of Marcelo H. del Pilar, the Filipino patriot and propagandist whose pen name was Plaridel.
        </p>
        <h2><a href="https://issuances-library.senate.gov.ph/legislative-issuance/republic-act-no-1005" target="_blank">1954 — Mayamot Renamed Bagong Silang</a></h2>
        <p>
          Republic Act No. 1005 changed the name of the sitio of Mayamot, located in Barrio Banga, Plaridel, to Bagong Silang. This is a documented example of a local place-name change during the postwar period.
        </p>
        <h2><a href="https://www.philatlas.com/luzon/r03/bulacan/plaridel.html" target="_blank">1975 — Population Reaches 32,613</a></h2>
        <p>
          Plaridel's recorded population increased to 32,613 in the 1975 census, indicating continued demographic growth during the 1970s.
        </p>
        <h2><a href="https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/7021" target="_blank">1989 — General Alejo G. Santos Highway</a></h2>
        <p>
          Republic Act No. 6808 named the Plaridel–Bustos–Angat–Norzagaray–Santa Maria Highway the General Alejo G. Santos Highway. The law formalized the name of an important road corridor in Bulacan.
        </p>
        <h2><a href="https://www.philatlas.com/luzon/r03/bulacan/plaridel.html" target="_blank">2000 — Population Reaches 80,481</a></h2>
        <p>
          The 2000 census recorded 80,481 residents in Plaridel. This figure provides a useful milestone for measuring population growth at the beginning of the twenty-first century.
        </p>
        <h2><a href="https://www.philatlas.com/luzon/r03/bulacan/plaridel.html" target="_blank">2020 — Population Reaches 114,432</a></h2>
        <p>
          The 2020 census recorded 114,432 residents in Plaridel. This reflects the municipality's continuing demographic growth and its development as part of the expanding Bulacan urban and economic area.
        </p>
        <h2><a href="https://www.dpwh.gov.ph/dpwh/sites/default/files/issuances/DO_040_s2022.pdf" target="_blank">2022 — Plaridel Bypass Road Classification</a></h2>
        <p>
          In 2022, the Department of Public Works and Highways issued an order classifying a 10.25-kilometer segment of the Plaridel Bypass Road as a national secondary road. The order documents an important administrative milestone in the area's road infrastructure.
        </p>
        <h2><a href="https://psa.gov.ph/content/2024-census-population-popcen-population-counts-declared-official-president" target="_blank">2024 — Population Reaches 120,939</a></h2>
        <p>
          The Philippine Statistics Authority's 2024 Census of Population recorded 120,939 residents in Plaridel. This is an important recent demographic milestone in the municipality's continuing development.
        </p>
        <h2><a href="https://plaridelbulacanlgu.ph/" target="_blank">2026 — Plaridel in the Present Day</a></h2>
        <p>
          As of 2026, Plaridel remains a municipality in Bulacan, Central Luzon, with a history extending from the Spanish colonial period through the Philippine Revolution and into the modern era. Its historical identity is closely associated with its former name, Quingua; the Battle of Quingua; and its renaming in honor of Marcelo H. del Pilar. Its present-day story continues through local governance, heritage preservation, transportation, commerce, and community development.
        </p>
      </section>
      <Cta />
    </>
  );
}
